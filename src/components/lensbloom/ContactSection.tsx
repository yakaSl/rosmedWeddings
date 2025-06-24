"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from 'react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

// A dummy server action
async function submitContactForm(data: z.infer<typeof formSchema>) {
    console.log("Submitting form with data:", data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, you'd send this to your backend/email service
    // For now, we'll just pretend it worked.
    return { success: true };
}

const MotionCard = motion(Card);

export function ContactSection() {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const result = await submitContactForm(values);
            if (result.success) {
                toast({
                    title: "Message Sent!",
                    description: "Thank you for reaching out. I'll get back to you shortly.",
                });
                form.reset();
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request. Please try again.",
                });
            }
        });
    }

  return (
    <section id="contact" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container max-w-3xl">
        <MotionCard
          className="shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl md:text-5xl text-primary">Get In Touch</CardTitle>
            <CardDescription className="text-lg mt-2">
              I would be honored to be a part of your story. Let's create something beautiful together.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your wedding plans..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                 {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </MotionCard>
      </div>
    </section>
  );
}
