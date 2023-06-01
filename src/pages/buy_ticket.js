import {Web3Button, Web3NetworkSwitch} from "@web3modal/react";
import {parseEther, parseGwei, recoverMessageAddress} from 'viem'
import {usePrepareContractWrite, useContractWrite, useAccount} from 'wagmi'
import Image from 'next/image'
import {Button} from '../components/Button';
import React, {useEffect} from "react";
import Link from "next/link";

import { useRouter } from 'next/router';
import AffiliateMarketing from "../contracts/AffiliateMarketing";

const AFFILIATE_MARKETING_CONTRACT_ADDRESS = AffiliateMarketing.address;
const affiliateContractABI = AffiliateMarketing.abi;

export default function BuyTicket() {
    const {isConnected} = useAccount()
    const {write} = useContractWrite({
        address: AFFILIATE_MARKETING_CONTRACT_ADDRESS,
        abi: affiliateContractABI,
        functionName: 'buyTicket',
    })

    // TODO: call function to check if already bought NFT
    const {checkNFT} = useContractWrite({
        address: AFFILIATE_MARKETING_CONTRACT_ADDRESS,
        abi: affiliateContractABI,
        functionName: 'buyTicket',
    })

    // TODO: call function to get reamining tickets
    const {getNumRemainingTickets} = useContractWrite({
        address: AFFILIATE_MARKETING_CONTRACT_ADDRESS,
        abi: affiliateContractABI,
        functionName: 'buyTicket',
    })

    const buy = () => {
        // TODO: check balance, chain Id and handle errors
        write({
            value: parseEther('0.001'),
        })
    }

    const router = useRouter();
    const { from } = router.query;

    useEffect(() => {
        // TODO: Affiliate Marketing Address
        console.log('keywords here ', from)
    }, [from])

    return (
        <>
            {/* TODO: check if NFT is already in wallet */}
            <p className="colorful-text" style={{fontSize: '35px', color: 'white', fontFamily: 'fantasy'}}>June 20 2023</p>
            <p style={{fontSize: '28px', marginTop: '-20px', color: 'white', textAlign: 'center'}}>3-5 PM</p>
            <Image src={require('../assets/skateboard.gif')} height={300} style={{margin: '10px'}}/>
            <p style={{fontSize: '28px', color: 'white', textAlign: 'center'}}><Image src={require('../assets/polygon-matic-logo.png')} width={30} />40</p>
            {isConnected ? <Button as="a" href="#" disabled={!isConnected} onClick={buy} filled>Buy Ticket</Button> : null}
            <Web3Button icon="show" label="Connect Wallet" balance="show"/>
            <br/>

            <Web3NetworkSwitch/>
            <br/>
        </>
    );
}
