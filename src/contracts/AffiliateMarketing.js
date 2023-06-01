export default {
    address: "0xeB2b17e8e6FeCcf465a189464b4B29D72b3338f3",
    abi: [
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
    ]
}
