import { useState } from "react";
import { useLocation } from "wouter";
import { Hero } from "@/components/Hero";
import { WalletConnect } from "@/components/WalletConnect";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleGetStarted = () => {
    if (isWalletConnected) {
      setLocation("/auth");
    } else {
      // Scroll to wallet connect or show connection prompt
      console.log("Please connect your wallet first");
    }
  };

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
    console.log("Wallet connected:", address);
    setLocation("/auth");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary-foreground">AgriChain</h1>
          </div>
          <div className="flex items-center gap-4">
            <WalletConnect onConnect={handleWalletConnect} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />
    </div>
  );
}