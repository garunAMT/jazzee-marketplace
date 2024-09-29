// 'use client'
// import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronRight, ChevronDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getProductById } from '@/actions'

// Mock data for the product
const product = {
  name: "SuperCRM",
  tagline: "Revolutionize your customer relationships",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  rating: 4.5,
  startingPrice: "$19/month",
  vendor: {
    name: "TechInnovators Inc.",
    logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    bio: "Leading the way in SaaS solutions"
  },
  categories: ["CRM", "Marketing", "Sales"],
  overview: "SuperCRM is a comprehensive customer relationship management tool...",
  pricing: "Our flexible pricing plans cater to businesses of all sizes...",
  reviews: "Users love SuperCRM for its intuitive interface and powerful features...",
  technicalDetails: "SuperCRM integrates seamlessly with popular platforms..."
}

// Mock data for related products
const relatedProducts = [
  { name: "MarketPro", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D", description: "Advanced marketing automation", price: "$29/month" },
  { name: "SalesForce", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D", description: "AI-powered sales insights", price: "$39/month" },
  { name: "SupportHub", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D", description: "Customer support made easy", price: "$24/month" }
]

export default async function ProductPage( { params }: { params: { productId: string } } ) {

  // Fetching the product by productId
  const product = await getProductById(params.productId)

  // State for the active tab
  // const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <nav className="text-sm mb-2 text-muted-foreground">
          <Link href="/">Home</Link> <ChevronRight className="inline-block w-4 h-4" />
          <Link href="/saas">SaaS Products</Link> <ChevronRight className="inline-block w-4 h-4" />
          <Link href="/saas/crm">CRM</Link> <ChevronRight className="inline-block w-4 h-4" />
          <span>{product?.name}</span>
        </nav>
        <h1 className="text-4xl font-bold mb-2">{product?.name}</h1>
        <p className="text-xl text-muted-foreground">{product?.description}</p>
      </header>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Product Details) */}
        <div className="lg:col-span-8">
          <Image
            src={product?.imageUrl || ''}
            alt={product?.name || ''}
            width={800}
            height={400}
            className="w-40 h-auto rounded-lg mb-8"
          />

          {/* Tabbed content for desktop and tablet */}
          {/* <Tabs defaultValue="overview" className="hidden md:block">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">{product.overview}</TabsContent>
            <TabsContent value="pricing">{product.pricing}</TabsContent>
            <TabsContent value="reviews">{product.reviews}</TabsContent>
            <TabsContent value="technical">{product.technicalDetails}</TabsContent>
          </Tabs> */}

          {/* Accordion for mobile */}
          {/* <Accordion type="single" collapsible className="md:hidden">
            <AccordionItem value="overview">
              <AccordionTrigger>Overview</AccordionTrigger>
              <AccordionContent>{product.overview}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="pricing">
              <AccordionTrigger>Pricing</AccordionTrigger>
              <AccordionContent>{product.pricing}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger>Reviews</AccordionTrigger>
              <AccordionContent>{product.reviews}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="technical">
              <AccordionTrigger>Technical Details</AccordionTrigger>
              <AccordionContent>{product.technicalDetails}</AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>

        {/* Right Column (Product Summary) */}
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2">{product.rating}/5</span>
              </div> */}
              <p className="text-2xl font-bold mb-4">$ {product?.price}</p>
              <Button className="w-full mb-4">Start Free Trial</Button>
              <div className="flex items-center mb-4">
                <Image
                  src={'https://i.pinimg.com/originals/1d/9c/aa/1d9caa2718ff4c24b8716e830641ff3d.png'}
                  alt={product?.owner.name || ''}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <div>
                  <h3 className="font-semibold">{product?.owner.name}</h3>
                  <p className="text-sm text-muted-foreground">{product?.owner.email}</p>
                </div>
              </div>
              {/* <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <span key={category} className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm">
                    {category}
                  </span>
                ))}
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <Card key={product.name}>
              <CardHeader>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={150}
                  className="w-full h-auto rounded-lg mb-2"
                />
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{product.description}</p>
                <p className="font-bold">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}