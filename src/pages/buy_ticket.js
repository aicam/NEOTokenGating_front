import {Web3Button, Web3NetworkSwitch} from "@web3modal/react";
import CustomButton from "../components/CustomButton";
import {parseEther, parseGwei, recoverMessageAddress} from 'viem'
import {usePrepareContractWrite, useContractWrite, useAccount} from 'wagmi'
import Image from 'next/image'
import {Button} from '../components/Button';
import React from "react";
import AffiliateMarketing from "../contracts/AffiliateMarketing";

const AFFILIATE_MARKETING_CONTRACT_ADDRESS = AffiliateMarketing.address;
const affiliateContractABI = AffiliateMarketing.abi;

export default function BuyTicket() {
    const {address, connector, isConnected} = useAccount()
    const {data, isLoading, isSuccess, write} = useContractWrite({
        address: AFFILIATE_MARKETING_CONTRACT_ADDRESS,
        abi: affiliateContractABI,
        functionName: 'buyTicket',
    })
    //
    // const { write } = useContractWrite(config)

    return (
        <>
            <p className="colorful-text" style={{fontSize: '35px', color: 'white', fontFamily: 'fantasy'}}>June 20 2023</p>
            <p style={{fontSize: '28px', marginTop: '-20px', color: 'white', textAlign: 'center'}}>3-5 PM</p>
            <Image src={require('../assets/skateboard.gif')} height={300} style={{margin: '10px'}}/>
            <p style={{fontSize: '28px', color: 'white', textAlign: 'center'}}><Image src={require('../assets/polygon-matic-logo.png')} width={30} />40</p>
            {isConnected ? <Button as="a" href="#" disabled={!isConnected} onClick={() => write({
                value: parseEther('0.001'),
            })} filled>Buy Ticket</Button> : null}
            <Web3Button icon="show" label="Connect Wallet" balance="show"/>
            <br/>

            {/* Network Switcher Button */}
            <Web3NetworkSwitch/>
            <br/>

            {/* Custom button.css */}
            {/*<CustomButton />*/}
        </>
    );
}
