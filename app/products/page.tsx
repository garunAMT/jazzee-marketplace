"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Search, Star } from "lucide-react";
import Image from "next/image";

const products = [
  {
    name: "ZoomInfo",
    company: "ZoomInfo Technologies L...",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 887,
    description:
      "ZoomInfo delivers the most accurate B2B contact data and B2B contact lists to fuel your business initiatives...",
    verified: true,
  },
  {
    name: "Okta",
    company: "Okta, Inc.",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 877,
    description:
      "Provide secure identity management and single sign-on to any application, whether in the cloud, on-premises ...",
    verified: true,
  },
  {
    name: "NetSuite",
    company: "NetSuite Inc.",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 590,
    description:
      "NetSuite is the leading integrated cloud business software suite, including business accounting, ERP,...",
    verified: true,
  },
  {
    name: "Gong",
    company: "Gong Inc",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 522,
    description:
      "Gong helps B2B sales teams sell and coach better by recording, transcribing, and analyzing their call...",
    verified: true,
  },
  {
    name: "ZoomInfo",
    company: "ZoomInfo Technologies L...",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 887,
    description:
      "ZoomInfo delivers the most accurate B2B contact data and B2B contact lists to fuel your business initiatives...",
    verified: true,
  },
  {
    name: "Okta",
    company: "Okta, Inc.",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 877,
    description:
      "Provide secure identity management and single sign-on to any application, whether in the cloud, on-premises ...",
    verified: true,
  },
  {
    name: "NetSuite",
    company: "NetSuite Inc.",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 590,
    description:
      "NetSuite is the leading integrated cloud business software suite, including business accounting, ERP,...",
    verified: true,
  },
  {
    name: "Gong",
    company: "Gong Inc",
    logo: "https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png",
    negotiations: 522,
    description:
      "Gong helps B2B sales teams sell and coach better by recording, transcribing, and analyzing their call...",
    verified: true,
  },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [negotiationFilter, setNegotiationFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNegotiations =
      negotiationFilter === "all" ||
      (negotiationFilter === "500+" && product.negotiations >= 500) ||
      (negotiationFilter === "750+" && product.negotiations >= 750);

    return matchesSearch && matchesNegotiations;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={negotiationFilter} onValueChange={setNegotiationFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by negotiations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All negotiations</SelectItem>
            <SelectItem value="500+">500+ negotiations</SelectItem>
            <SelectItem value="750+">750+ negotiations</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center gap-4">
              <Image
                src={product.logo}
                alt={`${product.name} logo`}
                width={50}
                height={50}
                className="rounded-full border-2"
              />

              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.company}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">
                {product.negotiations} negotiations
              </p>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">5.0</span>
              </div>
              <div className="flex justify-between items-center w-full">
                <Button>View Profile</Button>
                {product.verified && (
                  <Badge variant="secondary" className="ml-2">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
