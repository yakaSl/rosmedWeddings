
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Palette, Bell } from "lucide-react";
import logo from "@/image/logo.png";


export default function AdminSettingsPage() {
  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and website settings.
        </p>
      </section>

      <section>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
            </TabsTrigger>
            <TabsTrigger value="branding">
                <Palette className="mr-2 h-4 w-4" />
                Branding
            </TabsTrigger>
            <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal and business information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="RosemedWeddings" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="your-name">Your Name</Label>
                  <Input id="your-name" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="alex@rosemedweddings.com" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branding" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Customize the look and feel of your website.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <div className="space-y-4">
                    <Label>Logo</Label>
                    <div className="flex items-center gap-6">
                        <div className="p-4 border rounded-lg bg-muted/50">
                            <Image src={logo} alt="Current logo" width={140} height={40} />
                        </div>
                        <Button variant="outline">Upload New Logo</Button>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <Label>Theme Colors</Label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary border" />
                            <span className="text-sm">Primary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-secondary border" />
                            <span className="text-sm">Secondary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-accent border" />
                            <span className="text-sm">Accent</span>
                        </div>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
             <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your email notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="notification-selections" className="font-bold">New Client Selections</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a client finalizes their photo selections.</p>
                    </div>
                    <Switch id="notification-selections" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="notification-contact" className="font-bold">New Contact Message</Label>
                        <p className="text-sm text-muted-foreground">Receive an email for each new submission from the contact form.</p>
                    </div>
                    <Switch id="notification-contact" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="notification-signup" className="font-bold">New Client Signup</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a new client creates an account.</p>
                    </div>
                    <Switch id="notification-signup" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end mt-6">
            <Button>Save All Settings</Button>
        </div>
      </section>
    </div>
  );
}
