'use server';

/**
 * @fileOverview A flow to generate SEO meta tags for a website.
 *
 * - generateSeoMetaTags - A function that generates SEO meta tags for a website.
 * - GenerateSeoMetaTagsInput - The input type for the generateSeoMetaTags function.
 * - GenerateSeoMetaTagsOutput - The return type for the generateSeoMetaTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetaTagsInputSchema = z.object({
  websiteDescription: z
    .string()
    .describe('A detailed description of the website content and purpose.'),
  keywords: z
    .string()
    .describe('Comma separated keywords related to the website content.'),
  websiteTitle: z.string().describe('The title of the website.'),
});
export type GenerateSeoMetaTagsInput = z.infer<typeof GenerateSeoMetaTagsInputSchema>;

const GenerateSeoMetaTagsOutputSchema = z.object({
  metaTags: z
    .string()
    .describe(
      'A string containing the generated HTML meta tags for SEO optimization.'
    ),
});
export type GenerateSeoMetaTagsOutput = z.infer<typeof GenerateSeoMetaTagsOutputSchema>;

export async function generateSeoMetaTags(
  input: GenerateSeoMetaTagsInput
): Promise<GenerateSeoMetaTagsOutput> {
  return generateSeoMetaTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMetaTagsPrompt',
  input: {schema: GenerateSeoMetaTagsInputSchema},
  output: {schema: GenerateSeoMetaTagsOutputSchema},
  prompt: `You are an expert SEO specialist.
  You will generate SEO meta tags for a website based on the provided information.
  The meta tags should be well-formed HTML.

  Website Title: {{{websiteTitle}}}
  Website Description: {{{websiteDescription}}}
  Keywords: {{{keywords}}}

  The meta tags must include:
    *   A title tag with the website title.
    *   A meta description tag with the website description.
    *   A meta keywords tag with the provided keywords.
    *   A meta robots tag with the value "index, follow".
    *   A meta viewport tag with the value "width=device-width, initial-scale=1.0".

  Ensure that the meta tags are properly formatted and optimized for search engines.
  Return only the HTML meta tags.
  Do not include any surrounding text or explanations.
  `,
});

const generateSeoMetaTagsFlow = ai.defineFlow(
  {
    name: 'generateSeoMetaTagsFlow',
    inputSchema: GenerateSeoMetaTagsInputSchema,
    outputSchema: GenerateSeoMetaTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
