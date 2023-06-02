import { configureChains } from "wagmi";
import * as allChains from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([mainnet, avalanche, bsc]);

class ChainList {}
