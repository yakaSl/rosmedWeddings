'use server';
/**
 * @fileOverview An AI tool to suggest wedding photography styles based on user input.
 *
 * - suggestWeddingPhotographyStyle - A function that takes wedding theme and preferences as input and returns suggested photography styles.
 * - SuggestWeddingPhotographyStyleInput - The input type for the suggestWeddingPhotographyStyle function.
 * - SuggestWeddingPhotographyStyleOutput - The return type for the suggestWeddingPhotographyStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWeddingPhotographyStyleInputSchema = z.object({
  weddingTheme: z.string().describe('The theme of the wedding.'),
  preferences: z.string().describe('The preferences for the wedding photography.'),
});
export type SuggestWeddingPhotographyStyleInput = z.infer<typeof SuggestWeddingPhotographyStyleInputSchema>;

const SuggestWeddingPhotographyStyleOutputSchema = z.object({
  suggestedStyles: z.string().describe('Suggested photography styles for the wedding.'),
});
export type SuggestWeddingPhotographyStyleOutput = z.infer<typeof SuggestWeddingPhotographyStyleOutputSchema>;

export async function suggestWeddingPhotographyStyle(input: SuggestWeddingPhotographyStyleInput): Promise<SuggestWeddingPhotographyStyleOutput> {
  return suggestWeddingPhotographyStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWeddingPhotographyStylePrompt',
  input: {schema: SuggestWeddingPhotographyStyleInputSchema},
  output: {schema: SuggestWeddingPhotographyStyleOutputSchema},
  prompt: `You are an AI assistant specializing in suggesting wedding photography styles.

  Based on the wedding theme and preferences provided, suggest photography styles that would be suitable.

  Wedding Theme: {{{weddingTheme}}}
  Preferences: {{{preferences}}}

  Please provide a detailed suggestion of photography styles that align with the provided information.
  `,
});

const suggestWeddingPhotographyStyleFlow = ai.defineFlow(
  {
    name: 'suggestWeddingPhotographyStyleFlow',
    inputSchema: SuggestWeddingPhotographyStyleInputSchema,
    outputSchema: SuggestWeddingPhotographyStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
