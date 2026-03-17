import { useRoute, useLocation } from "wouter";
import { FarmerDashboard } from "@/components/FarmerDashboard";
import { DistributorDashboard } from "@/components/DistributorDashboard";
import { ConsumerTracking } from "@/components/ConsumerTracking";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { UserRole } from "@/components/RoleSelection";

export default function Dashboard() {
  const [match, params] = useRoute("/dashboard/:role");
  const [, setLocation] = useLocation();
  const role = params?.role as UserRole;

  const getDashboardComponent = () => {
    switch (role) {
      case "farmer":
        return <FarmerDashboard />;
      case "distributor":
      case "retailer":
        return <DistributorDashboard />;
      case "consumer":
        return <ConsumerTracking />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Invalid Role</h2>
            <p className="text-muted-foreground mb-6">
              The requested role is not valid. Please select a valid role.
            </p>
            <Button onClick={() => setLocation("/auth")}>
              Select Role
            </Button>
          </div>
        );
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case "farmer": return "Farmer Portal";
      case "distributor": return "Distributor Portal";
      case "retailer": return "Retailer Portal";
      case "consumer": return "Consumer Portal";
      default: return "Dashboard";
    }
  };

  if (!match) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b p-4 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/auth")}
              data-testid="button-back-to-auth"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">AgriChain</h1>
              <p className="text-sm text-muted-foreground">{getRoleTitle()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <WalletConnect />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {getDashboardComponent()}
      </main>
    </div>
  );
}