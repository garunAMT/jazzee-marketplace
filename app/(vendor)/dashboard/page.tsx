'use client'
import { useState } from 'react'
import { Bell, DollarSign, Package, Clock, Search, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for auctions
const auctions = [
  {
    id: 1,
    name: "Office Supplies Auction",
    budget: 5000,
    product: "Printer Paper",
    endTime: "2023-06-30T18:00:00Z",
    requirements: "Need 500 reams of high-quality printer paper.",
    lowestBid: 4800,
    status: "Open"
  },
  {
    id: 2,
    name: "IT Equipment Auction",
    budget: 10000,
    product: "Laptops",
    endTime: "2023-07-05T23:59:59Z",
    requirements: "Looking for 10 high-performance laptops for developers.",
    lowestBid: 9500,
    status: "Closing Soon"
  },
  {
    id: 3,
    name: "Catering Services Auction",
    budget: 2000,
    product: "Office Party Catering",
    endTime: "2023-07-10T20:00:00Z",
    requirements: "Catering for 100 people, including vegetarian options.",
    lowestBid: 1800,
    status: "Open"
  },
  {
    id: 4,
    name: "Office Furniture Auction",
    budget: 15000,
    product: "Ergonomic Chairs",
    endTime: "2023-07-15T17:00:00Z",
    requirements: "Need 50 ergonomic office chairs with adjustable lumbar support.",
    lowestBid: 14000,
    status: "Closed"
  }
]

interface Auction {
  id: number;
  name: string;
  budget: number;
  product: string;
  endTime: string;
  requirements: string;
  lowestBid: number;
  status: string;
}

function AuctionCard({ auction, onSubmitQuote }: { auction: Auction; onSubmitQuote: (id: number, quote: number, comment: string) => void }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [quote, setQuote] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmitQuote(auction.id, parseFloat(quote), comment)
    setIsDialogOpen(false)
    setQuote('')
    setComment('')
  }

  const statusColor = {
    "Open": "bg-green-100 text-green-800",
    "Closing Soon": "bg-yellow-100 text-yellow-800",
    "Closed": "bg-red-100 text-red-800"
  }

  return (
    <Card className="w-full">
      <CardHeader className="relative pb-2">
        <CardTitle className="text-lg">{auction.name}</CardTitle>
        <Badge className={`absolute top-2 right-2 ${statusColor[auction.status as keyof typeof statusColor]}`}>
          {auction.status}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-1 text-sm">
          <div className="flex items-center">
            <DollarSign className="mr-1 h-3 w-3" />
            <span>Budget: ${auction.budget}</span>
          </div>
          <div className="flex items-center">
            <Package className="mr-1 h-3 w-3" />
            <span>{auction.product}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{auction.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p><strong>Product:</strong> {auction.product}</p>
              <p><strong>Budget:</strong> ${auction.budget}</p>
              <p><strong>End Time:</strong> {new Date(auction.endTime).toLocaleString()}</p>
              <p><strong>Requirements:</strong> {auction.requirements}</p>
              <p><strong>Lowest Bid:</strong> ${auction.lowestBid}</p>
              <p><strong>Status:</strong> {auction.status}</p>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Submit Quote</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Quote for {auction.name}</DialogTitle>
              <DialogDescription>{auction.requirements}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quote" className="text-right">
                    Quote ($)
                  </Label>
                  <Input
                    id="quote"
                    type="number"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Quote</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default function VendorDashboard() {
  const [submittedQuotes, setSubmittedQuotes] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const handleSubmitQuote = (auctionId: string, quote: number, comment: string) => {
    setSubmittedQuotes(prev => ({
      ...prev,
      [auctionId]: { quote, comment, status: 'Submitted' }
    }))
  }

  const filteredAuctions = auctions.filter(auction => 
    auction.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All' || auction.status === statusFilter)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Vendor Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Here you can view active auctions and submit your price quotes.
        </p>
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
          {filteredAuctions.map(auction => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onSubmitQuote={(id, quote, comment) => handleSubmitQuote(id.toString(), quote, comment)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}