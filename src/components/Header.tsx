import { ModeToggle } from "./ModeToggle";
import Link from 'next/link'
import { Wallet } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";
// import { MetaMaskProvider } from "@metamask/sdk-react";  
import { WalletProvider } from "./WalletProvider";

const Header = () => {

    // const host = typeof window !== 'undefined' ? window.location.host : "defaultHost";

    // const sdkOptions = {
    //     logging: { developerMode: false },
    //     checkinstallationImmediately: false,
    //     dappMetadata: {
    //         name: "DeFi setup",
    //         url: host,
    //     }
    // }




    return (
        <header className="mx-auto bg-card border mb-20 border-border rounded-xl p-3 sm:p-4 fintech-card m-4">
            <div className="flex items-center justify-evenly gap-4 sm:gap-8">
                <Link href="/" className="flex gap-2 flex-shrink-0 text-primary hover:text-primary/80 text-2xl sm:text-3xl transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 sm:w-10 sm:h-10"
                        aria-hidden="true"
                    >
                        <path d="M12 11.3884C11.0942 9.62673 8.62833 6.34423 6.335 4.7259C4.13833 3.17506 3.30083 3.4434 2.75167 3.69256C2.11583 3.9784 2 4.95506 2 5.52839C2 6.10339 2.315 10.2367 2.52 10.9276C3.19917 13.2076 5.61417 13.9776 7.83917 13.7309C4.57917 14.2142 1.68333 15.4017 5.48083 19.6292C9.65833 23.9542 11.2058 18.7017 12 16.0392C12.7942 18.7017 13.7083 23.7651 18.4442 19.6292C22 16.0392 19.4208 14.2142 16.1608 13.7309C18.3858 13.9784 20.8008 13.2076 21.48 10.9276C21.685 10.2376 22 6.10256 22 5.52923C22 4.95423 21.8842 3.97839 21.2483 3.6909C20.6992 3.44256 19.8617 3.17423 17.665 4.72423C15.3717 6.34506 12.9058 9.62756 12 11.3884Z"></path>
                    </svg>
                    <span className=" amber-accent font-semibold">DeFi</span>
                </Link>

                {/* Navigation menu */}
                <nav className="sm:flex  flex-wrap items-center justify-around gap-8 mx-auto hidden">
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
                <div className="flex justify-center items-center gap-4">
                    <ModeToggle />
                    {/* <button
                        className="group relative h-12 px-6 rounded-xl bg-primary cursor-pointer hover:bg-primary/90 transition-all duration-300 flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl ring-2 ring-transparent hover:ring-primary/30 transform hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-2">
                            Connect Wallet
                            <Wallet className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </div>

                       
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button> */}
                    {/* <MetaMaskProvider debug={false} sdkOptions={sdkOptions}> */}
                    <WalletProvider>
                        <ConnectWalletButton />

                    </WalletProvider>
                    {/* </MetaMaskProvider> */}

                </div>
            </div>
        </header>
    )
}

export default Header;