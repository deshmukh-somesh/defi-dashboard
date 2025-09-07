// src/components/ConnectWalletButton.tsx
"use client";

import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatAddress, getNetworkName, isSupportedChain } from "@/lib/utils";
import { Wallet, Copy, LogOut, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from 'sonner';
interface ConnectWalletButtonProps {
    compact?: boolean; // Add this prop
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
    compact = false
}) => {
    const { sdk, connected, connecting, account, chainId } = useSDK();
    const [copied, setCopied] = useState(false);
    const [closeModeal, setCloseModal] = useState(false);

    // Connect to MetaMask
    const handleConnect = async () => {
        // Store the loading toast Id so we can dismiss it later
        const loadingToast = toast.loading("Connecting to wallet...", {
            description: "Please approve the connection in MetaMask",
            className: "fintech-card terminal-gradient border-primary/30"
        });

        try {
            
            await sdk?.connect();
            toast.dismiss(loadingToast);


            toast.success("🎉 Wallet Connected!", {
                description: "Successfully connected to MetaMask",
                className: "fintech-card profit-gain bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500/50",
                duration: 4000
            });
        } catch (err) {

            toast.dismiss(loadingToast);

            console.error("Connection failed:", err);
            toast.error("❌ Connection Failed", {
                description: err instanceof Error ? err.message : "Failed to connect to MetaMask",
                className: "fintech-card financial-loss bg-red-50 dark:bg-red-950/20 border-red-500/50",
                duration: 5000
            });
        }
    };

    // Disconnect from MetaMask
    const handleDisconnect = async () => {
        try {
            await sdk?.terminate();
            toast.info("🔌 Wallet Disconnected", {
                description: "Your wallet has been safely disconnected",
                className: "fintech-card terminal-gradient border-gray-500/50",
                duration: 3000
            });
        } catch (err) {
            console.error("Disconnect failed:", err);
            toast.error("❌ Disconnect Failed", {
                description: err instanceof Error ? err.message : "Disconnect Failed!",
                className: "fintech-card financial-loss bg-red-50 dark:bg-red-950/20 border-red-500/50",
                duration: 3000
            });
        }
    };

    // Copy address to clipboard
    const copyAddress = async () => {
        if (account) {
            try {
                await navigator.clipboard.writeText(account);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);

                toast.success("📋 Address Copied!", {
                    description: "Wallet address copied to clipboard",
                    className: "fintech-card amber-accent bg-amber-50 dark:bg-amber-950/20 border-amber-500/50",
                    duration: 2000
                });
            } catch (err) {
                console.error("Failed to copy address");
                toast.error("❌ Copy Failed", {
                    description: "Could not copy address to clipboard",
                    className: "fintech-card financial-loss bg-red-50 dark:bg-red-950/20 border-red-500/50",
                    duration: 3000
                });
            }
        }
    };

    // Check if on supported network
    const isWrongNetwork = chainId && !isSupportedChain(chainId);

    // Loading state
    if (connecting) {
        return (
            <Button
                disabled
                className="min-w-[140px] btn-financial opacity-70 cursor-not-allowed"
            >
                <Wallet className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
            </Button>
        );
    }

    // Connected state
    if (connected && account) {

        if (compact) {
            return (
                <Button
                    disabled
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500"
                >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Wallet Connected
                </Button>
                
            );
        }

        return (
            <div className="flex items-center gap-3">
                {/* Wrong network warning */}
                {isWrongNetwork && (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-300 hidden sm:inline">
                            Unsupported Network
                        </span>
                    </div>
                )}

                {/* Connection status indicator */}
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 hidden sm:inline">
                        Connected
                    </span>
                </div>

                {/* Connected account popover */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={`min-w-[140px] fintech-card hover:shadow-lg transition-all duration-200 
                                ${isWrongNetwork
                                    ? 'border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                                    : 'border-emerald-300 dark:border-emerald-700 hover:border-primary'
                                }
                                group relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 terminal-gradient opacity-50" />
                            <div className="relative flex items-center">
                                <Wallet className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-mono text-sm">
                                    {formatAddress(account)}
                                </span>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-80 fintech-card shadow-2xl border-0"
                        align="end"
                        sideOffset={8}
                    >
                        <div className="absolute inset-0 terminal-gradient rounded-lg" />

                        <div className="relative space-y-6">
                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                    <Wallet className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg leading-none">MetaMask Wallet</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                                        <p className="text-sm text-muted-foreground">
                                            Securely connected
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account details */}
                            <div className="space-y-4">
                                <div className="data-highlight">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Wallet Address</span>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={copyAddress}
                                            className="h-6 w-6 p-0 hover:bg-primary/10"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <code className="text-sm font-mono bg-muted/50 px-3 py-2 rounded-md block break-all">
                                        {account}
                                    </code>
                                    {copied && (
                                        <div className="flex items-center gap-1 mt-2">
                                            <CheckCircle className="h-3 w-3 profit-gain" />
                                            <span className="text-xs profit-gain font-medium">Address copied!</span>
                                        </div>
                                    )}
                                </div>

                                {chainId && (
                                    <div className="data-highlight">
                                        <span className="text-sm font-medium text-muted-foreground block mb-2">Network</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${isWrongNetwork ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                            <span className={`text-sm font-medium ${isWrongNetwork ? 'text-amber-600 dark:text-amber-400' : 'profit-gain'}`}>
                                                {getNetworkName(chainId)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Network warning */}
                            {isWrongNetwork && (
                                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm">
                                            <p className="font-medium text-amber-700 dark:text-amber-300">Network Not Supported</p>
                                            <p className="text-amber-600 dark:text-amber-400 mt-1">
                                                Please switch to Ethereum, Polygon, or another supported network.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Disconnect button */}
                            <Button
                                onClick={handleDisconnect}
                                variant="outline"
                                className="w-full hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all duration-200 group"
                            >
                                <LogOut className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                Disconnect Wallet
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    // Disconnected state
    return (
        <Button
            onClick={handleConnect}
            className="min-w-[140px] btn-financial group relative overflow-hidden cursor-pointer"
        >
            <div className="absolute inset-0 crypto-gradient-adaptive opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative flex items-center">
                <Wallet className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                Connect Wallet
            </div>
        </Button>
    );
};