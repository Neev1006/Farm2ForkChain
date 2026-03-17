import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Link } from "lucide-react";
import heroImage from "@assets/generated_images/Agricultural_landscape_with_technology_overlay_b0c8cefb.png";

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-primary-foreground">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Track Your Food's
          <br />
          <span className="text-chart-1">Journey</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          From farm to table with blockchain transparency. 
          Trust, verify, and trace every step of your food's supply chain.
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Shield className="h-5 w-5 text-chart-1" />
            <span className="font-medium">Trust</span>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Eye className="h-5 w-5 text-chart-1" />
            <span className="font-medium">Transparency</span>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Link className="h-5 w-5 text-chart-1" />
            <span className="font-medium">Traceability</span>
          </div>
        </div>

        <Button
          size="lg"
          variant="outline"
          className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={onGetStarted}
          data-testid="button-get-started"
        >
          Connect Wallet to Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}