import { getAuctionsByInitiatorId } from "@/actions"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import UserAuctions from "@/components/shared/UserAuctions"

export default async function UserAuctionsPage() {
  // Fetching auctions by initiatorId
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return (
      <div>
        <h1>User not found</h1>
        <p>Please log in to view your auctions.</p>
      </div>
    );
  }

  const auctions = await getAuctionsByInitiatorId(user.id);

  return (
    <div>
      <UserAuctions auctions={auctions} />
    </div>
  );
}
