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


// Create a new auction
export async function createAuction(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) throw new Error("User not found");

  const { auctionName, description, startingPrice, startTime, endTime } = Object.fromEntries(formData.entries());

  try {
    const auction = await prisma.auction.create({
      data: {
        auctionName: auctionName as string,
        description: description as string,
        startingPrice: parseFloat(startingPrice as string),
        startTime: new Date(startTime as string),
        endTime: new Date(endTime as string),
        initiatorId: user.id,
      },
    });

    revalidatePath("/auctions");
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
  return redirect("/auctions");
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
  });
  return auctions;
}
