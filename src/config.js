import { http, createConfig } from "wagmi";
import { bsc, mainnet, polygon, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, bsc, polygon, sepolia],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
});
