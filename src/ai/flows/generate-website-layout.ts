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
  html: z.string().describe('The HTML code for the website layout, including only the content for the <body> tag.'),
  css: z.string().describe('The CSS code for the website layout.'),
  javascript: z.string().describe('The JavaScript code for the website logic and functionality. This should be pure Javascript, no script tags.'),
  sections: z.array(z.string()).describe('The sections of the website.'),
});
export type GenerateWebsiteLayoutOutput = z.infer<typeof GenerateWebsiteLayoutOutputSchema>;

export async function generateWebsiteLayout(input: GenerateWebsiteLayoutInput): Promise<GenerateWebsiteLayoutOutput> {
  return generateWebsiteLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteLayoutPrompt',
  input: {schema: GenerateWebsiteLayoutInputSchema},
  output: {schema: GenerateWebsiteLayoutOutputSchema},
  prompt: `You are an expert web developer specializing in generating fully functional, responsive, and modern websites based on user prompts.

You will generate HTML, CSS, and JavaScript code for the website. The generated website must be interactive and dynamic, with all the logic implemented in the provided JavaScript.

Use the following information to generate the website:

Prompt: {{{prompt}}}

Important Instructions:
1.  **HTML**: Provide only the content for the \`<body>\` tag. Do not include \`<html>\`, \`<head>\`, or \`<body>\` tags. Use semantic HTML5 tags. Use TailwindCSS classes for styling directly in the HTML.
2.  **CSS**: Provide any additional CSS needed for animations, complex layouts, or custom styles not achievable with standard Tailwind. Do not wrap in \`<style>\` tags.
3.  **JavaScript**: Provide the complete client-side JavaScript to make the site functional. This includes event listeners, calculations, DOM manipulation, etc. Do not wrap in \`<script>\` tags.
4.  **Responsiveness**: Ensure the layout is fully responsive and looks great on all screen sizes, from mobile to desktop. Use Tailwind's responsive prefixes (e.g., \`md:\`, \`lg:\`).
5.  **Sections**: Return an array of strings, where each string is the ID of a main section in the website (e.g., "hero", "about", "services").

The output must be a valid JSON object matching the specified schema.
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
