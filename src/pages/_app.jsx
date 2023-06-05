import {useEffect, useState} from "react";

import {Web3Modal} from "@web3modal/react";
import {WagmiConfig} from "wagmi";

import {wConfig, ethereumClient, projectId} from "../web3_core/wagamiConfigs";

import "react-toastify/dist/ReactToastify.css";
import "../styles.css";
import "../assets/styles.css";
import "../assets/button.css";
import "../assets/styles.scss"
import "../assets/modal.css"

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> component
export default function App({Component, pageProps}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    return (
        <>
            {ready ? (
                <WagmiConfig config={wConfig}>
                        <Component {...pageProps} />
                </WagmiConfig>
            ) : null}

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
        </>
    );
}
