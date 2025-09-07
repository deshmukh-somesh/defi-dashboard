import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Lock } from "lucide-react";
import { SimplePremiumModalProps } from '@/types/pool';
import { ConnectWalletButton } from './ConnectWalletButton';
import { useSDK } from '@metamask/sdk-react'

export const PremiumModal = ({
    isOpen,
    onClose,
}: SimplePremiumModalProps) => {
    const { connected } = useSDK();

    // Use useEffect to handle the side effect of closing the modal
    useEffect(() => {
        if (connected && isOpen) {
            onClose();
        }
    }, [connected, isOpen, onClose]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                    </div>

                    <DialogTitle>Premium Content</DialogTitle>

                    <DialogDescription>
                        Connect your wallet to access this premium pool data and analytics.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-3 mt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 cursor-pointer"
                    >
                        Cancel
                    </Button>

                    {/* Use your ConnectWalletButton here */}
                    <div className="flex-1">
                        <ConnectWalletButton compact />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};