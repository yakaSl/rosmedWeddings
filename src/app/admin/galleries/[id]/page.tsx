
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getGalleryById, Gallery } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronLeft, Download, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function SelectedPhotoItem({ src, hint }: { src: string; hint: string }) {
    return (
        <Card className="relative group overflow-hidden border-2 border-primary">
            <Image
                src={src}
                alt="Selected Photo"
                data-ai-hint={hint}
                width={400}
                height={300}
                className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-primary/20" />
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="h-4 w-4" />
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
                <Link href="/admin/galleries">Back to Galleries</Link>
            </Button>
        </div>
    );
}

export default function AdminGalleryDetailPage() {
    const params = useParams();
    const [gallery, setGallery] = useState<Gallery | null | undefined>(undefined);

    useEffect(() => {
        const galleryId = typeof params.id === "string" ? params.id : "";
        const foundGallery = getGalleryById(galleryId);
        setGallery(foundGallery);
    }, [params.id]);

    if (gallery === undefined) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (gallery === null) {
        return <GalleryNotFound />;
    }

    const selectedPhotos = gallery.photos.filter(p => gallery.selections.includes(p.id));

    return (
        <div className="flex flex-col h-[calc(100vh_-_4rem)]">
            <header className="flex-shrink-0 bg-background/80 backdrop-blur-sm -mx-6 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                            <Link href="/admin/galleries">
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back to galleries</span>
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{gallery.title}</h1>
                            <p className="text-muted-foreground">Client Selections</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-bold text-lg">{gallery.selections.length} / {gallery.photos.length}</p>
                            <p className="text-sm text-muted-foreground">photos selected</p>
                        </div>
                        <Button disabled={selectedPhotos.length === 0}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Selections
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-6 overflow-y-auto -mx-6 px-6">
                {selectedPhotos.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {selectedPhotos.map((photo) => (
                            <SelectedPhotoItem
                                key={photo.id}
                                src={photo.src}
                                hint={photo.hint}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed rounded-lg bg-muted/40">
                         <ImageIcon className="w-16 h-16 text-muted-foreground" />
                        <h2 className="text-2xl font-semibold mt-4">No Selections Yet</h2>
                        <p className="text-muted-foreground mt-2">
                            The client has not made any photo selections for this gallery.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
