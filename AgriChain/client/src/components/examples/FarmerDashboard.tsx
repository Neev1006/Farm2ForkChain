import { FarmerDashboard } from '../FarmerDashboard';
import { Toaster } from "@/components/ui/toaster";

export default function FarmerDashboardExample() {
  return (
    <div className="p-8">
      <FarmerDashboard />
      <Toaster />
    </div>
  );
}