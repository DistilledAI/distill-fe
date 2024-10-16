import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets"
import { createConfig } from "wagmi"
import { bsc, bscTestnet, mainnet, sepolia } from "wagmi/chains"

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet],
    },
  ],
  {
    appName: "Distill-Demo",
    projectId: "2ac779892f366ccc0af6a8d986ab6d86",
  },
)

//@ts-ignore
export const config = createConfig({
  connectors,
  chains: [mainnet, sepolia, bsc, bscTestnet],
})

// export const config: ReturnType<typeof getDefaultConfig> = getDefaultConfig({
//   appName: "Distill-Demo",
//   projectId: "2ac779892f366ccc0af6a8d986ab6d86",
//   chains: [mainnet, sepolia],
// })
