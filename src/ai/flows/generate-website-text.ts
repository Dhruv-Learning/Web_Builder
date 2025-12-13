'use server';

/**
 * @fileOverview Generates website text content based on a user prompt.
 *
 * - generateWebsiteText - A function that generates website text content.
 * - GenerateWebsiteTextInput - The input type for the generateWebsiteText function.
 * - GenerateWebsiteTextOutput - The output type for the generateWebsiteText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteTextInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the desired website text content.'),
});
export type GenerateWebsiteTextInput = z.infer<typeof GenerateWebsiteTextInputSchema>;

const GenerateWebsiteTextOutputSchema = z.object({
  websiteText: z.string().describe('The generated website text content.'),
});
export type GenerateWebsiteTextOutput = z.infer<typeof GenerateWebsiteTextOutputSchema>;

export async function generateWebsiteText(input: GenerateWebsiteTextInput): Promise<GenerateWebsiteTextOutput> {
  return generateWebsiteTextFlow(input);
}

const generateWebsiteTextPrompt = ai.definePrompt({
  name: 'generateWebsiteTextPrompt',
  input: {schema: GenerateWebsiteTextInputSchema},
  output: {schema: GenerateWebsiteTextOutputSchema},
  prompt: `You are an expert copywriter specializing in website content.

  Based on the following prompt, generate compelling and relevant website text content.

  Prompt: {{{prompt}}}
  `,
});

const generateWebsiteTextFlow = ai.defineFlow(
  {
    name: 'generateWebsiteTextFlow',
    inputSchema: GenerateWebsiteTextInputSchema,
    outputSchema: GenerateWebsiteTextOutputSchema,
  },
  async input => {
    const {output} = await generateWebsiteTextPrompt(input);
    return output!;
  }
);
