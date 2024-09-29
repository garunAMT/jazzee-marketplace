import { CircleCheckBig, Mail, AlertCircle } from "lucide-react";
import ConfettiEffect from "./Confetti";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";

interface AuctionData {
  winnerId: string | null;
  winningPrice: number | null;
}

export default async function AuctionResultDeclareCard({
  auctionData,
}: {
  auctionData: AuctionData;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isWinner = user?.id === auctionData.winnerId;
  const hasWinner = auctionData.winnerId && auctionData.winningPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      {isWinner && <ConfettiEffect />}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Auction Results</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Winner Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Auction Outcome
          </h2>
          {hasWinner ? (
            <div className="flex items-start space-x-4">
              <img
                src={
                  "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png"
                }
                alt={"Winner"}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-700">Winner</h3>
                <p className="text-sm text-gray-500">Winning Bid</p>
                <p className="text-lg font-semibold text-green-600 mt-2">
                  ${auctionData.winningPrice}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CircleCheckBig className="h-5 w-5 mr-1 text-green-600" />
                  Winner
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-700 font-medium flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Nobody placed a bid in this auction.
              </p>
            </div>
          )}
          {isWinner && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700 font-medium">
                Congratulations! You&apos;ve won the bid for this auction.
              </p>
            </div>
          )}
        </div>

        {/* Next Steps Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isWinner ? "Auction Owner Details" : "Next Steps"}
          </h2>
          {isWinner ? (
            // IF WINNER
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Owner:{" "}
                  <span className="font-medium text-gray-800">Anurag</span>
                </p>
                <p className="text-sm text-gray-600">
                  Email:{" "}
                  <span className="font-medium text-gray-800">
                    anurag@gmail.com
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Next Steps
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Review the auction details</li>
                  <li>Contact the auction owner for further instructions</li>
                  <li>Prepare for the handover process</li>
                </ul>
              </div>
              <Button className="w-full font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                Contact Owner
              </Button>
            </>
          ) : (

            // IF NOT WINNER
            <>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Improve Your Chances
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li>Review and improve your product quality</li>
                  <li>Consider adjusting your pricing strategy</li>
                  <li>Enhance your product description and images</li>
                  <li>Stay active and participate in more auctions</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700 font-medium flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Keep trying! Your perfect auction match is out there.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 italic">
          Thank you for participating in Jazzee Market
        </p>
      </div>
    </div>
  );
}
