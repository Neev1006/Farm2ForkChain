import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Package, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProduceBatch {
  id: string;
  cropType: string;
  quantity: number;
  unit: string;
  price: number;
  quality: string;
  farmer: string;
  location: string;
  status: "available" | "accepted" | "in-transit" | "delivered";
}

interface ShipmentUpdate {
  batchId: string;
  location: string;
  notes: string;
  timestamp: Date;
}

export function DistributorDashboard() {
  const [availableBatches] = useState<ProduceBatch[]>([
    // TODO: Remove mock data - replace with real blockchain data
    {
      id: "1",
      cropType: "Organic Tomatoes",
      quantity: 500,
      unit: "kg",
      price: 280,
      quality: "Grade A",
      farmer: "Green Valley Farm",
      location: "California, USA",
      status: "available"
    },
    {
      id: "2",
      cropType: "Sweet Corn",
      quantity: 200,
      unit: "kg",
      price: 225,
      quality: "Grade A+",
      farmer: "Sunrise Agriculture",
      location: "Iowa, USA",
      status: "available"
    }
  ]);

  const [acceptedBatches, setAcceptedBatches] = useState<ProduceBatch[]>([
    {
      id: "3",
      cropType: "Organic Apples",
      quantity: 300,
      unit: "kg",
      price: 335,
      quality: "Grade A",
      farmer: "Mountain Orchards",
      location: "Washington, USA",
      status: "in-transit"
    }
  ]);

  const [showUpdateForm, setShowUpdateForm] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState({
    location: "",
    notes: ""
  });

  const { toast } = useToast();

  const acceptBatch = (batchId: string) => {
    const batch = availableBatches.find(b => b.id === batchId);
    if (batch) {
      const acceptedBatch = { ...batch, status: "accepted" as const };
      setAcceptedBatches([...acceptedBatches, acceptedBatch]);
      
      toast({
        title: "Batch Accepted",
        description: `${batch.cropType} batch has been accepted for distribution.`,
      });
      
      console.log("Batch accepted:", batchId);
    }
  };

  const updateShipment = (batchId: string) => {
    if (!updateData.location) return;
    
    setAcceptedBatches(batches => 
      batches.map(batch => 
        batch.id === batchId 
          ? { ...batch, status: "in-transit" as const, location: updateData.location }
          : batch
      )
    );
    
    const update: ShipmentUpdate = {
      batchId,
      location: updateData.location,
      notes: updateData.notes,
      timestamp: new Date()
    };
    
    toast({
      title: "Shipment Updated",
      description: `Location updated to ${updateData.location}`,
    });
    
    setShowUpdateForm(null);
    setUpdateData({ location: "", notes: "" });
    console.log("Shipment update:", update);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-chart-1 text-primary-foreground";
      case "accepted": return "bg-chart-2 text-primary-foreground";
      case "in-transit": return "bg-chart-3 text-primary-foreground";
      case "delivered": return "bg-chart-4 text-primary-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Distributor Dashboard</h1>
        <p className="text-muted-foreground">Manage logistics and track shipments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Batches</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-available-batches">
              {availableBatches.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-in-transit">
              {acceptedBatches.filter(b => b.status === "in-transit").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Pickup</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-pending-pickup">
              {acceptedBatches.filter(b => b.status === "accepted").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-delivered">
              {acceptedBatches.filter(b => b.status === "delivered").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Batches */}
      <Card>
        <CardHeader>
          <CardTitle>Available Batches</CardTitle>
          <CardDescription>
            Accept new produce batches for distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableBatches.map((batch) => (
              <div
                key={batch.id}
                className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                data-testid={`card-available-batch-${batch.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{batch.cropType}</h3>
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                    <Badge variant="outline">{batch.quality}</Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Farmer: {batch.farmer}</span>
                    <span>Location: {batch.location}</span>
                    <span>{batch.quantity} {batch.unit}</span>
                    <span>₹{batch.price} per {batch.unit}</span>
                  </div>
                </div>
                <Button
                  onClick={() => acceptBatch(batch.id)}
                  data-testid={`button-accept-${batch.id}`}
                >
                  Accept Batch
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accepted Batches */}
      <Card>
        <CardHeader>
          <CardTitle>Your Accepted Batches</CardTitle>
          <CardDescription>
            Manage logistics and update shipment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {acceptedBatches.map((batch) => (
              <div key={batch.id} className="space-y-4">
                <div
                  className="flex items-center justify-between p-4 border rounded-lg"
                  data-testid={`card-accepted-batch-${batch.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{batch.cropType}</h3>
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status.replace("-", " ")}
                      </Badge>
                      <Badge variant="outline">{batch.quality}</Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>From: {batch.farmer}</span>
                      <span>Current: {batch.location}</span>
                      <span>{batch.quantity} {batch.unit}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowUpdateForm(showUpdateForm === batch.id ? null : batch.id)}
                    data-testid={`button-update-${batch.id}`}
                  >
                    Update Location
                  </Button>
                </div>

                {/* Update Form */}
                {showUpdateForm === batch.id && (
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-lg">Update Shipment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Current Location</Label>
                          <Input
                            id="location"
                            value={updateData.location}
                            onChange={(e) => setUpdateData({...updateData, location: e.target.value})}
                            placeholder="e.g., Distribution Center, Denver, CO"
                            data-testid="input-update-location"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes (Optional)</Label>
                          <Input
                            id="notes"
                            value={updateData.notes}
                            onChange={(e) => setUpdateData({...updateData, notes: e.target.value})}
                            placeholder="Additional details about the shipment..."
                            data-testid="input-update-notes"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Button
                            onClick={() => updateShipment(batch.id)}
                            disabled={!updateData.location}
                            data-testid="button-submit-update"
                          >
                            Update Shipment
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowUpdateForm(null)}
                            data-testid="button-cancel-update"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}