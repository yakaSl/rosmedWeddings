import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Image as ImageIcon, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const upcomingEvents = [
    {
        title: "Smith & Jones Wedding",
        date: "October 26, 2024",
        time: "2:00 PM - 10:00 PM",
        location: "The Grand Estate, CA",
    },
];

const recentGalleries = [
    {
        title: "Engagement Session",
        date: "July 15, 2024",
        imageCount: 78,
        thumbnail: "https://placehold.co/600x400.png",
        hint: "engagement couple"
    },
    {
        title: "Family Portraits",
        date: "May 20, 2024",
        imageCount: 45,
        thumbnail: "https://placehold.co/600x400.png",
        hint: "family portrait"
    },
];

export default function DashboardPage() {
    return (
        <div className="grid gap-8">
            <section>
                <h1 className="text-3xl font-bold">Welcome back, Jane!</h1>
                <p className="text-muted-foreground">Here's a summary of your events and galleries.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                <div className="grid gap-4">
                    {upcomingEvents.map((event) => (
                        <Card key={event.title} className="shadow-md">
                            <CardHeader>
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>{event.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{event.time}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Recent Galleries</h2>
                    <Button variant="outline">View All</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {recentGalleries.map((gallery) => (
                        <Card key={gallery.title} className="overflow-hidden group shadow-md">
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
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4" />
                                        <span>{gallery.imageCount} photos</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="w-4 h-4" />
                                        <span className="sr-only">Download Gallery</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <Card className="mt-6 flex flex-col items-center justify-center p-8 border-2 border-dashed shadow-none bg-transparent">
                    <h3 className="text-lg font-semibold mb-2">Ready for your next photoshoot?</h3>
                    <p className="text-muted-foreground mb-4 text-center">Let's capture more beautiful moments together.</p>
                    <Link href="/#contact">
                        <Button>Book a New Session</Button>
                    </Link>
                </Card>
            </section>
        </div>
    );
}
