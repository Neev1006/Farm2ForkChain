import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin, Calendar, DollarSign, Award, Truck, QrCode } from "lucide-react";
import QRCodeGenerator from 'qrcode';

interface SupplyChainStep {
  id: string;
  type: "farmer" | "distributor" | "retailer";
  name: string;
  location: string;
  timestamp: Date;
  price?: number;
  status: string;
  details: string;
}

interface ProductInfo {
  id: string;
  name: string;
  quality: string;
  origin: string;
  harvestDate: Date;
  farmer: string;
  finalPrice: number;
  supplyChain: SupplyChainStep[];
}

export function ConsumerTracking() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // TODO: Remove mock data - replace with real blockchain queries
  const mockProduct: ProductInfo = {
    id: "BC789456",
    name: "Organic Tomatoes",
    quality: "Grade A",
    origin: "Green Valley Farm, California",
    harvestDate: new Date("2024-01-15"),
    farmer: "Green Valley Farm",
    finalPrice: 399,
    supplyChain: [
      {
        id: "1",
        type: "farmer",
        name: "Green Valley Farm",
        location: "Salinas, California",
        timestamp: new Date("2024-01-15"),
        price: 280,
        status: "Harvested",
        details: "Organic tomatoes harvested from greenhouse cultivation"
      },
      {
        id: "2",
        type: "distributor",
        name: "Fresh Logistics Co.",
        location: "Distribution Center, San Francisco",
        timestamp: new Date("2024-01-16"),
        price: 305,
        status: "In Transit",
        details: "Temperature-controlled transport to retail locations"
      },
      {
        id: "3",
        type: "retailer",
        name: "FreshMart Grocery",
        location: "Store #142, San Jose",
        timestamp: new Date("2024-01-17"),
        price: 399,
        status: "Available for Sale",
        details: "Product received and placed in produce section"
      }
    ]
  };

  const trackProduct = () => {
    setIsLoading(true);
    console.log("Tracking product:", productId);
    
    // TODO: Replace with real blockchain query
    setTimeout(async () => {
      if (productId.toLowerCase().includes("bc") || productId === "789456") {
        setProduct(mockProduct);
        // Generate QR code for the product tracking URL
        const trackingUrl = `${window.location.origin}/track/${productId}`;
        try {
          const qrCode = await QRCodeGenerator.toDataURL(trackingUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: '#1f2937',
              light: '#ffffff'
            }
          });
          setQrCodeUrl(qrCode);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      } else {
        setProduct(null);
        setQrCodeUrl("");
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "farmer": return Award;
      case "distributor": return Truck;
      case "retailer": return MapPin;
      default: return MapPin;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case "farmer": return "text-chart-1";
      case "distributor": return "text-chart-2";
      case "retailer": return "text-chart-3";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Track Your Product</h1>
        <p className="text-muted-foreground">
          Enter a product ID or barcode to see its complete journey from farm to store
        </p>
      </div>

      {/* Search */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter product ID or barcode (try: BC789456)"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && trackProduct()}
                data-testid="input-product-id"
              />
            </div>
            <Button
              onClick={trackProduct}
              disabled={!productId || isLoading}
              data-testid="button-track-product"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Tracking..." : "Track"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Information */}
      {product && (
        <div className="space-y-6">
          {/* Product Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription>Product ID: {product.id}</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-chart-1 text-primary-foreground">
                    Verified
                  </Badge>
                  {qrCodeUrl && (
                    <div className="flex flex-col items-center gap-2">
                      <QrCode className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">QR Code</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-chart-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Quality</p>
                    <p className="font-medium" data-testid="text-product-quality">{product.quality}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-chart-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Origin</p>
                    <p className="font-medium" data-testid="text-product-origin">{product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-chart-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Harvest Date</p>
                    <p className="font-medium" data-testid="text-harvest-date">
                      {product.harvestDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-chart-4" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="font-medium" data-testid="text-final-price">
                      ₹{product.finalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Card */}
          {qrCodeUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Share Product Journey
                </CardTitle>
                <CardDescription>
                  Scan this QR code to quickly access this product's tracking information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={qrCodeUrl} 
                      alt={`QR Code for ${product.name}`}
                      className="rounded-lg border"
                      data-testid="img-qr-code"
                    />
                  </div>
                  <div className="flex-1 space-y-3 text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                      This QR code contains the tracking URL for this product. 
                      Share it with others or scan it later to quickly access the complete supply chain journey.
                    </p>
                    <div className="text-xs font-mono bg-muted p-2 rounded break-all" data-testid="text-tracking-url">
                      {window.location.origin}/track/{product.id}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const url = `${window.location.origin}/track/${product.id}`;
                        navigator.clipboard.writeText(url);
                        console.log('Tracking URL copied to clipboard');
                      }}
                      data-testid="button-copy-url"
                    >
                      Copy Tracking URL
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Supply Chain Journey */}
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Journey</CardTitle>
              <CardDescription>
                Complete traceability from farm to store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {product.supplyChain.map((step, index) => {
                  const Icon = getStepIcon(step.type);
                  const isLast = index === product.supplyChain.length - 1;
                  
                  return (
                    <div key={step.id} className="relative">
                      <div className="flex items-start gap-4">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full bg-muted ${getStepColor(step.type)}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {!isLast && (
                            <div className="w-px h-16 bg-border mt-2" />
                          )}
                        </div>
                        
                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <div 
                            className="p-4 rounded-lg border hover-elevate"
                            data-testid={`card-step-${step.id}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{step.name}</h3>
                                <Badge variant="outline" className="capitalize">
                                  {step.type}
                                </Badge>
                              </div>
                              {step.price && (
                                <span className="text-sm font-medium">
                                  ₹{step.price}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {step.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {step.timestamp.toLocaleDateString()} at {step.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <p className="text-sm">{step.details}</p>
                              <Badge 
                                variant="outline"
                                className="ml-4"
                                data-testid={`status-${step.id}`}
                              >
                                {step.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Price History */}
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>
                How the price changed through the supply chain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {product.supplyChain
                  .filter(step => step.price)
                  .map((step, index) => (
                    <div key={step.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="capitalize">
                          {step.type}
                        </Badge>
                        <span className="text-sm">{step.name}</span>
                      </div>
                      <span className="font-medium" data-testid={`price-${step.id}`}>
                        ₹{step.price}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Results */}
      {!product && productId && !isLoading && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              Product not found. Please check the ID and try again.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try using: BC789456
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}