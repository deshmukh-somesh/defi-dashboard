import { ModeToggle } from "./ModeToggle";
import Link from 'next/link'
import { Wallet } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";
// import { MetaMaskProvider } from "@metamask/sdk-react";  
import { WalletProvider } from "./WalletProvider";
import Image from "next/image";
import brand from '../../public/icons/brand2.svg'

const Header = () => {
    return (
        <header className="mx-auto bg-card border mb-18 border-border rounded-xl p-3 sm:p-4 fintech-card m-4">
            <div className="flex items-center justify-between gap-4 sm:gap-8">
                <Link href="/" className="flex gap-2.5 flex-shrink-0 text-primary hover:text-primary/80 text-2xl sm:text-3xl transition-colors">
                    <Image
                        alt="DeFi Brand Logo"
                        src={brand}
                        width={32}
                        height={32}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                    <span className="  max-[400px]:hidden sm:inline amber-accent font-semibold">DeFi</span>
                </Link>

                {/* Navigation menu */}
                <nav className="items-center justify-around gap-8 mx-auto hidden">
                    <a href="#" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent">
                        Markets
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent">
                        Portfolio
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent">
                        Trading
                    </a>
                </nav>

                {/* User Avatar */}
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <ModeToggle />

                    <ConnectWalletButton />





                </div>
            </div>
        </header>
    )
}

export default Header;