import { useLocation } from "wouter";
import { RoleSelection, type UserRole } from "@/components/RoleSelection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WalletConnect } from "@/components/WalletConnect";

export default function Auth() {
  const [, setLocation] = useLocation();

  const handleRoleSelect = (role: UserRole) => {
    console.log("Role selected:", role);
    // Store role in state/context if needed
    setLocation(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">AgriChain</h1>
          </div>
          <div className="flex items-center gap-4">
            <WalletConnect />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to AgriChain</CardTitle>
              <CardDescription>
                Your wallet is connected. Now choose your role to access your personalized dashboard.
              </CardDescription>
            </CardHeader>
          </Card>

          <RoleSelection onRoleSelect={handleRoleSelect} />
        </div>
      </main>
    </div>
  );
}