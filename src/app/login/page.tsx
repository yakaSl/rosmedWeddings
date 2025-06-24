import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Header } from '@/components/lensbloom/Header';
import { Footer } from '@/components/lensbloom/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.651-3.356-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
)

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-4xl text-primary">Client Log In</CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Welcome back! Access your galleries here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                             <Button variant="outline" className="w-full">
                                <GoogleIcon className="mr-2" />
                                Sign In with Google
                            </Button>
                            <div className="flex items-center space-x-2">
                                <Separator className="flex-1" />
                                <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
                                <Separator className="flex-1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" defaultValue="jane.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" defaultValue="password" />
                            </div>
                            <Button size="lg" className="w-full mt-6" asChild>
                               <Link href="/dashboard">Log In with Email</Link>
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
