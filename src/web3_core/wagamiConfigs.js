import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { polygonMumbai, polygon } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";

import { ChainsListHandler } from "./chains";
import { SETTINGS } from "../settings";

// 2. Configure wagmi client
const configuredChainsHandler = new ChainsListHandler().configuredChains;

export const projectId = SETTINGS.WALLET_CONNECT_TOKEN;

export const wConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    version: 1,
    chains: configuredChainsHandler.chains,
    projectId: SETTINGS.WALLET_CONNECT_TOKEN,
  }),
  publicClient: configuredChainsHandler.publicClient,
});
export const ethereumClient = new EthereumClient(
  wConfig,
  configuredChainsHandler.chains
);
