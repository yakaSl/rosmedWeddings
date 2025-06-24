"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const packages = [
  {
    name: "The Elopement",
    price: "$1,800",
    description: "For intimate celebrations and adventurous hearts.",
    features: [
      "Up to 4 hours of coverage",
      "1 Photographer",
      "Online gallery with high-resolution images",
      "Printing rights",
    ],
    highlight: false,
  },
  {
    name: "The Classic",
    price: "$3,500",
    description: "Our most popular package for a perfect day.",
    features: [
      "8 hours of coverage",
      "2 Photographers",
      "Engagement session",
      "Online gallery with high-resolution images",
      "Custom USB drive",
    ],
    highlight: true,
  },
  {
    name: "The Fairytale",
    price: "$5,200",
    description: "Comprehensive coverage for your entire story.",
    features: [
      "Full day coverage (up to 12 hours)",
      "2 Photographers",
      "Engagement session",
      "Fine-art wedding album",
      "Online gallery & custom USB drive",
      "Parent albums (x2)",
    ],
    highlight: false,
  },
];

const MotionCard = motion(Card);

export function PackagesSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="packages" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            Wedding Packages
          </h2>
          <p className="text-lg text-foreground/80 mt-2">
            Investment in memories that last a lifetime.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {packages.map((pkg, index) => (
            <MotionCard
              key={pkg.name}
              variants={itemVariants}
              className={cn(
                "flex flex-col transition-all duration-300 ease-out h-full",
                pkg.highlight 
                  ? "border-primary shadow-2xl md:scale-105" 
                  : "shadow-lg hover:shadow-xl",
                index === 0 ? 'md:col-start-auto' : 'md:col-start-auto lg:col-start-auto'
              )}
            >
              <CardHeader className="text-center pt-8">
                <CardTitle className="font-headline text-3xl text-primary">{pkg.name}</CardTitle>
                <CardDescription className="text-base min-h-[40px]">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold text-center text-primary mb-6">{pkg.price}</p>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6">
                <Link href="#contact" className="w-full">
                  <Button size="lg" className="w-full" variant={pkg.highlight ? "default" : "outline"}>
                    Inquire Now
                  </Button>
                </Link>
              </CardFooter>
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
