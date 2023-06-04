import { configureChains } from "wagmi";
import * as allChains from "wagmi/chains";
import { w3mProvider } from "@web3modal/ethereum";

import { SETTINGS } from "../settings";
export class ChainsListHandler {
  constructor() {
    this.chainsId = {};
    this.SELECTED_CHAINS = this.#createChainsArrayFromSettings();
    this.DEFAULT_CHAIN = this.#selectDefaultChain(this.SELECTED_CHAINS);
  }
  #selectDefaultChain(filteredChains) {
    let firstIndexedKey = Object.keys(filteredChains)[0];
    return {
      chain: filteredChains[firstIndexedKey],
      chainKey: firstIndexedKey,
    };
  }
  #createChainsArrayFromSettings() {
    if (SETTINGS.IS_ON_MAINNET) {
      return Object.fromEntries(
        Object.entries(allChains).filter(([key]) =>
          SETTINGS.CHAINS_LIST.includes(key)
        )
      );
    } else {
      return Object.fromEntries(
        Object.entries(allChains).filter(([key]) =>
          Object.values(SETTINGS.TESTNET_KEYS).includes(key)
        )
      );
    }
  }
  get configuredChains() {
    return configureChains(Object.values(this.SELECTED_CHAINS), [
      w3mProvider({ projectId: SETTINGS.WALLET_CONNECT_TOKEN }),
    ]);
  }
}
