"use client";

import { useState } from "react";
import { DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createBid } from "@/actions";

interface Auction {
  id: string;
  auctionName: string;
  description: string;
  startingPrice: number;
  startTime: Date;
  endTime: Date;
  initiatorId: string;
  AuctionProduct: {
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      ownerId: string;
    };
  }[];
}

export default function AuctionCard({
  auction,
}: {
  auction: Auction;
}) {

  // dialog open state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // status color
  const statusColor = {
    "Opening Soon": "bg-blue-100 text-blue-800",
    Open: "bg-green-100 text-green-800",
    "Closing Soon": "bg-yellow-100 text-yellow-800",
    Closed: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative pb-2">
        <CardTitle className="text-lg">{auction.auctionName}</CardTitle>

        {/* ----------------------STATUS BADGE LOGIC---------------------- */}
        {(() => {
          const now = new Date();
          let status = "Opening Soon";
          let statusClass = statusColor["Opening Soon"];

          if (now < auction.startTime) {
            status = "Opening Soon";
            statusClass = statusColor["Opening Soon"];
          } else if (now > auction.endTime) {
            status = "Closed";
            statusClass = statusColor.Closed;
          } else if (
            now > new Date(auction.endTime.getTime() - 24 * 60 * 60 * 1000)
          ) {
            status = "Closing Soon";
            statusClass = statusColor["Closing Soon"];
          } else {
            status = "Open";
            statusClass = statusColor.Open;
          }

          return (
            <Badge className={`absolute top-2 right-2 ${statusClass}`}>
              {status}
            </Badge>
          );
        })()}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-1 text-sm">
          <div className="flex items-center">
            <DollarSign className="mr-1 h-3 w-3" />
            <span>Starting Price: ${auction.startingPrice}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Products:</span>
            {auction.AuctionProduct.map((auctionProduct, index) => (
              <div key={index} className="flex items-center">
                <Package className="mr-1 h-3 w-3" />
                <span>{auctionProduct.product.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      {/* ------------------FORM FOR SUBMITTING BID------------------ */}
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline">
          <Link href={`/auction-results/${auction.id}`}>View Auction</Link>
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" disabled={new Date() < auction.startTime || new Date() > auction.endTime}>
              Submit Quote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Quote for {auction.auctionName}</DialogTitle>
            </DialogHeader>
            <form action={createBid}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="auctionId"
                    type="hidden"
                    name="auctionId"
                    value={auction.id}
                    className="col-span-3"
                    required
                  />
                  <Label htmlFor="bidAmount" className="text-right">
                    Bid Amount ($)
                  </Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    name="bidAmount"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comment" className="text-right">
                    Comment
                  </Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                  Submit Quote
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
