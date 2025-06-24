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
                src="/images/akila.jpg"
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
              Hi, I’m Akila Anjuna — a storyteller with a camera, capturing love in its most genuine form. My journey into wedding photography began with a simple belief: every couple has a beautiful story worth telling, and every fleeting moment deserves to be remembered forever.
            </p>
            <p className="text-lg text-foreground/80">
              Weddings are a blend of laughter, emotion, connection, and quiet intimacy — and I aim to document it all with honesty and artistry. My style is unobtrusive yet intentional, focusing on natural light, candid emotions, and the subtle details that often go unnoticed but matter most.
            </p>
            <p className="text-lg text-foreground/80">
              With experience in photographing everything from grand celebrations to intimate gatherings, I bring a calm, professional presence to your big day. I blend into the background, letting moments unfold organically — from joyful tears to stolen glances — capturing them with care and creativity.
            </p>
            <p className="text-lg text-foreground/80">
              More than just photos, I create timeless keepsakes — heirlooms that will transport you back to the magic, the mood, and the love that made your day unforgettable. Let’s turn your wedding memories into visual poetry.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
