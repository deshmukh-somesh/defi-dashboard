// src/components/ConnectWalletButton.tsx
"use client";

import React, { useState} from "react";
import { useSDK } from "@metamask/sdk-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatAddress, getNetworkName, isSupportedChain } from "@/lib/utils";
import { Wallet, Copy, LogOut, AlertTriangle } from "lucide-react";

export const ConnectWalletButton: React.FC = () => {
    const { sdk, connected, connecting, account, chainId } = useSDK();
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Connect to MetaMask
    const handleConnect = async () => {
        try {
            setError(null);
            await sdk?.connect();
        } catch (err) {
            console.error("Connection failed:", err);
            setError(err instanceof Error ? err.message : "Failed to connect to MetaMask");
        }
    };

    // Disconnect from MetaMask
    const handleDisconnect = async () => {
        try {
            await sdk?.terminate();
            setError(null);
        } catch (err) {
            console.error("Disconnect failed:", err);
        }
    };

    // Copy address to clipboard
    const copyAddress = async () => {
        if (account) {
            try {
                await navigator.clipboard.writeText(account);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy address");
            }
        }
    };

    // Check if on supported network
    const isWrongNetwork = chainId && !isSupportedChain(chainId);

    // Loading state
    if (connecting) {
        return (
            <Button disabled className="min-w-[120px]">
                <Wallet className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
            </Button>
        );
    }

    if(connected){
        console.log(connected);
    }

    // Connected state
    if (connected && account) {
        return (
            <div className="flex items-center gap-2">
                {/* Wrong network warning */}
                {isWrongNetwork && (
                    <div className="flex items-center text-amber-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span className="text-sm hidden sm:inline">Wrong Network</span>
                    </div>
                )}

                {/* Connected account popover */}
                <Popover >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={`min-w-[120px] cursor-pointer ${isWrongNetwork ? 'border-amber-500' : ''}`}
                        >
                            <Wallet className="mr-2 h-4 w-4" />
                            {formatAddress(account)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 sm:w-80"
                        align="end"
                    // side="bottom"
                    // sideOffset={8}

                    >
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Connected Wallet</h4>
                                <p className="text-sm text-muted-foreground">
                                    Your MetaMask wallet is connected
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="text-sm font-medium">Address:</span>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <code className="text-xs bg-muted px-2 py-1 rounded">
                                            {formatAddress(account)}
                                        </code>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={copyAddress}
                                            className="h-6 w-6 p-0"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                        {copied && (
                                            <span className="text-xs text-green-600">Copied!</span>
                                        )}
                                    </div>
                                </div>

                                {chainId && (
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <span className="text-sm font-medium">Network:</span>
                                        <div className="col-span-2">
                                            <span className={`text-sm ${isWrongNetwork ? 'text-amber-600' : ''}`}>
                                                {getNetworkName(chainId)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {isWrongNetwork && (
                                <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                                    Please switch to a supported network (Ethereum, Polygon, etc.)
                                </div>
                            )}

                            <Button
                                onClick={handleDisconnect}
                                variant="outline"
                                size="sm"
                                className="w-full cursor-pointer"
                            >
                                <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                                Disconnect
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    // Disconnected state
    return (
        <div className="flex flex-col items-end gap-2">
            <Button onClick={handleConnect} className="min-w-[120px] cursor-pointer">
                <Wallet className="mr-2 h-4 w-4 " />
                Connect Wallet
            </Button>
            {error && (
                <div className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

// import { formatAddress } from "@/lib/utils"
// import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"

// import Link from 'next/link'
// import WalletIcon from "../../public/icons/WalletIcon"

// import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
// import { Button } from "./ui/button";

// export const ConnectWalletButton = () => {

//     const { sdk, connected, connecting, account } = useSDK();

//     const connect = async () => {
//         try {
//             await sdk?.connect()
//         } catch (error) {
//             console.warn("No accounts found", error);
//         }
//     }

//     const disconnect = () => {
//         if (sdk) {
//             sdk.terminate();
//         }
//     }
//  return (
//     <div className="relative">
//       {connected ? (
//         <Popover>
//           <PopoverTrigger>
//             <Button>{formatAddress(account)}</Button>
//           </PopoverTrigger>
//           <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
//             <button
//               onClick={disconnect}
//               className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
//             >
//               Disconnect
//             </button>
//           </PopoverContent>
//         </Popover>
//       ) : (
//         <Button disabled={connecting} onClick={connect}>
//           <WalletIcon className="mr-2 h-4 w-4" /> Connect Wallet
//         </Button>
//       )}
//     </div>
//   );
// };