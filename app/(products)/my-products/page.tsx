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

    // verifying the user
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user || !user.id) throw new Error("User not found");

    // Fetching products
    const products = await getProductsByOwnerId(user.id);

    // These state variables should be used in a client component, not in a server component
    // const [searchTerm, setSearchTerm] = useState("");
    // const [negotiationFilter, setNegotiationFilter] = useState("all");

    // Filtering should be done in a client component or with server actions
    // const filteredProducts = products.filter((product) => {
  //   const matchesSearch =
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.description.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesNegotiations =
  //     negotiationFilter === "all" ||
  //     (negotiationFilter === "500+" && product.negotiations >= 500) ||
  //     (negotiationFilter === "750+" && product.negotiations >= 750);

  //   return matchesSearch && matchesNegotiations;
  // });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-8"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <Select value={negotiationFilter} onValueChange={setNegotiationFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by negotiations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All negotiations</SelectItem>
            <SelectItem value="500+">500+ negotiations</SelectItem>
            <SelectItem value="750+">750+ negotiations</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
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
                {/* {product.company} */}
                <p className="text-sm text-muted-foreground">Company Name</p>
              </div>
            </CardHeader>
            <CardContent>
            {/* {product.negotiations} */}
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
                {/* {product.verified && (
                  <Badge variant="secondary" className="ml-2">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </Badge>
                )} */}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
