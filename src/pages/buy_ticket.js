import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import { Button } from "../components/Button";
import { SETTINGS } from "../settings";
import * as allChains from "wagmi/chains";

import { AffiliateContract } from "../web3_core/affiliateContract";
//==================

export default function BuyTicket() {
  //======================================

  //======================================
  const { address, connector, isConnected } = useAccount();

  const [loadingRequirements, setLoadingRequirements] = useState(false);
  const router = useRouter();
  const { from } = router.query;

  async function Kir(params) {
    console.log(params);
  }
  useEffect(() => {
    setLoadingRequirements(true);
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
