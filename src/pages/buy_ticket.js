import {Web3Button, Web3NetworkSwitch} from "@web3modal/react";
import CustomButton from "../components/CustomButton";
import {parseEther, parseGwei, recoverMessageAddress} from 'viem'
import {usePrepareContractWrite, useContractWrite, useAccount} from 'wagmi'
import Image from 'next/image'
import {Button} from '../components/Button';
import React from "react";

const AFFILIATE_MARKETING_CONTRACT_ADDRESS =
    "0xeB2b17e8e6FeCcf465a189464b4B29D72b3338f3";
const affiliateContractABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_masterAccount",
                type: "address",
            },
            {
                internalType: "address",
                name: "_primaryAccount",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_primaryAccountShare",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_totalSharePart",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_priceOfTicket",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_ticketsAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_salesTicketID",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_nftAddress",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "customerAccountAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "totalAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "masterAccountShare",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "primaryAccountShare",
                type: "uint256",
            },
        ],
        name: "BuyActions",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "time",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "EthLog",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [],
        name: "buyTicket",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "checkMasterAccountShare",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "checkPrimaryAccountShare",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "extractInvalidEth",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "extractUnsoldTickets",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "masterAccount",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "mintTheTickets",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "nftAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC1155Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "priceOfTicket",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "primaryAccount",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "primaryAccountShare",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "remainingTickets",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "erc1155ContractAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "safeERC1155BalanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "balanceOfAccount",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "salesTicketID",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "soldTickets",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "ticketsAmount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSharePart",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];

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
            <p style={{fontSize: '35px', color: 'white', fontFamily: 'fantasy'}}>June 20 2023</p>
            <p style={{fontSize: '28px', color: 'white', textAlign: 'center'}}>3-5 PM</p>
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
