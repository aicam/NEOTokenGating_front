import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { parseEther } from "viem";
import {
  useAccount,
  watchReadContract,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { watchNetwork, getNetwork } from "@wagmi/core";
import { ToastContainer, toast } from "react-toastify";

import { Button } from "../components/Button";
import { SETTINGS } from "../settings";
import { ChainsListHandler } from "../web3_core/chains";
import * as ACABI from "../assets/ABI/affiliateABI.json";
//==================
const affiliateContractABI = ACABI.abi;
export default function BuyTicket() {
  const [canBuy, setCanBuy] = useState(false);
  const [connectedAccountAddress, setConnectedAccountAddress] = useState("");
  const [affiliateContractAddress, setAffiliateContractAddress] = useState("");
  const [retrievedDataFromSmartContract, setRetrievedDataFromSmartContract] =
    useState(null);
  const [buyTicketTransactionHash, setBuyTicketTransactionHash] =
    useState(null);
  const [blockExplorerUrl, setBlockExplorerUrl] = useState("");
  const [userTicketBalance, setUserTicketBalance] = useState(0);
  const validChains = new ChainsListHandler();

  //======================Contract Hooks
  const buyTicketContractFunc = useContractWrite({
    address: affiliateContractAddress,
    abi: affiliateContractABI,
    functionName: "buyTicket",
  });
  const nftAddress = useContractRead({
    address: affiliateContractAddress,
    abi: affiliateContractABI,
    functionName: "nftAddress",
  });
  const priceOfTicket = useContractRead({
    address: affiliateContractAddress,
    abi: affiliateContractABI,
    functionName: "priceOfTicket",
  });
  const ticketNFTId = useContractRead({
    address: affiliateContractAddress,
    abi: affiliateContractABI,
    functionName: "salesTicketID",
  });
  const soldTicketsAmount = useContractRead({
    address: affiliateContractAddress,
    abi: affiliateContractABI,
    functionName: "soldTickets",
    watch: true,
  });
  const contractTicketsAmount = useContractRead({
    address: affiliateContractAddress,
    abi: affiliateContractABI,
    functionName: "ticketsAmount",
    watch: true,
  });

  //======================End of Contract Hooks
  useEffect(() => {
    validateSelectedChainAndConfigureBuySettings(
      getNetwork().chain,
      connectedAccountAddress
    );
  }, [connectedAccountAddress, affiliateContractAddress]);

  function isEmptyString(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }
  const invalidNetworkAction = (withToast) => {
    setCanBuy(false);
    setAffiliateContractAddress("");
    if (withToast) {
      toast.error("Invalid Selected Network", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      toast.warn(
        'please change your network from the "Select Network" button',
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  useAccount({
    onConnect({ address }) {
      validateSelectedChainAndConfigureBuySettings(getNetwork().chain, address);
    },
    onDisconnect() {
      validateSelectedChainAndConfigureBuySettings(undefined, "");
      setConnectedAccountAddress("");
    },
  });

  const validateSelectedChainAndConfigureBuySettings = (
    chain,
    updatedAccountAddress
  ) => {
    if (chain === undefined) {
      invalidNetworkAction(false);
      return;
    }
    setConnectedAccountAddress(updatedAccountAddress);
    let validChainKey = Object.keys(validChains.SELECTED_CHAINS).find(
      (key) => chain.id === validChains.SELECTED_CHAINS[key].id
    );
    if (!isEmptyString(validChainKey)) {
      setAffiliateContractAddress(
        SETTINGS.CONTRACT_ADDRESSES_BY_NETWORK[validChainKey]
      );
      setRetrievedDataFromSmartContract({
        ticketPrice: priceOfTicket.data,
        nftId: ticketNFTId.data,
        nftAddress: nftAddress.data,
        soldTickets: soldTicketsAmount.data,
        ticketAmounts: contractTicketsAmount.data,
      });
      setBlockExplorerUrl(chain.blockExplorers.default);
      setCanBuy(true);
    } else {
      invalidNetworkAction(true);
    }
  };

  watchNetwork(({ chain, chains }) =>
    validateSelectedChainAndConfigureBuySettings(chain)
  );

  const buyTicket = () => {
    buyTicketContractFunc.write({
      value: retrievedDataFromSmartContract.ticketPrice,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <p
        className="colorful-text"
        style={{ fontSize: "35px", color: "white", fontFamily: "fantasy" }}
      >
        June 20 2023
      </p>

      <p
        style={{
          fontSize: "28px",
          marginTop: "-20px",
          color: "white",
          textAlign: "center",
        }}
      >
        3-5 PM
      </p>
      <Image
        src={require("../assets/skateboard.gif")}
        height={300}
        style={{ margin: "10px" }}
        alt="sss"
      />
      <p style={{ fontSize: "28px", color: "white", textAlign: "center" }}>
        <Image
          src={require("../assets/polygon-matic-logo.png")}
          width={30}
          alt="sss"
        />
        40
      </p>
      {!connectedAccountAddress ? (
        <p style={{ fontSize: "28px", color: "white", textAlign: "center" }}>
          please connect your web3 wallet
        </p>
      ) : null}
      {canBuy ? (
        !buyTicketContractFunc.isLoading ? (
          <Button as="a" href="#" onClick={buyTicket} filled>
            Buy ticket
          </Button>
        ) : (
          <Button as="a" href="#" disabled={true} filled>
            waiting for the results
          </Button>
        )
      ) : (
        <p
          style={{
            fontSize: "28px",
            marginTop: "-20px",
            color: "white",
            textAlign: "center",
          }}
        >
          please select a valid network from below.
        </p>
      )}
      {retrievedDataFromSmartContract != null ? (
        <p
          style={{
            fontSize: "28px",

            color: "white",
            textAlign: "center",
          }}
        >
          ticket price :{retrievedDataFromSmartContract.ticketPrice?.toString()}{" "}
          ,nftId:
          {retrievedDataFromSmartContract.nftId?.toString()}, nftAddress:
          {retrievedDataFromSmartContract.nftAddress}, sold tickets:
          {retrievedDataFromSmartContract.soldTickets?.toString()}, ticket
          amounts:
          {retrievedDataFromSmartContract.ticketAmounts?.toString()}
        </p>
      ) : null}

      <Web3Button icon="show" label="Connect Wallet" balance="show" />
      {buyTicketTransactionHash ? (
        <a
          style={{
            fontSize: "28px",
            color: "white",
            textAlign: "center",
          }}
          href={`${blockExplorerUrl}/tx/${buyTicketTransactionHash}`}
        >
          transaction sent : {buyTicketTransactionHash}
        </a>
      ) : null}
      <br />

      <Web3NetworkSwitch />

      <br />
      {buyTicketContractFunc.error ? (
        <p
          style={{
            fontSize: "28px",
            marginTop: "-20px",
            color: "white",
            textAlign: "center",
          }}
        >
          error: {buyTicketContractFunc.error.message}
        </p>
      ) : null}
      <br />
      {buyTicketContractFunc.isSuccess ? (
        <p
          style={{
            fontSize: "28px",
            marginTop: "-20px",
            color: "white",
            textAlign: "center",
          }}
        >
          Transaction finished successfully.
        </p>
      ) : null}
    </>
  );
}
