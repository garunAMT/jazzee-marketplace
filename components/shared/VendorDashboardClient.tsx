// app/vendor/dashboard/VendorDashboardClient.tsx
'use client';

import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuctionCard from './AuctionCard'; // Component to display individual auctions

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

export default function VendorDashboardClient({ auctions }: { auctions: Auction[] }) {
  const [submittedQuotes, setSubmittedQuotes] = useState<Record<number, { quote: number; comment: string }>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleSubmitQuote = (auctionId: number, quote: number, comment: string) => {
    setSubmittedQuotes((prev) => ({
      ...prev,
      [auctionId]: { quote, comment },
    }));
  };

  const filteredAuctions = auctions.filter((auction) =>
    auction.auctionName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All')
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Vendor Dashboard</h1>
        <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <span className="font-semibold">Live Auctions:</span> {auctions.length}
          </div>
          <div>
            <span className="font-semibold">Quotes Submitted:</span> {Object.keys(submittedQuotes).length}
          </div>
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closing Soon">Closing Soon</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <main>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onSubmitQuote={(id: number, quote: number, comment: string) => handleSubmitQuote(id, quote, comment)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
