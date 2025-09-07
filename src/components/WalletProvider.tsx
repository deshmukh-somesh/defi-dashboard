'use client'
import React, { ReactNode } from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react'
import { SDKOptions } from '@/types/metamask';
interface WalletProviderProps {
    children: ReactNode;
}


export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {

    // get the current host for dapp metadata
    const host = typeof window !== 'undefined' ? window.location.host : "defaultHost";

    const SDKOptions: SDKOptions = {
        logging: {
            developerMode: true, // Set to true for development debugging.
        },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "MetaMask Next.js Dapp",
            url: host,
            iconUrl: "/icons/wallet.svg"
        }
    }

    return (

        <MetaMaskProvider debug={false} sdkOptions={SDKOptions}>
            {children}
        </MetaMaskProvider>
    )
}



