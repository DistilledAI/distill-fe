import { Button } from "@nextui-org/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect } from "react"
import { useAccount, useSignTypedData } from "wagmi"
import { recoverPublicKey, hashTypedData } from "viem"
import { IDataSignatureAuth, signatureAuth } from "services/auth"
import { useDispatch } from "react-redux"
import { loginSuccess } from "@reducers/userSlice"

const ConnectWalletBtn = () => {
  const { signTypedDataAsync } = useSignTypedData()
  const { isConnected, address: publicAddress } = useAccount()

  const dispatch = useDispatch()

  const login = async (input: IDataSignatureAuth) => {
    const res = await signatureAuth(input)
    if (res.data.accessToken && res.data.user) {
      dispatch(
        loginSuccess({
          user: res.data.user,
          accessToken: res.data.accessToken,
          expire: Date.now() + 24 * 60 * 60 * 1000,
        }),
      )
    }
  }

  const handleSign = async () => {
    const timestamp = Math.floor(Date.now() / 1000) + 86400
    const domain = {}
    const types = {
      Data: [
        { name: "action", type: "string" },
        { name: "publicAddress", type: "address" },
        { name: "timestamp", type: "uint256" },
      ],
    }
    const message = {
      action: "login",
      publicAddress,
      timestamp,
    }
    const signature = await signTypedDataAsync({
      domain,
      types,
      message,
      primaryType: "Data",
    })
    const hash = hashTypedData({ domain, types, message, primaryType: "Data" })
    console.log({ signature, hash })
    const publicKey = await recoverPublicKey({ hash, signature })
    console.log({ publicKey })
    const input: IDataSignatureAuth = {
      data: {
        action: "login",
        publicAddress: publicAddress as any,
        timestamp,
      },
      signData: {
        signature,
        publicKey,
      },
      typeLogin: "evm",
    }
    await login(input)
  }

  useEffect(() => {
    if (isConnected) handleSign()
  }, [isConnected])

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal}>Connect Wallet</Button>
                )
              }
              if (chain.unsupported) {
                return <Button onClick={openChainModal}>Wrong network</Button>
              }

              return (
                <div className="flex gap-2 rounded-full border-1 border-mercury-600 bg-mercury-30 px-3 py-2">
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{ background: chain.iconBackground }}
                        className="h-5 w-5 rounded-full"
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="h-5 w-5"
                          />
                        )}
                      </div>
                    )}
                  </button>
                  <button
                    className="text-mercury-900"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWalletBtn
