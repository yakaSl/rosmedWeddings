
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckSquare, Eye, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getGalleryById } from "@/lib/mock-data";

const recentSelectionsGallery = getGalleryById("smith-jones-wedding");

export default function AdminDashboardPage() {
    return (
        <div className="grid gap-8">
            <section>
                <h1 className="text-3xl font-bold">Welcome, Alex!</h1>
                <p className="text-muted-foreground">Here's what's happening with your clients.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">+2 since last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Galleries Pending Selection</CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">Smith & Jones Wedding</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Galleries</CardTitle>
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">All selections finalized</p>
                    </CardContent>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Recent Client Activity</h2>
                 <Card>
                    <CardHeader>
                        <CardTitle>New Selections Made</CardTitle>
                        <CardDescription>
                            The client for the <span className="font-semibold text-foreground">{recentSelectionsGallery?.title}</span> gallery has just submitted their photo selections.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-6">
                        <Image 
                            src={recentSelectionsGallery?.thumbnail || "https://placehold.co/150x100.png"}
                            data-ai-hint={recentSelectionsGallery?.hint}
                            alt="Gallery thumbnail"
                            width={150}
                            height={100}
                            className="rounded-md object-cover"
                        />
                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-bold">{recentSelectionsGallery?.selections.length} photos selected</p>
                                <p className="text-sm text-muted-foreground">{recentSelectionsGallery?.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                The selections are ready for your review. You can now download the chosen images or begin album design.
                            </p>
                        </div>
                         <Button asChild>
                            <Link href={`/admin/galleries/${recentSelectionsGallery?.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Selections
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
