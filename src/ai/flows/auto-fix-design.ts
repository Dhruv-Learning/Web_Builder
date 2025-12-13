'use server';

/**
 * @fileOverview Implements the AI "Fix Design" button functionality.
 *
 * - autoFixDesign - A function that takes website content and adjusts colors and spacing.
 * - AutoFixDesignInput - The input type for the autoFixDesign function.
 * - AutoFixDesignOutput - The return type for the autoFixDesign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoFixDesignInputSchema = z.object({
  websiteContent: z.string().describe('The current HTML/CSS content of the website to be improved.'),
});
export type AutoFixDesignInput = z.infer<typeof AutoFixDesignInputSchema>;

const AutoFixDesignOutputSchema = z.object({
  improvedWebsiteContent: z
    .string()
    .describe('The improved HTML/CSS content of the website with better design.'),
});
export type AutoFixDesignOutput = z.infer<typeof AutoFixDesignOutputSchema>;

export async function autoFixDesign(input: AutoFixDesignInput): Promise<AutoFixDesignOutput> {
  return autoFixDesignFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoFixDesignPrompt',
  input: {schema: AutoFixDesignInputSchema},
  output: {schema: AutoFixDesignOutputSchema},
  prompt: `You are an AI design expert. You will receive website content (HTML and CSS) and your task is to improve the design based on modern design principles, including color palettes, spacing, and overall aesthetics. Return the improved HTML/CSS code. Website content: {{{websiteContent}}}`,
});

const autoFixDesignFlow = ai.defineFlow(
  {
    name: 'autoFixDesignFlow',
    inputSchema: AutoFixDesignInputSchema,
    outputSchema: AutoFixDesignOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
