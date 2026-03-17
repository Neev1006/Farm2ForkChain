import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProduceBatch {
  id: string;
  cropType: string;
  quantity: number;
  unit: string;
  price: number;
  quality: string;
  description: string;
  status: "available" | "sold" | "in-transit";
  createdAt: Date;
}

export function FarmerDashboard() {
  const [batches, setBatches] = useState<ProduceBatch[]>([
    // TODO: Remove mock data - replace with real data from backend
    {
      id: "1",
      cropType: "Organic Tomatoes",
      quantity: 500,
      unit: "kg",
      price: 280,
      quality: "Grade A",
      description: "Fresh organic tomatoes from greenhouse cultivation",
      status: "available",
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2",
      cropType: "Sweet Corn",
      quantity: 200,
      unit: "kg",
      price: 225,
      quality: "Grade A+",
      description: "Non-GMO sweet corn, harvested yesterday",
      status: "in-transit",
      createdAt: new Date("2024-01-14")
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cropType: "",
    quantity: "",
    unit: "kg",
    price: "",
    quality: "",
    description: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBatch: ProduceBatch = {
      id: Date.now().toString(),
      cropType: formData.cropType,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      price: Number(formData.price),
      quality: formData.quality,
      description: formData.description,
      status: "available",
      createdAt: new Date()
    };
    
    setBatches([newBatch, ...batches]);
    setFormData({
      cropType: "",
      quantity: "",
      unit: "kg",
      price: "",
      quality: "",
      description: ""
    });
    setShowForm(false);
    
    toast({
      title: "Batch Created",
      description: `${formData.cropType} batch has been added to blockchain.`,
    });
    
    console.log("New batch created:", newBatch);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-chart-1 text-primary-foreground";
      case "in-transit": return "bg-chart-2 text-primary-foreground";
      case "sold": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your produce batches and track sales</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-add-batch">
          <Plus className="h-4 w-4 mr-2" />
          Add New Batch
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-batches">{batches.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-available-stock">
              {batches.filter(b => b.status === "available").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-value">
              ₹{batches.reduce((sum, batch) => sum + (batch.quantity * batch.price), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Batch Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Produce Batch</CardTitle>
            <CardDescription>
              Register a new batch of produce on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Input
                    id="cropType"
                    value={formData.cropType}
                    onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                    placeholder="e.g., Organic Tomatoes"
                    required
                    data-testid="input-crop-type"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality Grade</Label>
                  <Select
                    value={formData.quality}
                    onValueChange={(value) => setFormData({...formData, quality: value})}
                    required
                  >
                    <SelectTrigger data-testid="select-quality">
                      <SelectValue placeholder="Select quality grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade A+">Grade A+</SelectItem>
                      <SelectItem value="Grade A">Grade A</SelectItem>
                      <SelectItem value="Grade B">Grade B</SelectItem>
                      <SelectItem value="Grade C">Grade C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="500"
                    required
                    data-testid="input-quantity"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => setFormData({...formData, unit: value})}
                  >
                    <SelectTrigger data-testid="select-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                      <SelectItem value="tons">Tons</SelectItem>
                      <SelectItem value="boxes">Boxes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price per {formData.unit || "unit"} (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="280"
                    required
                    data-testid="input-price"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Additional details about the produce..."
                  data-testid="input-description"
                />
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" data-testid="button-submit-batch">Create Batch</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  data-testid="button-cancel-batch"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Batches */}
      <Card>
        <CardHeader>
          <CardTitle>Your Produce Batches</CardTitle>
          <CardDescription>
            Track the status of your registered produce batches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                data-testid={`card-batch-${batch.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{batch.cropType}</h3>
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline">{batch.quality}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{batch.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{batch.quantity} {batch.unit}</span>
                    <span>₹{batch.price} per {batch.unit}</span>
                    <span>Total: ₹{(batch.quantity * batch.price).toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {batch.createdAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}