This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


<!-- Deatils about the different pages of website -->

## Website Pages

- Home: Landing page showcasing featured auctions and site overview.
- Products: Displays all available products for auction.
- Add Product: Form for vendors to add new products to the system.
- Create Auction: Interface for initiating new auctions with selected products.
- My Auctions: Dashboard for users to view and manage their created auctions.
- Auction Details: Detailed view of a specific auction, including bidding functionality.
- Vendor Dashboard: Overview for vendors to manage their products and view relevant auctions.
- Auction Results: Page displaying the outcome of completed auctions.
- User Profile: Personal information and activity history for registered users.

<!-- Services, Frameworks and Dtabases used -->

## Technologies Used

### Languages
- TypeScript: Primary programming language for both frontend and backend development.
- JavaScript: Used in conjunction with TypeScript for certain client-side functionalities.

### Frameworks and Libraries
- Next.js 14: React framework for building the web application, utilizing the App Router for enhanced performance and SEO.
- React: JavaScript library for building user interfaces.
- Tailwind CSS: Utility-first CSS framework for rapid UI development.
- Shadcn UI: Component library built on top of Tailwind CSS for consistent and customizable UI elements.
- Aceternity UI: Used some prebuilt components to enhance the frontend
- Lucide React: Icon library for modern web applications.

### Backend Services
- Kinde Auth: Authentication service for secure user management and authorization.
- Prisma: ORM (Object-Relational Mapping) tool for database operations and migrations.

### Database
- PostgreSQL: Relational database for storing application data. Used a cloud based BAAS(backend as a service) provider named Supabase for PostgreSQL database.

### Deployment and Hosting
- Vercel: Platform for deploying and hosting Next.js applications.

## Database Schema

The application uses a PostgreSQL database with the following main tables:

1. User
   - Stores user information including id, name, email, and authentication details.

2. Product
   - Contains product details such as id, name, description, price, imageUrl, and ownerId.

3. Auction
   - Stores auction information including id, auctionName, description, startingPrice, startTime, endTime, and initiatorId.

4. AuctionProduct
   - Junction table linking auctions to products, with fields like auctionId and productId.

5. Bid
   - Records bids placed in auctions, including id, auctionId, userId, amount, and timestamp.

6. AuctionResult
   - Stores the results of completed auctions, including auctionId, winnerId, and winningPrice.

These tables are interconnected to support the various functionalities of the auction system, allowing for efficient querying and data management throughout the application.




