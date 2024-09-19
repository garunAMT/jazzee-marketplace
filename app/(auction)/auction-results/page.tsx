"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Info } from "lucide-react";

// Mock data for the example
const auctionData = {
  id: "12345",
  startTime: "2023-07-01 10:00 AM",
  endTime: "2023-07-02 10:00 AM",
  buyerBudget: 5000,
  selectedProducts: [
    {
      name: "Product A",
      logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
      description: "Description of Product A",
    },
    {
      name: "Product B",
      logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
      description: "Description of Product B",
    },
    {
      name: "Product C",
      logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
      description: "Description of Product C",
    },
  ],
  vendorBids: [
    {
      name: "Vendor 1",
      logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
      amount: 1200,
      time: "2 mins ago",
      details: {
        license: "Premium",
        features: ["Feature 1", "Feature 2"],
        support: "24/7",
        perks: "Free training",
      },
      rating: 4.5,
    },
    {
      name: "Vendor 2",
      logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
      amount: 1500,
      time: "10 mins ago",
      details: {
        license: "Enterprise",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        support: "Dedicated",
        perks: "30-day money-back guarantee",
      },
      rating: 4.8,
    },
    {
      name: "Vendor 3",
      logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
      amount: 1100,
      time: "15 mins ago",
      details: {
        license: "Standard",
        features: ["Feature 1"],
        support: "Email",
        perks: "None",
      },
      rating: 4.2,
    },
  ],
};

export default function AuctionResults() {
  const [selectedVendor, setSelectedVendor] = useState("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Auction Results</h1>
      <p className="text-gray-600 mb-6">
        Here are the bids from your selected vendors. Choose the best offer for
        your needs.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column: Auction Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Auction Overview</CardTitle>
            <CardDescription>Auction ID: {auctionData.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              Auction Duration: {auctionData.startTime} - {auctionData.endTime}
            </p>
            <p className="mb-4">
              Budget: ${auctionData.buyerBudget.toLocaleString()}
            </p>
            <h3 className="font-semibold mb-2">Selected Products:</h3>
            <ul className="space-y-2">
              {auctionData.selectedProducts.map((product, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <img
                    src={product.logo}
                    alt={product.name}
                    className="w-8 h-8"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Right Column: Vendor Bids */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Bid Amount</TableHead>
                  <TableHead>Bid Time</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auctionData.vendorBids.map((bid, index) => (
                  <TableRow
                    key={index}
                    className={""}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <img
                          src={bid.logo}
                          alt={bid.name}
                          className="w-6 h-6"
                        />
                        <span>{bid.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">
                      ${bid.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {bid.time}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Info className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{bid.name} Bid Details</DialogTitle>
                            <DialogDescription>
                              <div className="mt-2 space-y-2">
                                <p>
                                  <strong>License:</strong>{" "}
                                  {bid.details.license}
                                </p>
                                <p>
                                  <strong>Features:</strong>{" "}
                                  {bid.details.features.join(", ")}
                                </p>
                                <p>
                                  <strong>Support:</strong>{" "}
                                  {bid.details.support}
                                </p>
                                <p>
                                  <strong>Perks:</strong> {bid.details.perks}
                                </p>
                                <p className="flex items-center">
                                  <strong>Rating:</strong>
                                  <span className="ml-1 flex items-center">
                                    {bid.rating.toFixed(1)}
                                    <Star className="w-4 h-4 fill-yellow-400 ml-1" />
                                  </span>
                                </p>
                                <Button variant="link" className="p-0">
                                  View Reviews
                                </Button>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Final Selection */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Final Selection</CardTitle>
          <CardDescription>
            Select an offer to proceed with purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedVendor}
            onValueChange={setSelectedVendor}
            className="space-y-2"
          >
            {auctionData.vendorBids.map((bid, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={bid.name} id={`vendor-${index}`} />
                <Label htmlFor={`vendor-${index}`}>
                  {bid.name} - ${bid.amount.toLocaleString()}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="mt-4 flex justify-between">
            <Button disabled={!selectedVendor}>Select Vendor</Button>
            <Button variant="destructive">Cancel Auction</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
