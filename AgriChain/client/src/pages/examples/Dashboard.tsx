import { Switch, Route } from "wouter";
import Dashboard from '../Dashboard';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardExample() {
  return (
    <ThemeProvider>
      <Switch>
        <Route path="/dashboard/farmer" component={Dashboard} />
        <Route>
          <div className="p-4 text-center">
            <p>Navigate to one of these dashboard examples:</p>
            <div className="mt-4 space-x-4">
              <a href="/dashboard/farmer" className="text-blue-500 hover:underline">
                /dashboard/farmer
              </a>
              <a href="/dashboard/distributor" className="text-blue-500 hover:underline">
                /dashboard/distributor
              </a>
              <a href="/dashboard/consumer" className="text-blue-500 hover:underline">
                /dashboard/consumer
              </a>
            </div>
          </div>
        </Route>
      </Switch>
      <Toaster />
    </ThemeProvider>
  );
}