import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Pacifico, Slackey} from "next/font/google";
import {Web3Button, Web3NetworkSwitch} from "@web3modal/react";
import {parseEther} from "viem";
import {
    useAccount,
    watchReadContract,
    useContractWrite,
    useContractRead,
} from "wagmi";
import {watchNetwork, getNetwork} from "@wagmi/core";
import {ToastContainer, toast} from "react-toastify";

import {Button} from "../components/Button";
import {SETTINGS} from "../settings";
import {ChainsListHandler} from "../web3_core/chains";
import * as ACABI from "../assets/ABI/affiliateABI.json";
//==================
const affiliateContractABI = ACABI.abi;
const pacifico = Pacifico({subsets: ['latin'], weight: '400'});
const slackey = Slackey({subsets: ['latin'], weight: '400'})
export default function BuyTicket() {
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
        onConnect({address}) {
            validateSelectedChainAndConfigureBuySettings(getNetwork().chain, address);
        },
        onDisconnect() {
            validateSelectedChainAndConfigureBuySettings(undefined, "");
            setConnectedAccountAddress("");
        },
    });

    useEffect(() => {
        if (buyTicketContractFunc.error?.message)
            toast.error(buyTicketContractFunc.error.message.slice(0, 200) + '...')
    }, [buyTicketContractFunc.error])

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

    watchNetwork(({chain, chains}) =>
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
            <div className="card">
                <p
                    className="colorful-text"
                    style={{fontSize: "28px", color: "white", fontFamily: pacifico.style.fontFamily}}
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
                <p style={{fontSize: "42px", color: "white", textAlign: "center"}} className={slackey.className}>
                    <img
                        src="https://neofileservice.s3.us-west-1.amazonaws.com/usdt.png"
                        width={30}
                    />
                    40
                </p>
                {retrievedDataFromSmartContract != null ? (
                    <>
                        <div class="text-effect div-center">
                            <h1 class="neon"
                                data-text={`Remaining Tickets: ${parseInt(retrievedDataFromSmartContract.ticketAmounts) - parseInt(retrievedDataFromSmartContract.soldTickets)}`}
                                contentEditable>Remaining Tickets:
                                {parseInt(retrievedDataFromSmartContract.ticketAmounts) - parseInt(retrievedDataFromSmartContract.soldTickets)}</h1>
                            <div class="gradient"></div>
                            <div class="spotlight"></div>
                        </div>
                    </>
                ) : null}
                <div className="div-center">
                    <Web3Button icon="show" label="Connect Wallet" balance="show"/>
                </div>
                {
                    userTicketBalance === 0 ?
                        <>
                            <h3 className="got-ticket-h" style={{fontFamily: pacifico.style.fontFamily}}>You got your
                                ticket!</h3>
                            <h3 className="got-ticket-h" style={{fontFamily: pacifico.style.fontFamily}}>
                                {retrievedDataFromSmartContract?.nftAddress?.slice(0, 8)}</h3>
                        </>
                        :
                        canBuy ? (
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
                <br/>
                <div
                    className="div-center"
                >
                    <Web3NetworkSwitch/>
                </div>

                <br/>
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
                <br/>
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
