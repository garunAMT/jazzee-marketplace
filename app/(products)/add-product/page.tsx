'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"
import { addProduct } from '@/actions'

// define types for the form data
type ProductFormData = {
  name: string
  image: string
  description: string
  price: string
}

export default function AddProductPage() {


  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addProduct} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="Enter product name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="flex items-center space-x-4">
                <Input 
                  id="image" 
                  type="file" 
                  name="image"
                  accept="image/*" 
                //   onChange={handleImageChange}
                  className="hidden"
                />
                <Label 
                  htmlFor="image" 
                  className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
                >
                  
                    <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Enter product description" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="Enter price" required />
            </div>
            <Button type="submit" className="w-full">Add Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}