"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

const portfolioItems = [
  { id: 1, category: "Weddings", type: "image", src: "https://placehold.co/600x400.png", hint: "bride groom" },
  { id: 2, category: "Engagements", type: "image", src: "https://placehold.co/600x400.png", hint: "engagement couple" },
  { id: 3, category: "Weddings", type: "video", src: "https://www.youtube.com/embed/LXb3EKWsInQ", thumbnail: "https://placehold.co/600x400.png", hint: "wedding video" },
  { id: 4, category: "Elopements", type: "image", src: "https://placehold.co/600x400.png", hint: "elopement couple" },
  { id: 5, category: "Weddings", type: "image", src: "https://placehold.co/600x400.png", hint: "wedding reception" },
  { id: 6, category: "Engagements", type: "image", src: "https://placehold.co/600x400.png", hint: "couple laughing" },
  { id: 7, category: "Weddings", type: "image", src: "https://placehold.co/600x400.png", hint: "wedding cake" },
  { id: 8, category: "Elopements", type: "image", src: "https://placehold.co/600x400.png", hint: "mountain elopement" },
  { id: 9, category: "Engagements", type: "image", src: "https://placehold.co/600x400.png", hint: "beach proposal" },
];

const filters = ["All", "Weddings", "Engagements", "Elopements"];

type PortfolioItem = typeof portfolioItems[0];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-background/70 overflow-hidden">
      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            Our Portfolio
          </h2>
          <p className="text-lg text-foreground/80 mt-2">
            A glimpse into the stories we've had the honor to capture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center flex-wrap gap-2 mb-8"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredItems.map((item) => (
             <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={item.type === 'image' ? item.src : item.thumbnail!}
                alt={`Portfolio item ${item.id}`}
                data-ai-hint={item.hint}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
               {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <Dialog open={!!selectedItem} onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}>
            <DialogContent className="max-w-4xl w-full p-0 border-0 bg-transparent">
              {selectedItem && (
                <>
                  {selectedItem.type === "image" ? (
                    <Image
                      src={selectedItem.src}
                      alt={`Portfolio item ${selectedItem.id}`}
                      data-ai-hint={selectedItem.hint}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <div className="aspect-video">
                      <iframe
                        src={selectedItem.src}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>
                  )}
                </>
              )}
            </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
