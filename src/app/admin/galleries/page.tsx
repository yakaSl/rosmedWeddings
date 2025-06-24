
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ImageIcon, Users } from "lucide-react";
import { galleries } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AdminGalleriesPage() {
  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-bold">Client Galleries</h1>
        <p className="text-muted-foreground">
          Monitor and manage all client photo galleries.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {galleries.map((gallery) => (
          <Card key={gallery.id} className="flex flex-col overflow-hidden group shadow-md hover:shadow-xl transition-shadow">
            <Link href={`/admin/galleries/${gallery.id}`} className="flex flex-col h-full">
              <div className="relative aspect-video">
                <Image
                  src={gallery.thumbnail}
                  alt={gallery.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={gallery.hint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{gallery.title}</h3>
                  <p className="text-sm">{gallery.date}</p>
                </div>
              </div>
              <CardContent className="p-4 flex-grow">
                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Selection Progress</span>
                        <span className="font-bold text-foreground">{gallery.selections.length} / {gallery.imageCount}</span>
                    </div>
                    <Progress value={(gallery.selections.length / gallery.imageCount) * 100} className="h-2" />
                 </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{gallery.title.split(' ')[0]} Family</span>
                    </div>
                     <div className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", "border border-input bg-background hover:bg-accent hover:text-accent-foreground", "h-9 px-3")}>
                        View Selections
                      </div>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
