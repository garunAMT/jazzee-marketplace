"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// Add a new product to the database
export async function addProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) throw new Error("User not found");

  const { name, description, price, imageUrl } = Object.fromEntries(formData.entries());

  await prisma.product.create({
    data: {
      name: name as string,
      description: description as string,
      price: price as string,
      imageUrl: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
      userId: user.id,
    },
  });

  revalidatePath("/");
  redirect(`/products`);
}


