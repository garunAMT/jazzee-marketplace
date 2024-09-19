'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon, XIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function ReverseDutchAuctionCreation() {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [auctionName, setAuctionName] = useState<string>('');
    const [budget, setBudget] = useState<string>('');
    const [requirements, setRequirements] = useState<string>('');
    const [bidDuration, setBidDuration] = useState<string>('24');
    const [bidDecrement, setBidDecrement] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const { toast } = useToast();
  
    const handleAddProduct = () => {
      if (selectedProducts.length < 3 && selectedProduct) {
        setSelectedProducts([...selectedProducts, selectedProduct]);
        setSearchTerm('');
        setSelectedProduct(null);
        setIsDialogOpen(false);
      } else if (selectedProducts.length >= 3) {
        toast({
          title: "Maximum products reached",
          description: "You can't add more than 3 products. Remove products to add more.",
          variant: "destructive",
        });
      }
    };
  
    const handleRemoveProduct = (productToRemove: string) => {
      setSelectedProducts(selectedProducts.filter(product => product !== productToRemove));
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Auction created:', { auctionName, selectedProducts, budget, requirements, bidDuration, bidDecrement, startDate, endDate });
    };
  
    // Mock product search function
    const searchProducts = (term: string): string[] => {
      const allProducts = ['GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Trello'];
      return allProducts.filter(product => product.toLowerCase().includes(term.toLowerCase()));
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
            <Input
              placeholder="Enter auction name"
              value={auctionName}
              onChange={(e) => setAuctionName(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>1. Product Selection</CardTitle>
            <CardDescription>Choose up to 3 products for your auction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedProducts.map((product) => (
                <Card key={product} className="relative">
                  <CardContent className="flex items-center justify-center h-20">
                    <span>{product}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={() => handleRemoveProduct(product)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
                      <DialogDescription>Search and select a product to add to your auction.</DialogDescription>
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
                            key={product}
                            variant={selectedProduct === product ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => setSelectedProduct(product)}
                          >
                            {product}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="button" onClick={handleAddProduct} disabled={!selectedProduct}>
                        Add
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Budget and Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="budget">Set Budget</Label>
              <Input
                id="budget"
                placeholder="Enter your maximum budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Outline your needs (e.g., number of licenses, specific features, support level)"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Auction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Auction Type</Label>
              <Input value="Reverse Dutch Auction" disabled />
            </div>
            <div>
              <Label htmlFor="bidDuration">Bid Duration</Label>
              <Select value={bidDuration} onValueChange={setBidDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bid duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="48">48 hours</SelectItem>
                  <SelectItem value="72">72 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bidDecrement">Bid Decrement</Label>
              <Input
                id="bidDecrement"
                placeholder="Enter bid decrement amount"
                value={bidDecrement}
                onChange={(e) => setBidDecrement(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Selected Vendors/Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedProducts.map((product) => (
                <div key={product} className="flex items-center justify-between bg-muted p-2 rounded">
                  <span>{product}</span>
                  <span className="text-sm text-muted-foreground">Invited</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Auction Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date/Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date/Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Payment Terms and Licensing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Payment Options</Label>
              <div className="flex gap-2 mt-2">
                <Button variant="outline">Credit Card</Button>
                <Button variant="outline">PayPal</Button>
                <Button variant="outline">Bank Transfer</Button>
              </div>
            </div>
            <div>
              <Label>Licensing Information</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select license type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oneyear">One-year subscription</SelectItem>
                  <SelectItem value="perpetual">Perpetual license</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Preview and Submit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Auction Name:</strong> {auctionName}</p>
              <p><strong>Selected Products:</strong> {selectedProducts.join(', ')}</p>
              <p><strong>Budget:</strong> ${budget}</p>
              <p><strong>Bid Duration:</strong> {bidDuration} hours</p>
              <p><strong>Bid Decrement:</strong> ${bidDecrement}</p>
              <p><strong>Start Date:</strong> {startDate}</p>
              <p><strong>End Date:</strong> {endDate}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Create Auction</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}