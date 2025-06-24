
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Image as ImageIcon, Users, Settings, LifeBuoy, LogOut, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/image/logo.png";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader>
            <Link href="/admin" className="block">
              <Image
                src={logo}
                width={120}
                height={35}
                alt="RosemedWeddings Logo"
                className="group-data-[collapsible=icon]:hidden"
              />
               <Image
                src={logo}
                width={32}
                height={32}
                alt="RosemedWeddings Logo"
                className="hidden group-data-[collapsible=icon]:block"
              />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/admin">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive tooltip="Galleries">
                  <Link href="/admin/galleries">
                    <ImageIcon />
                    <span>Galleries</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Clients">
                   <Link href="#">
                    <Users />
                    <span>Clients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="#">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Client View">
                  <Link href="/dashboard">
                    <Shield />
                    <span>Client View</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Log Out">
                  <Link href="/">
                    <LogOut />
                    <span>Log Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-muted/40">
           <header className="flex h-16 items-center justify-between border-b bg-background px-6 sticky top-0 z-20">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="font-semibold">Admin Dashboard</div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Alex (Admin)</span>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="@alex" data-ai-hint="man portrait" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
