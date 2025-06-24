"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function StorySection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={targetRef} className="py-16 md:py-24 bg-background overflow-hidden relative min-h-[110vh]">
      <div className="container max-w-7xl h-full sticky top-16 flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y: imageY, opacity }}
            className="flex justify-center"
          >
            <Card className="overflow-hidden shadow-xl w-full max-w-md rounded-lg">
              <Image
                src="https://placehold.co/600x800.png"
                alt="Portrait of the photographer"
                data-ai-hint="photographer portrait"
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
            </Card>
          </motion.div>
          <motion.div
            style={{ y: textY, opacity }}
            className="space-y-6 text-center md:text-left"
          >
            <h2 className="font-headline text-4xl md:text-5xl text-primary">
              My Story & Vision
            </h2>
            <p className="text-lg text-foreground/80">
              Hello, I'm Alex, the heart and lens behind RosemedWeddings. My journey into photography began with a simple desire to hold onto fleeting moments. I believe that every couple has a unique story, a special spark that deserves to be told with authenticity and artistry.
            </p>
            <p className="text-lg text-foreground/80">
              My approach is to blend into the background, capturing the candid smiles, the happy tears, and the quiet, intimate glances that make your day truly yours. I aim to create not just photos, but heirlooms—timeless images that will transport you back to the joy and emotion of your wedding day for years to come.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
