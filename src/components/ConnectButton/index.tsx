import { Button } from "@nextui-org/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const ConnectWalletBtn = () => {
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
                  <Button onPress={openConnectModal}>Connect Wallet</Button>
                )
              }
              if (chain.unsupported) {
                return <Button onPress={openChainModal}>Wrong network</Button>
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
