// app/vendor/dashboard/page.tsx
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { getAuctionsByProductOwnerId } from '@/actions';
import VendorDashboardClient from '@/components/shared/VendorDashboardClient'; // Client Component

export default async function VendorDashboard() {
  // Fetch user info
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Fetch real auction data from the database
  const auctions = await getAuctionsByProductOwnerId(user.id);

  // Pass fetched data to the client component
  return <VendorDashboardClient auctions={auctions} />;
}
