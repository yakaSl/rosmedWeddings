
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getGalleryById, submitSelections, Photo, Gallery } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function PhotoSelectItem({
  photo,
  isSelected,
  onSelectionChange,
}: {
  photo: Photo;
  isSelected: boolean;
  onSelectionChange: (id: string) => void;
}) {
  return (
    <Card
      className={cn(
        "relative group overflow-hidden cursor-pointer border-2 transition-all",
        isSelected ? "border-primary" : "border-transparent"
      )}
      onClick={() => onSelectionChange(photo.id)}
    >
      <Image
        src={photo.src}
        alt={`Photo ${photo.id}`}
        data-ai-hint={photo.hint}
        width={400}
        height={300}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      <div
        className={cn(
          "absolute top-3 left-3 bg-background/80 backdrop-blur-sm rounded-full transition-opacity",
           isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <Checkbox
          checked={isSelected}
          className="h-6 w-6 border-2"
          aria-label={`Select photo ${photo.id}`}
        />
      </div>
    </Card>
  );
}

function GalleryNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold">Gallery Not Found</h1>
            <p className="text-muted-foreground mt-2">
                Sorry, we couldn't find the gallery you're looking for.
            </p>
            <Button asChild className="mt-6">
                <Link href="/dashboard/galleries">Back to Galleries</Link>
            </Button>
        </div>
    );
}


export default function GalleryDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gallery, setGallery] = useState<Gallery | null | undefined>(undefined);
  
  useEffect(() => {
    const galleryId = typeof params.id === "string" ? params.id : "";
    const foundGallery = getGalleryById(galleryId);
    setGallery(foundGallery);
  }, [params.id]);


  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());

  // Initialize selections from mock data
  useEffect(() => {
    if (gallery?.selections) {
        setSelectedPhotos(new Set(gallery.selections));
    }
  }, [gallery]);

  const handleSelectionChange = (photoId: string) => {
    setSelectedPhotos((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(photoId)) {
        newSelection.delete(photoId);
      } else {
        newSelection.add(photoId);
      }
      return newSelection;
    });
  };

  const handleSubmit = () => {
    if (!gallery) return;
    setIsSubmitting(true);
    
    // Simulate API call to save selections
    setTimeout(() => {
        submitSelections(gallery.id, Array.from(selectedPhotos));
        setIsSubmitting(false);
        toast({
            title: "Selections Submitted!",
            description: `You have submitted ${selectedPhotos.size} photos to the photographer.`,
        });
    }, 1500);
  };
  
  if (gallery === undefined) {
    // Still loading
    return (
       <div className="flex items-center justify-center h-full">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
    );
  }

  if (gallery === null) {
      return <GalleryNotFound />;
  }


  return (
    <div className="flex flex-col h-[calc(100vh_-_4rem)]">
      <header className="flex-shrink-0 bg-background/80 backdrop-blur-sm -mx-6 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                    <Link href="/dashboard/galleries">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back to galleries</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">{gallery.title}</h1>
                    <p className="text-muted-foreground">{gallery.date}</p>
                </div>
           </div>
           <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="font-bold text-lg">{selectedPhotos.size} / {gallery.photos.length}</p>
                <p className="text-sm text-muted-foreground">photos selected</p>
             </div>
             <Button onClick={handleSubmit} disabled={isSubmitting || selectedPhotos.size === 0}>
                {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Check className="mr-2 h-4 w-4" />
                )}
                Submit Selections
            </Button>
           </div>
        </div>
      </header>

      <main className="flex-1 py-6 overflow-y-auto -mx-6 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {gallery.photos.map((photo) => (
            <PhotoSelectItem
              key={photo.id}
              photo={photo}
              isSelected={selectedPhotos.has(photo.id)}
              onSelectionChange={handleSelectionChange}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
