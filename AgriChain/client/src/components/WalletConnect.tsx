import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle } from "lucide-react";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  className?: string;
}

export function WalletConnect({ onConnect, className }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    console.log("Connecting to MetaMask...");
    // TODO: Remove mock functionality - integrate with real MetaMask
    const mockAddress = "0x742d35Cc6634C0532925a3b8D4C0B31f3d03F600";
    setWalletAddress(mockAddress);
    setIsConnected(true);
    onConnect?.(mockAddress);
  };

  const disconnectWallet = () => {
    console.log("Disconnecting wallet...");
    setIsConnected(false);
    setWalletAddress("");
  };

  if (isConnected) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Badge variant="outline" className="gap-1" data-testid="text-wallet-address">
          <CheckCircle className="h-3 w-3 text-chart-1" />
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnectWallet}
          data-testid="button-disconnect-wallet"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      className={className}
      data-testid="button-connect-wallet"
    >
      <Wallet className="h-4 w-4 mr-2" />
      Connect MetaMask
    </Button>
  );
}