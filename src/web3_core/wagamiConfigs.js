import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { createConfig } from "wagmi";

import { ChainsListHandler } from "./chains";
import { SETTINGS } from "../settings";

const configuredChainsHandler = new ChainsListHandler().configuredChains;
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
