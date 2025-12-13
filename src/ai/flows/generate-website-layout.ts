'use server';

/**
 * @fileOverview A website layout generation AI agent.
 *
 * - generateWebsiteLayout - A function that handles the website layout generation process.
 * - GenerateWebsiteLayoutInput - The input type for the generateWebsiteLayout function.
 * - GenerateWebsiteLayoutOutput - The return type for the generateWebsiteLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteLayoutInputSchema = z.object({
  prompt: z.string().describe('A description of the desired website.'),
});
export type GenerateWebsiteLayoutInput = z.infer<typeof GenerateWebsiteLayoutInputSchema>;

const GenerateWebsiteLayoutOutputSchema = z.object({
  html: z.string().describe('The HTML code for the website layout.'),
  css: z.string().describe('The CSS code for the website layout.'),
  sections: z.array(z.string()).describe('The sections of the website.'),
  placeholderImages: z.array(z.string()).describe('Placeholder image URLs.'),
  navigationBar: z.string().describe('The HTML code for the navigation bar.'),
  footer: z.string().describe('The HTML code for the footer.'),
});
export type GenerateWebsiteLayoutOutput = z.infer<typeof GenerateWebsiteLayoutOutputSchema>;

export async function generateWebsiteLayout(input: GenerateWebsiteLayoutInput): Promise<GenerateWebsiteLayoutOutput> {
  return generateWebsiteLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteLayoutPrompt',
  input: {schema: GenerateWebsiteLayoutInputSchema},
  output: {schema: GenerateWebsiteLayoutOutputSchema},
  prompt: `You are an expert web developer specializing in generating website layouts based on user prompts.

You will generate HTML and CSS code for the website layout, including sections, placeholder images, a navigation bar, and a footer.

Use the following information to generate the website layout:

Prompt: {{{prompt}}}

Ensure the generated code is well-structured, readable, and follows modern web development best practices.

The output should include:
- html: The complete HTML code for the website layout.
- css: The complete CSS code for the website layout.
- sections: An array of strings, where each string is the name of a section in the website.
- placeholderImages: An array of placeholder image URLs.
- navigationBar: The HTML code for the navigation bar.
- footer: The HTML code for the footer.
`,
});

const generateWebsiteLayoutFlow = ai.defineFlow(
  {
    name: 'generateWebsiteLayoutFlow',
    inputSchema: GenerateWebsiteLayoutInputSchema,
    outputSchema: GenerateWebsiteLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
