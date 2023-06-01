import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { parseEther } from "viem";
import { useContractWrite, useAccount } from "wagmi";

import { Button } from "../components/Button";
import { SETTINGS } from "../settings";
import * as affiliateContractABI from "../assets/ABI/affiliateABI.json";
import * as nftContractABI from "../assets/ABI/nftTicketABI.json";

export default function BuyTicket() {
  const { address, connector, isConnected } = useAccount();
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: SETTINGS.DEFAULT_AFFILIATE_ADDRESS,
    abi: affiliateContractABI,
    functionName: "buyTicket",
  });
  const router = useRouter();
  const { from } = router.query;

  useEffect(() => {
    console.log("keywords here ", from);
  }, [from]);

  return (
    <>
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
      />
      <p style={{ fontSize: "28px", color: "white", textAlign: "center" }}>
        <Image src={require("../assets/polygon-matic-logo.png")} width={30} />
        40
      </p>
      {isConnected ? (
        <Button
          as="a"
          href="#"
          disabled={!isConnected}
          onClick={() =>
            write({
              value: parseEther("0.001"),
            })
          }
          filled
        >
          Buy Ticket
        </Button>
      ) : null}
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
      <br />

      <Web3NetworkSwitch />
      <br />
    </>
  );
}
