import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Header } from '@/components/lensbloom/Header';
import { Footer } from '@/components/lensbloom/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-4xl text-primary">Log In</CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Welcome back! Please enter your details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" defaultValue="jane.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" defaultValue="password" />
                            </div>
                            <Button size="lg" className="w-full mt-6" asChild>
                               <Link href="/dashboard">Log In</Link>
                            </Button>
                        </div>
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/signup" className="font-semibold text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
