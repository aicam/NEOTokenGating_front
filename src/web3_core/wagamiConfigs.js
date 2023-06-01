import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { polygonMumbai, polygon } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";

import { SETTINGS } from "../settings";

// 2. Configure wagmi client
const chains = [SETTINGS.IS_ON_POLYGON_MAINNET ? polygon : polygonMumbai];

export const projectId = SETTINGS.WALLET_CONNECT_TOKEN;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
export const wConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wConfig, chains);
