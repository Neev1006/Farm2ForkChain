import { DistributorDashboard } from '../DistributorDashboard';
import { Toaster } from "@/components/ui/toaster";

export default function DistributorDashboardExample() {
  return (
    <div className="p-8">
      <DistributorDashboard />
      <Toaster />
    </div>
  );
}