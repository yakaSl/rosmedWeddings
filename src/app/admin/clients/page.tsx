
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { clients, galleries } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function AdminClientsPage() {
    
    const clientsWithGalleryCount = clients.map(client => ({
        ...client,
        galleryCount: galleries.filter(g => g.clientId === client.id).length
    }));

  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-muted-foreground">
          View and manage all your clients.
        </p>
      </section>

      <section>
        <Card>
            <CardHeader>
                <CardTitle>All Clients</CardTitle>
                <CardDescription>A list of all clients in your system.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[80px]">Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Galleries</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clientsWithGalleryCount.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="person portrait" />
                                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{client.name}</TableCell>
                                <TableCell className="text-muted-foreground">{client.email}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="secondary">{client.galleryCount}</Badge>
                                </TableCell>
                                <TableCell>{client.joinDate}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Actions</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
