import Image from "next/image"
import { Star, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProductById } from "@/actions"
import Link from "next/link"

// This function would typically fetch data from an API or database
async function getSaasProductDetails() {
  return {
    name: "TaskMaster Pro",
    tagline: "Streamline Your Workflow, Amplify Your Productivity",
    description: "TaskMaster Pro is the ultimate project management solution for teams of all sizes. With intuitive task tracking, real-time collaboration, and powerful analytics, you'll boost your team's efficiency and deliver projects on time, every time.",
    rating: 4.8,
    reviews: 1024,
    features: [
      "Intuitive Kanban boards",
      "Real-time collaboration",
      "Advanced task tracking",
      "Customizable workflows",
      "Detailed analytics and reporting",
      "Integrations with popular tools"
    ],
    pricingPlans: [
      {
        name: "Starter",
        price: 9.99,
        billing: "per user/month",
        features: [
          "Up to 5 team members",
          "5 projects",
          "Basic analytics",
          "24/7 support"
        ]
      },
      {
        name: "Pro",
        price: 24.99,
        billing: "per user/month",
        features: [
          "Up to 20 team members",
          "Unlimited projects",
          "Advanced analytics",
          "Priority support",
          "Custom integrations"
        ]
      },
      {
        name: "Enterprise",
        price: 49.99,
        billing: "per user/month",
        features: [
          "Unlimited team members",
          "Unlimited projects",
          "Advanced security features",
          "Dedicated account manager",
          "On-premise deployment option"
        ]
      }
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        company: "Tech Innovators Inc.",
        comment: "TaskMaster Pro has revolutionized how we manage projects. It's intuitive, powerful, and has significantly improved our team's productivity."
      },
      {
        name: "Michael Chen",
        company: "Global Solutions Ltd.",
        comment: "The analytics feature in TaskMaster Pro has given us invaluable insights into our workflow. It's been a game-changer for our project planning."
      }
    ]
  }
}

export default async function SaasProductPage({ params }: { params: { productId: string } }) {

  const product = await getSaasProductDetails()
  const realProduct = await getProductById(params.productId)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{realProduct?.name}</h1>
        <p className="text-xl text-muted-foreground mb-6">{realProduct?.description}</p>
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">({product.reviews} reviews)</span>
        </div>
        <div className="flex justify-center">
          <Image
            src="/placeholder.svg"
            alt={product.name}
            width={600}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About {product.name}</h2>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">What Our Customers Say</h2>
          {product.testimonials.map((testimonial, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-xl text-muted-foreground">Select the perfect plan for your team's needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {product.pricingPlans.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground"> {plan.billing}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose {plan.name}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to boost your productivity?</h2>
        <Button size="lg"><Link href={`/create-auction`}>Add us to an Auction</Link></Button>
      </div>
    </div>
  )
}