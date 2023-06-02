import { useContractWrite } from "wagmi";

import { SETTINGS } from "../settings";
import * as affiliateContractABI from "../assets/ABI/affiliateABI.json";

export class AffiliateContract {
  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.buyTicket = this.#buildBuyTicketFunction();
    this.nftAddress = this.#buildNFTAddressFunction();
    this.priceOfTicket = this.#buildPriceOfTicketFunction();
    this.ticketNFTId = this.#buildTicketNFTIdFunction();
    this.soldTicketsAmount = this.#buildSoldTicketsAmountFunction();
    this.contractTicketsAmount = this.#buildContractTicketsAmountFunction();
  }
  #buildBuyTicketFunction() {
    return useContractWrite({
      address: this.contractAddress,
      abi: affiliateContractABI,
      functionName: "buyTicket",
    });
  }
  #buildNFTAddressFunction() {
    return useContractWrite({
      address: this.contractAddress,
      abi: affiliateContractABI,
      functionName: "nftAddress",
    });
  }
  #buildPriceOfTicketFunction() {
    return useContractWrite({
      address: this.contractAddress,
      abi: affiliateContractABI,
      functionName: "priceOfTicket",
    });
  }
  #buildTicketNFTIdFunction() {
    return useContractWrite({
      address: this.contractAddress,
      abi: affiliateContractABI,
      functionName: "salesTicketID",
    });
  }
  #buildSoldTicketsAmountFunction() {
    return useContractWrite({
      address: this.contractAddress,
      abi: affiliateContractABI,
      functionName: "soldTickets",
    });
  }
  #buildContractTicketsAmountFunction() {
    return useContractWrite({
      address: this.contractAddress,
      abi: affiliateContractABI,
      functionName: "ticketsAmount",
    });
  }
}
