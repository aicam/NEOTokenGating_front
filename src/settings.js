class Settings {
  constructor() {
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

    this.WALLET_CONNECT_TOKEN = process.env.NEXT_PUBLIC_WALLET_CONNECT_TOKEN;
    this.DEFAULT_AFFILIATE_ADDRESS =
      process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_ADDRESS;
    this.NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS;
    this.IS_ON_POLYGON_MAINNET =
      process.env.NEXT_PUBLIC_IS_ON_POLYGON_MAINNET?.toLowerCase?.() === "true";
  }
}
export const SETTINGS = new Settings();
Object.freeze(SETTINGS);
