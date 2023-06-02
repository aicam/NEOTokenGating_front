import { configureChains } from "wagmi";
import * as allChains from "wagmi/chains";
import { w3mProvider } from "@web3modal/ethereum";

import { SETTINGS } from "../settings";
export class ChainsListHandler {
  constructor() {
    this.SELECTED_CHAINS = this.#createChainsArrayFromSettings();
    const projectId = SETTINGS.WALLET_CONNECT_TOKEN;
    this.configuredChains = configureChains(this.SELECTED_CHAINS, [
      w3mProvider({ projectId: SETTINGS.WALLET_CONNECT_TOKEN }),
    ]);
  }
  #createChainsArrayFromSettings() {
    if (SETTINGS.IS_ON_MAINNET) {
      return Object.values(
        Object.fromEntries(
          Object.entries(allChains).filter(([key]) =>
            SETTINGS.CHAINS_LIST.includes(key)
          )
        )
      );
    } else {
      return Object.values(
        Object.fromEntries(
          Object.entries(allChains).filter(([key]) =>
            Object.values(SETTINGS.TESTNET_KEYS).includes(key)
          )
        )
      );
    }
  }
}
