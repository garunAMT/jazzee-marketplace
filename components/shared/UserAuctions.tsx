"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Auction } from "@prisma/client";

interface UserAuctionsProps {
  auctions: Auction[];
}

export default function UserAuctions({ auctions }: UserAuctionsProps) {

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Function to format dates consistently
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  };

  // Define status of the auction by checking the endTime and startTime
  const status = (auction: Auction) => {
    const endTime = new Date(auction.endTime);
    const currentTime = new Date();
    if (currentTime > endTime) {
      return "Completed";
    } else if (currentTime < endTime) {
      return "Running";
    } else {
      return "Live";
    }
  };

  const filteredAuctions = auctions.filter((auction) => {
    const auctionStatus = status(auction);
    const matchesFilter = filter === "All" || auctionStatus === filter;
    const matchesSearch = auction.auctionName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Live":
        return "bg-green-500";
      case "Running":
        return "bg-orange-500";
      case "Completed":
        return "bg-gray-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Auctions</h1>
        <p className="text-gray-600">
          View all the auctions you've created. Track their status and check details at a glance.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Live">Live</SelectItem>
            <SelectItem value="Running">Running</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search auctions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Table view for larger screens */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Auction Name</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAuctions.map((auction) => (
              <TableRow key={auction.id}>
                <TableCell className="font-medium ">{auction.auctionName}</TableCell>
                {/* Format date in the same way on both server and client */}
                <TableCell>{formatDate(auction.createdAt)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(status(auction))}>{status(auction)}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card view for mobile screens */}
      <div className="md:hidden space-y-4">
        {filteredAuctions.map((auction) => (
          <Card key={auction.id}>
            <CardHeader>
              <CardTitle>{auction.auctionName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                {formatDate(auction.createdAt)}
              </p>
              <Badge className={getStatusColor(status(auction))}>{status(auction)}</Badge>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Button variant="outline" size="sm" className="mr-2">
          <ChevronUp className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
