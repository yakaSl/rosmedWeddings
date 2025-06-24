"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestWeddingPhotographyStyle, SuggestWeddingPhotographyStyleInput } from '@/ai/flows/suggest-wedding-photography-style';
import { motion } from "framer-motion";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  weddingTheme: z.string().min(10, { message: "Please describe your wedding theme in a bit more detail." }),
  preferences: z.string().min(10, { message: "Please describe your photography preferences." }),
});

export function AiStyleFinder() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weddingTheme: "",
      preferences: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const input: SuggestWeddingPhotographyStyleInput = {
          weddingTheme: values.weddingTheme,
          preferences: values.preferences,
        };
        const response = await suggestWeddingPhotographyStyle(input);
        setResult(response.suggestedStyles);
      } catch (e) {
        setError("Sorry, something went wrong. Please try again.");
        console.error(e);
      }
    });
  }

  return (
    <motion.section
      id="ai-stylist"
      className="py-16 md:py-24 bg-background/70 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary flex items-center justify-center gap-3">
            <Wand2 className="w-10 h-10" /> AI Wedding Style Finder
          </h2>
          <p className="text-lg text-foreground/80 mt-2">
            Not sure what you're looking for? Describe your vision and let our AI suggest the perfect photography style for you.
          </p>
        </div>

        <Card className="shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <FormField
                  control={form.control}
                  name="weddingTheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Your Wedding Theme</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Rustic barn wedding with fairy lights, wildflowers, and a relaxed, bohemian vibe."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Photography Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., We love candid, unposed moments. Bright, airy, and romantic photos. Not a fan of overly dramatic or dark editing."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="p-6">
                <Button type="submit" disabled={isPending} className="w-full md:w-auto">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : "Find My Style"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {isPending && !result && (
          <Card className="mt-8">
            <CardContent className="pt-6 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-lg text-foreground/80">Our AI is brewing up some ideas...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mt-8 bg-destructive/10 border-destructive">
            <CardHeader>
              <CardTitle>Oh no!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Your Suggested Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-4">
                {result.split('\n').filter(p => p.trim() !== "").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.section>
  );
}
