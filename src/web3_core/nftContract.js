import { useContractWrite } from "wagmi";

import { SETTINGS } from "../settings";
import * as nftTicketContractABI from "../assets/ABI/nftTicketABI.json";

export class NFTContract {
  constructor() {
    this.buyTicket = buildBuyTicketFunction();
    this.nftAddress = buildNFTAddressFunction();
  }
  #buildHasAffiliateAccessFunction() {
    return useContractWrite({
      address: SETTINGS.NFT_ADDRESS,
      abi: nftTicketContractABI,
      functionName: "minterAccess",
    });
  }
  #buildBalanceOfFunction() {
    return useContractWrite({
      address: SETTINGS.NFT_ADDRESS,
      abi: nftTicketContractABI,
      functionName: "balanceOf",
    });
  }
  async getBalanceOf(accountAddress, nftId) {}
  async getAccessStatusOfAffiliateContract(affiliateContractAddress) {}
}
