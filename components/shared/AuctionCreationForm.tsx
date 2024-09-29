"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, XIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createAuction } from "@/actions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format, isBefore, startOfDay } from "date-fns";

interface Product {
  id: string;
  name: string;
}

export default function ReverseDutchAuctionCreation({
  products,
}: {
  products: Product[];
}) {
  // State variables for product selection
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  // Function to add a product to the selected products list
  const handleAddProduct = () => {
    if (selectedProducts.length < 3 && selectedProduct) {
      setSelectedProducts([...selectedProducts, selectedProduct]);
      setSearchTerm("");
      setSelectedProduct(null);
      setIsDialogOpen(false);
    } else if (selectedProducts.length >= 3) {
      toast({
        title: "Maximum products reached",
        description:
          "You can't add more than 3 products. Remove products to add more.",
        variant: "destructive",
      });
    }
  };

  // Function to remove a product from the selected products list
  const handleRemoveProduct = (productToRemove: string) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product !== productToRemove)
    );
  };

  // Function to search for products based on the search term
  const searchProducts = (term: string): Product[] => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure 3 products are selected
    if (selectedProducts.length !== 3) {
      toast({
        title: "Incomplete selection",
        description: "You must select exactly 3 products for the auction.",
        variant: "destructive",
      });
      return;
    }

    // Collect the form data
    const formData = new FormData(e.currentTarget);
    selectedProducts.forEach((productId, index) => {
      formData.append(`product${index + 1}`, productId);
    });

    // Convert start and end dates to ISO string format
    if (startDate) {
      formData.set("startTime", startDate.toISOString());
    }
    if (endDate) {
      formData.set("endTime", endDate.toISOString());
    }

    // Send data to the server action
    await createAuction(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Reverse Dutch Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Auction Name</CardTitle>
            <CardDescription>Give your auction a unique name</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter auction name" name="auctionName" />
          </CardContent>
        </Card>

        {/* Product Selection Section */}
        <Card>
          <CardHeader>
            <CardTitle>1. Product Selection</CardTitle>
            <CardDescription>
              Choose up to 3 products for your auction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedProducts.map((productId) => {
                const product = products.find((p) => p.id === productId);
                return (
                  <Card key={productId} className="relative">
                    <CardContent className="flex items-center justify-center h-20">
                      <span>{product ? product.name : "Unknown Product"}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1"
                        onClick={() => handleRemoveProduct(productId)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              {selectedProducts.length < 3 && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-20 w-full">
                      <PlusIcon className="h-6 w-6" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Product</DialogTitle>
                      <DialogDescription>
                        Search and select a product to add to your auction.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                        {searchProducts(searchTerm).map((product) => (
                          <Button
                            key={product.id}
                            variant={
                              selectedProduct === product.id
                                ? "default"
                                : "outline"
                            }
                            className="w-full justify-start"
                            onClick={() => setSelectedProduct(product.id)}
                          >
                            {product.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleAddProduct}
                        disabled={!selectedProduct}
                      >
                        Add
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Budget and Requirements Section */}
        <Card>
          <CardHeader>
            <CardTitle>2. Budget and Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="startingPrice">Set Starting Price</Label>
              <Input
                id="startingPrice"
                placeholder="Enter your maximum budget"
                name="startingPrice"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Outline your needs (e.g., number of licenses, specific features, support level)"
                name="description"
              />
            </div>
          </CardContent>
        </Card>

        {/* Auction Timeline Section */}
        <Card>
          <CardHeader>
            <CardTitle>5. Auction Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      if (date) {
                        setStartDate(date);
                        // If end date is before new start date, reset it
                        if (endDate && isBefore(endDate, date)) {
                          setEndDate(undefined);
                        }
                      }
                    }}
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    disabled={(date) =>
                      isBefore(date, startOfDay(new Date())) ||
                      (startDate ? isBefore(date, startDate) : false)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Submit Section */}
        <CardFooter>
          <Button type="submit" className="w-full">
            Create Auction
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
