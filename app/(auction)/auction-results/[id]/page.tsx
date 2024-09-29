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
import { Badge } from "@/components/ui/badge";
import { Star, Info } from "lucide-react";
import { getAuctionById, getBidsByAuctionId } from "@/actions";

export default async function AuctionResults({ params }: { params: { id: string } }) {
  // fetching auction data by id
  const auctionData = await getAuctionById(params.id);

  // fetching bids by auctionId
  const vendorBids = await getBidsByAuctionId(params.id);

  // Function to get auction status and remaining time
  const getAuctionStatus = (endTime: Date) => {
    const now = new Date();
    const timeRemaining = endTime.getTime() - now.getTime();
    
    if (timeRemaining <= 0) {
      return { status: "Closed", message: "This auction has been completed" };
    } else if (timeRemaining <= 24 * 60 * 60 * 1000) { // Less than 24 hours
      const hoursRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60));
      return { status: "Closing Soon", message: `Closing in ${hoursRemaining} hour${hoursRemaining > 1 ? 's' : ''}` };
    } else {
      return { status: "Open", message: "Auction is open. Bid now!" };
    }
  };

  const auctionStatus = auctionData ? getAuctionStatus(auctionData.endTime) : { status: "Unknown", message: "Unable to determine auction status" };

  // Status color mapping
  const statusColor = {
    Open: "bg-green-100 text-green-800",
    "Closing Soon": "bg-yellow-100 text-yellow-800",
    Closed: "bg-red-100 text-red-800",
    Unknown: "bg-gray-100 text-gray-800"
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Auction Results</h1>
          <p className="text-gray-600">
            Here are the bids from your selected vendors. Choose the best offer for
            your needs.
          </p>
        </div>
        <Badge className={`${statusColor[auctionStatus.status as keyof typeof statusColor]} text-sm px-3 py-1`}>
          {auctionStatus.status}
        </Badge>
      </div>
      <p className="text-lg font-semibold mb-6">{auctionStatus.message}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column: Auction Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Auction Overview</CardTitle>
            <CardDescription>Auction ID: {auctionData?.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              Auction Duration: {auctionData?.startTime?.toLocaleString()} - {auctionData?.endTime?.toLocaleString()}
            </p>
            <p className="mb-4">
              Budget: ${auctionData?.startingPrice?.toLocaleString() ?? 'N/A'}
            </p>
            <h3 className="font-semibold mb-2">Selected Products:</h3>
            <ul className="space-y-2">
              {auctionData?.AuctionProduct?.map((product, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <img
                    src={product.product.imageUrl}
                    alt={product.product.name}
                    className="w-8 h-8"
                  />
                  <div>
                    <p className="font-medium">{product.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.product.description}
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
                
                {vendorBids && vendorBids.length > 0 ? (
                  vendorBids.map((bid, index) => (
                    <TableRow
                      key={index}
                      className={""}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <img
                            src={"https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png"}
                            alt={bid.user.name || "User"}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{bid.user.name || "Anonymous"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">
                        ${bid.bidAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(bid.createdAt).toLocaleString()}
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
                              <DialogTitle>{bid.user.name || "Anonymous"} Bid Details</DialogTitle>
                              <DialogDescription>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <strong>Bid Amount:</strong> ${bid.bidAmount.toLocaleString()}
                                  </p>
                                  <p>
                                    <strong>Bid Time:</strong> {new Date(bid.createdAt).toLocaleString()}
                                  </p>
                                  <p>
                                    <strong>Bidder Name:</strong> {bid.user.name}
                                  </p>
                                  <p>
                                    <strong>Bidder Email:</strong> {bid.user.email}
                                  </p>
                                  {/* Add more details as needed */}
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No biddings till now!
                    </TableCell>
                  </TableRow>
                )}
                
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
