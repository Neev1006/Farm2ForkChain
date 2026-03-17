import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sprout, Truck, Store, User } from "lucide-react";

export type UserRole = "farmer" | "distributor" | "retailer" | "consumer";

interface RoleSelectionProps {
  onRoleSelect?: (role: UserRole) => void;
  className?: string;
}

const roles = [
  {
    id: "farmer" as UserRole,
    title: "Farmer",
    description: "Add and manage produce batches",
    icon: Sprout,
    color: "text-chart-1",
    features: ["Add new produce batches", "Set quality grades", "Manage inventory", "Track sales"]
  },
  {
    id: "distributor" as UserRole,
    title: "Distributor",
    description: "Handle logistics and transfers",
    icon: Truck,
    color: "text-chart-2",
    features: ["Accept produce batches", "Manage logistics", "Update shipping status", "Transfer ownership"]
  },
  {
    id: "retailer" as UserRole,
    title: "Retailer",
    description: "Sell to end consumers",
    icon: Store,
    color: "text-chart-3",
    features: ["Receive from distributors", "Manage retail inventory", "Set consumer prices", "Final sale tracking"]
  },
  {
    id: "consumer" as UserRole,
    title: "Consumer",
    description: "Track product journey",
    icon: User,
    color: "text-chart-4",
    features: ["View product history", "Verify authenticity", "See farm origin", "Check quality records"]
  }
];

export function RoleSelection({ onRoleSelect, className }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    console.log(`Selected role: ${role}`);
    onRoleSelect?.(role);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Role</h2>
        <p className="text-muted-foreground">
          Select your role in the supply chain to access your personalized dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all hover-elevate ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleRoleSelect(role.id)}
              data-testid={`card-role-${role.id}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${role.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {role.title}
                      {isSelected && (
                        <Badge variant="default" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedRole && (
        <div className="mt-8 text-center">
          <Button size="lg" data-testid="button-continue-role">
            Continue as {roles.find(r => r.id === selectedRole)?.title}
          </Button>
        </div>
      )}
    </div>
  );
}