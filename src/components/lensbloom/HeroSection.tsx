"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  { src: "https://placehold.co/1920x1080.png", hint: "wedding couple" },
  { src: "https://placehold.co/1920x1080.png", hint: "wedding ceremony" },
  { src: "https://placehold.co/1920x1080.png", hint: "wedding details" },
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" ref={targetRef} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt="Wedding photography"
            data-ai-hint={image.hint}
            fill
            className={cn(
              "object-cover transition-opacity duration-1000 ease-in-out",
              currentImage === index ? "opacity-100" : "opacity-0"
            )}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <motion.div style={{ opacity: textOpacity }}>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-tight drop-shadow-md">
            Capturing Love, Frame by Frame
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
            Timeless wedding photography for the modern romantic.
          </p>
          <Link href="#portfolio" className="mt-8 inline-block">
            <Button
              size="lg"
              className="bg-accent/80 text-primary-foreground hover:bg-accent border border-accent-foreground/20 text-lg px-8 py-6"
            >
              View Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
