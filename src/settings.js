import { isAddress } from "viem";
class Settings {
  constructor() {
    this.#validateEnvParams();
    this.WALLET_CONNECT_TOKEN = process.env.NEXT_PUBLIC_WALLET_CONNECT_TOKEN;
    this.CHAINS_LIST = process.env.NEXT_PUBLIC_CHAINS_LIST;
    this.DEFAULT_AFFILIATE_ADDRESSES = this.#checkListOfEthereumAddresses(
      process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESSES,
      "NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESSES"
    );
    this.NFT_ADDRESSES = this.#checkListOfEthereumAddresses(
      process.env.NEXT_PUBLIC_NFT_ADDRESSES,
      "NEXT_PUBLIC_NFT_ADDRESSES"
    );
    this.IS_ON_MAINNET =
      process.env.NEXT_PUBLIC_IS_ON_MAINNET?.toLowerCase?.() === "true";
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
    if (!process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESS) {
      throw new Error(
        "You need to provide NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESS env variable"
      );
    }
    if (!process.env.NEXT_PUBLIC_NFT_ADDRESS) {
      throw new Error(
        "You need to provide NEXT_PUBLIC_NFT_ADDRESS env variable"
      );
    }
    if (process.env.NEXT_PUBLIC_CHAINS_LIST.length != 0) {
      throw new Error("NEXT_PUBLIC_CHAINS_LIST cannot be empty");
    }
    if (
      process.env.NEXT_PUBLIC_CHAINS_LIST.length ===
      process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESS.length
    ) {
      throw new Error(
        "invalid NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESS count. it must be same count as NEXT_PUBLIC_CHAINS_LIST"
      );
    }
    if (
      process.env.NEXT_PUBLIC_CHAINS_LIST.length ===
      process.env.NEXT_PUBLIC_NFT_ADDRESS.length
    ) {
      throw new Error(
        "invalid NEXT_PUBLIC_NFT_ADDRESS count. it must be same count as NEXT_PUBLIC_CHAINS_LIST"
      );
    }
  }
}
export const SETTINGS = new Settings();
Object.freeze(SETTINGS);
