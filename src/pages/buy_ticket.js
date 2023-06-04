import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pacifico, Slackey } from "next/font/google";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { watchNetwork, getNetwork } from "@wagmi/core";
import { ToastContainer, toast } from "react-toastify";
import { createPublicClient, getContract, http, formatEther } from "viem";

import { Button } from "../components/Button";
import { SETTINGS } from "../settings";
import { ChainsListHandler } from "../web3_core/chains";
import affiliateContractABI from "../assets/ABI/affiliateABI.json";
import erc20ABI from "../assets/ABI/erc20ABI.json";
//==================

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const slackey = Slackey({ subsets: ["latin"], weight: "400" });

//============Delete

export default function BuyTicket() {
  //====================================
  // 1. Create contract instance

  const [retrievedDataState, setRetrievedDataState] = useState(0);
  const [canBuy, setCanBuy] = useState(false);
  const [connectedAccountAddress, setConnectedAccountAddress] = useState("");
  const [affiliateContractAddress, setAffiliateContractAddress] = useState("");
  const [retrievedDataFromSmartContract, setRetrievedDataFromSmartContract] =
    useState(null);
  const [buyTicketTransactionHash, setBuyTicketTransactionHash] =
    useState(null);
  const [blockExplorerUrl, setBlockExplorerUrl] = useState("");
  // TODO: set user ticket balance 1 if has it
  const [userTicketBalance, setUserTicketBalance] = useState(0);
  const validChains = new ChainsListHandler();

  //======================Contract Hooks
  const buyTicketContractFunc = useContractWrite({
    address: affiliateContractAddress,
    abi: affiliateContractABI.abi,
    functionName: "buyTicket",
    onSettled(data) {
      console.log("buyTicket Settled");
    },
    onError(error) {
      setRetrievedDataState(retrievedDataState + 1);
    },
    onSuccess(data) {
      setRetrievedDataState(retrievedDataState + 1);
    },
  });
  const getApproveContractFunc = useContractWrite({
    address: retrievedDataFromSmartContract?.paymentTokenAddress,
    abi: erc20ABI.abi,
    functionName: "approve",
    onSettled(data) {
      console.log("approve Settled");
    },
    onError(error) {
      setRetrievedDataState(retrievedDataState + 1);
    },
    onSuccess(data) {
      setRetrievedDataState(retrievedDataState + 1);
    },
  });

  //======================End of Contract Hooks

  //==============TODO: DELETE
  async function retrievedContractData(
    selectedChain,
    contractAddress,
    connectedAccount
  ) {
    if (selectedChain === undefined || isEmptyString(contractAddress)) {
      selectedChain = validChains.DEFAULT_CHAIN.chain;
      contractAddress =
        SETTINGS.CONTRACT_ADDRESSES_BY_NETWORK[
          validChains.DEFAULT_CHAIN.chainKey
        ];
    }
    const publicClient = createPublicClient({
      chain: selectedChain,
      transport: http(),
    });
    const contract = getContract({
      address: contractAddress,
      abi: affiliateContractABI.abi,
      publicClient,
    });
    const retrievedData = await Promise.all([
      contract.read.priceOfTicket(),
      contract.read.salesTicketID(),
      contract.read.nftAddress(),
      contract.read.soldTickets(),
      contract.read.ticketsAmount(),
      contract.read.paymentTokenAddress(),
    ]);
    let userNFTBalance = 0;
    let erc20Allowance = 0;
    if (!isEmptyString(connectedAccount)) {
      userNFTBalance = await contract.read.safeERC1155BalanceOf([
        retrievedData[2],
        connectedAccount,
        retrievedData[1],
      ]);
      erc20Allowance = await contract.read.safeERC20Allowance([
        retrievedData[5],
        connectedAccount,
      ]);
    }

    setUserTicketBalance(userNFTBalance >= 1n ? 1 : 0);
    setRetrievedDataFromSmartContract({
      ticketPrice: retrievedData[0],
      nftId: retrievedData[1],
      nftAddress: retrievedData[2],
      soldTickets: retrievedData[3],
      ticketAmounts: retrievedData[4],
      paymentTokenAddress: retrievedData[5],
      approvedForTransaction:
        erc20Allowance === retrievedData[0] ? true : false,
    });
    console.log({
      ticketPrice: retrievedData[0],
      nftId: retrievedData[1],
      nftAddress: retrievedData[2],
      soldTickets: retrievedData[3],
      ticketAmounts: retrievedData[4],
      paymentTokenAddress: retrievedData[5],
      userTicketBalance: userNFTBalance,
      approvedForTransaction:
        erc20Allowance === retrievedData[0] ? true : false,
    });
    if (retrievedDataFromSmartContract == null) {
      setRetrievedDataState(retrievedDataState + 1);
    }
  }
  //==============TODO: DELETE end

  useEffect(() => {
    const activeChain = getNetwork().chain;
    validateSelectedChainAndConfigureBuySettings(
      activeChain,
      connectedAccountAddress
    );
    retrievedContractData(
      activeChain,
      affiliateContractAddress,
      connectedAccountAddress
    );
    //====================================
  }, [connectedAccountAddress, affiliateContractAddress, retrievedDataState]);

  function isEmptyString(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }

  const invalidNetworkAction = (withToast) => {
    setCanBuy(false);
    setAffiliateContractAddress("");
    if (withToast) {
      // toast.error("Invalid Selected Network", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      // });
      // toast.error(
      //     'Please change your network',
      //     {
      //         position: "top-right",
      //         autoClose: 5000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "dark",
      //     }
      // );
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

  useEffect(() => {
    if (buyTicketContractFunc.error?.message)
      toast.error(buyTicketContractFunc.error.message.slice(0, 200) + "...");
  }, [buyTicketContractFunc.error]);

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
    buyTicketContractFunc.write();
  };
  const approveTransaction = () => {
    getApproveContractFunc.write({
      args: [
        affiliateContractAddress,
        retrievedDataFromSmartContract.ticketPrice,
      ],
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
      <div className="card">
        <p
          className="colorful-text"
          style={{
            fontSize: "28px",
            color: "white",
            fontFamily: pacifico.style.fontFamily,
          }}
        >
          June 20 2023
        </p>
        <h3 className="h3-kablammo">Barcelona</h3>
        <p
          style={{
            fontSize: "20px",
            marginTop: "-20px",
            color: "white",
            textAlign: "center",
          }}
        >
          Carrer d'en Gignàs, 43, 3-5 PM
        </p>
        <div className="div-nft-card">
          <Image
            src={require("../assets/skateboard.gif")}
            className="image-center"
            width={300}
            alt="NFT image"
          />
        </div>
        <p
          style={{ fontSize: "42px", color: "white", textAlign: "center" }}
          className={slackey.className}
        >
          <img
            src="https://neofileservice.s3.us-west-1.amazonaws.com/usdt.png"
            width={30}
          />
          {retrievedDataFromSmartContract
            ? formatEther(retrievedDataFromSmartContract.ticketPrice)
            : "Retrieving data."}
        </p>
        {retrievedDataFromSmartContract != null ? (
          <>
            <div class="text-effect div-center">
              <h1
                class="neon"
                data-text={`Remaining Tickets: ${
                  retrievedDataFromSmartContract.ticketAmounts -
                  retrievedDataFromSmartContract.soldTickets
                }`}
                contentEditable
              >
                Remaining Tickets:
                {retrievedDataFromSmartContract.ticketAmounts -
                  retrievedDataFromSmartContract.soldTickets}
              </h1>
              <div class="gradient"></div>
              <div class="spotlight"></div>
            </div>
          </>
        ) : null}
        <div className="div-center">
          <Web3Button icon="show" label="Connect Wallet" balance="show" />
        </div>
        {userTicketBalance === 0 ? (
          <>
            <h3
              className="got-ticket-h"
              style={{ fontFamily: pacifico.style.fontFamily }}
            >
              You got your ticket!
            </h3>
            <h3
              className="got-ticket-h"
              style={{ fontFamily: pacifico.style.fontFamily }}
            >
              {retrievedDataFromSmartContract?.nftAddress?.slice(0, 8)}
            </h3>
          </>
        ) : canBuy ? (
          retrievedDataFromSmartContract.approvedForTransaction ? (
            !buyTicketContractFunc.isLoading ? (
              <div className="div-center">
                <Button as="a" href="#" onClick={buyTicket} filled>
                  Buy ticket
                </Button>
              </div>
            ) : (
              <div className="div-center">
                <Button as="a" href="#" disabled={true} filled>
                  Confirm the smart contract
                </Button>
              </div>
            )
          ) : (
            <div className="div-center">
              <Button as="a" href="#" onClick={approveTransaction} filled>
                Approve Transaction
              </Button>
            </div>
          )
        ) : connectedAccountAddress ? (
          <h2
            style={{
              fontSize: "28px",
              color: "white",
              textAlign: "center",
            }}
          >
            Please select a valid network from below.
          </h2>
        ) : null}
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
        <div className="div-center">
          <Web3NetworkSwitch />
        </div>

        <br />
        {/*{buyTicketContractFunc.error ? (*/}
        {/*    <p*/}
        {/*        style={{*/}
        {/*            fontSize: "28px",*/}
        {/*            marginTop: "-20px",*/}
        {/*            color: "white",*/}
        {/*            textAlign: "center",*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        error: {buyTicketContractFunc.error.message}*/}
        {/*    </p>*/}
        {/*) : null}*/}
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
      </div>
    </>
  );
}
