import { getProductsByOwnerId } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Component() {
  // Verifying the user
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Products</h1>
        <p>Please log in to view your products.</p>
      </div>
    );
  }

  // Fetching products
  const products = await getProductsByOwnerId(user.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-8"
          />
        </div>
      </div>
      {products.length === 0 ? (
        <p>You haven&apos;'t added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} logo`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">543 negotiations</p>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">5.0</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <Button><Link href={`/products/${product.id}`}>View Product</Link></Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
