import Web3 from "web3"
import { Connection, PublicKey } from "@solana/web3.js"
import { useDispatch } from "react-redux"
import { updateWalletActive } from "@reducers/userSlice"
import useAuthState from "./useAuthState"
import { useEffect } from "react"

const useCheckWalletActive = () => {
  const { user, isLogin, isAnonymous } = useAuthState()
  const dispatch = useDispatch()

  const checkBlockchain = (
    accountAddress: string,
  ): "EVM" | "SOLONA" | "Invalid" => {
    const evmRegex = /^0x[a-fA-F0-9]{40}$/
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

    if (evmRegex.test(accountAddress)) {
      return "EVM"
    } else if (solanaRegex.test(accountAddress)) {
      return "SOLONA"
    } else {
      return "Invalid"
    }
  }

  const getTransactionCountEvm = async (accountAddress: string) => {
    try {
      const web3 = new Web3(window.ethereum)
      const countEvm = await web3.eth.getTransactionCount(accountAddress)
      if (countEvm > 0) dispatch(updateWalletActive(true))
      else dispatch(updateWalletActive(false))
    } catch (error) {
      console.error(error)
    }
  }

  const getTransactionCountSol = async (accountAddress: PublicKey) => {
    const SOLANA_RPC =
      "https://mainnet.helius-rpc.com/?api-key=3b28a0fc-0ef6-48ef-b55c-c55ae74cb6a6"
    const connection = new Connection(SOLANA_RPC, "confirmed")

    try {
      const signatures = await connection.getSignaturesForAddress(
        accountAddress,
        { limit: 1 },
      )
      if (signatures.length > 0) dispatch(updateWalletActive(true))
      else dispatch(updateWalletActive(false))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isLogin && !isAnonymous) {
      const network = checkBlockchain(user.publicAddress)
      if (network === "EVM") getTransactionCountEvm(user.publicAddress)
      if (network === "SOLONA") {
        const accountAddress = new PublicKey(user.publicAddress)
        getTransactionCountSol(accountAddress)
      }
    }
  }, [user.publicAddress, isLogin, isAnonymous])
}

export default useCheckWalletActive
