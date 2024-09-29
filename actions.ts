"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Add a new product to the database
export async function addProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) throw new Error("User not found");

  const { name, description, price, imageUrl } = Object.fromEntries(formData.entries());

  try {
    const product = await prisma.product.create({
      data: {
        name: name as string,
        description: description as string,
        price: parseFloat(price as string),
        imageUrl: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
        ownerId: user.id,
      },
    });

    revalidatePath("/add-product");
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
  return redirect("/products");
}


// Fetching all products
export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}


// Fetching products by productId, also extract the vendor details
export async function getProductById(productId: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      owner: true,
    },
  });
  return product;
}


// Fetching products by ownerId
export async function getProductsByOwnerId(ownerId: string) {
  const products = await prisma.product.findMany({
    where: {
      ownerId: ownerId,
    },
  });
  return products;
}

// Create a new auction
export async function createAuction(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) throw new Error("User not found");

  const { auctionName, description, startingPrice, startTime, endTime, product1, product2, product3 } = Object.fromEntries(formData);

  // Create auction record
  const auction = await prisma.auction.create({
    data: {
      auctionName: auctionName as string,
      description: description as string,
      startingPrice: parseFloat(startingPrice as string),
      startTime: new Date(startTime as string),
      endTime: new Date(endTime as string),
      initiatorId: user.id,
      AuctionProduct: {
        create: [
          { productId: product1 as string },
          { productId: product2 as string },
          { productId: product3 as string },
        ]
      },
    },
  });

  return redirect(`/my-auctions`);
}


// fetch auctions by auctionId also show the products details in the auction
export async function getAuctionById(auctionId: string) {
  const auctionData = await prisma.auction.findUnique({
    where: {
      id: auctionId,
    },
    include: {
      AuctionProduct: {
        include: {
          product: true,
        },
      },
    },
  });
  return auctionData;
}


// Fetching auctions by initiatorId
export async function getAuctionsByInitiatorId(initiatorId: string) {

  const auctions = await prisma.auction.findMany({
    where: {
      initiatorId: initiatorId,
    },
    include: {
      AuctionProduct: true,
    },
    orderBy: {
      createdAt: 'desc', // Sort by date created in descending order
    },
  });
  return auctions;
}


// Fetching auctions by "owner of product"
// here, we are basically showig the auction only to the selected product's owner, so that only he can take part in that bidding
export async function getAuctionsByProductOwnerId(ownerId: string) {
  const auctions = await prisma.auction.findMany({
    where: {
      AuctionProduct: {
        some: {
          product: {
            ownerId: ownerId,
          },
        },
      },
    },
    include: {
      AuctionProduct: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // Sort by date created in descending order
    },
  });
  return auctions;
}



// Create a new bid
export async function createBid(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) throw new Error("User not found");

  const { auctionId, bidAmount } = Object.fromEntries(formData);

  try {
    const bid = await prisma.bid.create({
      data: {
        auctionId: auctionId as string,
        userId: user.id,
        bidAmount: parseFloat(bidAmount as string),
      },
    });
  } catch (error) {
    console.error("Error creating bid:", error);
    throw error;
  }
}


// Fetching all bids by auctionId, extracting the user details
export async function getBidsByAuctionId(auctionId: string) {
  
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) throw new Error("User not found");

  try {
    const bids = await prisma.bid.findMany({
      where: {
        auctionId: auctionId,
      },
      include: {
        user: true,
      },
      orderBy: {
        bidAmount: 'asc', // Sort bids from lowest to highest
      },
    });
    return bids;
  } catch (error) {
    console.error("Error fetching bids:", error);
    throw error;
  }
}
