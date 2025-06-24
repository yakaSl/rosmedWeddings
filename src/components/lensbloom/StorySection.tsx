import Image from "next/image";
import { Card } from "@/components/ui/card";

export function StorySection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
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
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-5xl text-primary">
              My Story & Vision
            </h2>
            <p className="text-lg text-foreground/80">
              Hello, I'm Alex, the heart and lens behind LensBloom. My journey into photography began with a simple desire to hold onto fleeting moments. I believe that every couple has a unique story, a special spark that deserves to be told with authenticity and artistry.
            </p>
            <p className="text-lg text-foreground/80">
              My approach is to blend into the background, capturing the candid smiles, the happy tears, and the quiet, intimate glances that make your day truly yours. I aim to create not just photos, but heirlooms—timeless images that will transport you back to the joy and emotion of your wedding day for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
