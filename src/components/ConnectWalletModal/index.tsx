import { EVMImage, oraichainLogo, solanaLogo } from "@assets/images"
import CloseButton from "@components/CloseButton"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import {
  MetamaskIconSmall,
  OwalletIcon,
  PhantomIcon,
} from "@components/Icons/MetamaskIcon"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import useConnectWallet from "@hooks/useConnectWallet"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"
import { updateModalStatus } from "@reducers/connectWalletSlice"

const ConnectWalletModal = () => {
  const {
    loadingConnectMetamask,
    loadingConnectOwalletOrai,
    loadingConnectPhantom,
    loadingConnectOwalletEVM,
    connectMetamaskWallet,
    connectOwalletOraichain,
    connectPhantomWallet,
    connectOwalletEVM,
  } = useConnectWallet()
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.connectWalletReducer.isOpen)

  const CONNECTORS = [
    {
      id: "owallet",
      name: "OWallet",
      icon: <OwalletIcon width={32} height={38} />,
      loading: loadingConnectOwalletOrai,
      connect: connectOwalletOraichain,
      network: (
        <div className="flex items-center gap-1">
          <img src={oraichainLogo} width={24} height={24} />
          <span className="text-14 text-mercury-900">Oraichain</span>
        </div>
      ),
    },
    {
      id: "owallet",
      name: "OWallet",
      icon: <OwalletIcon width={32} height={38} />,
      loading: loadingConnectOwalletEVM,
      connect: connectOwalletEVM,
      network: (
        <div className="flex items-center gap-1">
          <img src={EVMImage} width={42} height={24} />
          <span className="text-14 text-mercury-900">EVM</span>
        </div>
      ),
    },
    {
      id: "phantom",
      name: "Phantom",
      icon: <PhantomIcon />,
      loading: loadingConnectPhantom,
      connect: connectPhantomWallet,
      network: (
        <div className="flex items-center gap-1">
          <img src={solanaLogo} width={24} height={24} />
          <span className="text-14 text-mercury-900">Solana</span>
        </div>
      ),
    },
    {
      id: "metamask",
      name: "Metamask",
      icon: <MetamaskIconSmall width={32} height={38} />,
      loading: loadingConnectMetamask,
      connect: connectMetamaskWallet,
      network: (
        <div className="flex items-center gap-1">
          <img src={EVMImage} width={42} height={24} />
          <span className="text-14 text-mercury-900">EVM</span>
        </div>
      ),
    },
  ]

  const onClose = () => {
    dispatch(updateModalStatus(false))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-mercury-100 py-6 max-md:py-4",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="relative">
          <h3 className="flex-1 text-center text-24 font-semibold text-mercury-950">
            Connect Wallet
          </h3>
          <CloseButton
            onClose={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        </ModalHeader>
        <ModalBody className="flex items-center justify-center py-4">
          <div className="mb-6 flex items-center gap-3 rounded-[14px] border border-mercury-300 bg-mercury-200 px-3 py-2 max-md:mb-3 max-md:px-1">
            <div>
              <FilledShieldCheckedIcon color="#A2845E" size={24} />
            </div>
            <span className="max-md:text-base-14 text-base text-mercury-900">
              With our decentralized and private AI structure, <br />
              <span className="font-bold">only you have access</span> to your
              private key. No one else, including us, can access it.
            </span>
          </div>

          {CONNECTORS.map((connector) => {
            return (
              <div
                key={connector.id}
                className="mb-2 flex h-16 w-full items-center justify-between rounded-[14px] bg-[rgba(244,_244,_245,_0.50)] p-4 outline outline-[1px] outline-white"
              >
                <div className="flex items-center gap-4">
                  {connector.icon}
                  <div>
                    <span className="text-base-md">{connector.name}</span>
                    {connector.network}
                  </div>
                </div>
                <Button
                  className="group flex h-[40px] cursor-pointer items-center justify-center gap-4 rounded-full bg-mercury-950 p-2 px-6"
                  onPress={connector.connect}
                  isLoading={connector.loading}
                >
                  <span className="text-18 text-white max-md:text-14">
                    Connect
                  </span>
                </Button>
              </div>
            )
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConnectWalletModal
