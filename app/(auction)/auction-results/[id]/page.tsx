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
import { getAuctionById, getBidsByAuctionId } from "@/actions";

// Mock data for the example
// const auctionData = {
//   id: "12345",
//   startTime: "2023-07-01 10:00 AM",
//   endTime: "2023-07-02 10:00 AM",
//   buyerBudget: 5000,
//   selectedProducts: [
//     {
//       name: "Product A",
//       logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
//       description: "Description of Product A",
//     },
//     {
//       name: "Product B",
//       logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
//       description: "Description of Product B",
//     },
//     {
//       name: "Product C",
//       logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
//       description: "Description of Product C",
//     },
//   ],
//   vendorBids: [
//     {
//       name: "Vendor 1",
//       logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
//       amount: 1200,
//       time: "2 mins ago",
//       details: {
//         license: "Premium",
//         features: ["Feature 1", "Feature 2"],
//         support: "24/7",
//         perks: "Free training",
//       },
//       rating: 4.5,
//     },
//     {
//       name: "Vendor 2",
//       logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
//       amount: 1500,
//       time: "10 mins ago",
//       details: {
//         license: "Enterprise",
//         features: ["Feature 1", "Feature 2", "Feature 3"],
//         support: "Dedicated",
//         perks: "30-day money-back guarantee",
//       },
//       rating: 4.8,
//     },
//     {
//       name: "Vendor 3",
//       logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
//       amount: 1100,
//       time: "15 mins ago",
//       details: {
//         license: "Standard",
//         features: ["Feature 1"],
//         support: "Email",
//         perks: "None",
//       },
//       rating: 4.2,
//     },
//   ],
// };

export default async function AuctionResults({ params }: { params: { id: string } }) {
  // const [selectedVendor, setSelectedVendor] = useState("");

  // fetching auction data by id
  const auctionData = await getAuctionById(params.id);

  // fetching bids by auctionId
  const vendorBids = await getBidsByAuctionId(params.id);

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

      {/* Final Selection */}
      {/* <Card className="mt-6">
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
      </Card> */}
    </div>
  );
}
