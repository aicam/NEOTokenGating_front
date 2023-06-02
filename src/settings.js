import { isAddress } from "viem";
class Settings {
  constructor() {
    this.testNetsName = this.#getTestNetsList();
    this.WALLET_CONNECT_TOKEN = process.env.NEXT_PUBLIC_WALLET_CONNECT_TOKEN;
    this.CHAINS_LIST = JSON.parse(process.env.NEXT_PUBLIC_CHAINS_LIST);
    this.IS_ON_MAINNET =
      process.env.NEXT_PUBLIC_IS_ON_MAINNET?.toLowerCase?.() === "true";
    if (!this.IS_ON_MAINNET) {
      this.#validateAcceptedChainsForTestNet(this.CHAINS_LIST);
    }
    this.DEFAULT_AFFILIATE_ADDRESSES = this.#checkListOfEthereumAddresses(
      JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESSES),
      "NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESSES"
    );
    this.NFT_ADDRESSES = this.#checkListOfEthereumAddresses(
      JSON.parse(process.env.NEXT_PUBLIC_NFT_ADDRESSES),
      "NEXT_PUBLIC_NFT_ADDRESSES"
    );
    this.#validateEnvParams();
  }
  #checkListOfEthereumAddresses(listOfAddresses, configCheckName) {
    listOfAddresses.forEach((ethereumAddress) => {
      if (!isAddress(ethereumAddress)) {
        throw new Error(`${ethereumAddress} in ${configCheckName} is invalid!`);
      }
    });
    return listOfAddresses;
  }
  #validateEnvParams() {
    if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_TOKEN) {
      throw new Error(
        "You need to provide NEXT_PUBLIC_WALLET_CONNECT_TOKEN env variable"
      );
    }

    if (this.CHAINS_LIST.length === 0) {
      throw new Error(`NEXT_PUBLIC_CHAINS_LIST cannot be empty`);
    }

    if (this.CHAINS_LIST.length != this.DEFAULT_AFFILIATE_ADDRESSES.length) {
      throw new Error(
        "invalid NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESS count. it must be same count as NEXT_PUBLIC_CHAINS_LIST"
      );
    }
    if (this.CHAINS_LIST.length != this.NFT_ADDRESSES.length) {
      throw new Error(
        "invalid NEXT_PUBLIC_NFT_ADDRESS count. it must be same count as NEXT_PUBLIC_CHAINS_LIST"
      );
    }
  }
  #validateAcceptedChainsForTestNet(chainsList) {
    chainsList.forEach((chain) => {
      if (!(chain in this.testNetsName)) {
        throw new Error(`${chain} Test Net is not supported.`);
      }
    });
  }
  #getTestNetsList() {
    return {
      bsc: "bscTestnet",
      arbitrum: "arbitrumGoerli",
      aurora: "auroraTestnet",
      avalanche: "avalancheFuji",
      polygon: "polygonMumbai",
      mainnet: "sepolia",
    };
  }
}
export const SETTINGS = new Settings();
Object.freeze(SETTINGS);
