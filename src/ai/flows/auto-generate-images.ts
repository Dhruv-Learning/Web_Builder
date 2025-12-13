'use server';

/**
 * @fileOverview Flow for auto-generating royalty-free placeholder images for a website.
 *
 * - autoGenerateImages - A function that handles the image generation process.
 * - AutoGenerateImagesInput - The input type for the autoGenerateImages function.
 * - AutoGenerateImagesOutput - The return type for the autoGenerateImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoGenerateImagesInputSchema = z.object({
  websiteDescription: z
    .string()
    .describe('A description of the website for which images are to be generated.'),
  numberOfImages: z
    .number()
    .min(1)
    .max(5)
    .default(3)
    .describe('The number of images to generate.'),
});
export type AutoGenerateImagesInput = z.infer<typeof AutoGenerateImagesInputSchema>;

const AutoGenerateImagesOutputSchema = z.object({
  imageUrls: z.array(z.string()).describe('URLs of the generated images.'),
});
export type AutoGenerateImagesOutput = z.infer<typeof AutoGenerateImagesOutputSchema>;

export async function autoGenerateImages(input: AutoGenerateImagesInput): Promise<AutoGenerateImagesOutput> {
  return autoGenerateImagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoGenerateImagesPrompt',
  input: {schema: AutoGenerateImagesInputSchema},
  output: {schema: AutoGenerateImagesOutputSchema},
  prompt: `You are an AI that generates royalty-free placeholder images for websites.

  Based on the description of the website provided, generate {{numberOfImages}} images that would be appropriate for the website.

  Website Description: {{{websiteDescription}}}

  Return a JSON array of image URLs.
  Ensure the URLs are publicly accessible and royalty-free.
  Do not include any explanation or preamble, only the valid JSON array.
  `,
});

const autoGenerateImagesFlow = ai.defineFlow(
  {
    name: 'autoGenerateImagesFlow',
    inputSchema: AutoGenerateImagesInputSchema,
    outputSchema: AutoGenerateImagesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    try {
      // Attempt to parse the output as JSON.  If it fails, the LLM likely
      // returned some text before or after the JSON, so we should attempt to
      // clean it up.
      return {
        imageUrls: JSON.parse(output!.text) as string[],
      };
    } catch (e) {
      // Remove anything before the opening bracket and after the closing bracket.
      const cleaned = output!.text.substring(output!.text.indexOf('['), output!.text.lastIndexOf(']') + 1);

      try {
        return {
          imageUrls: JSON.parse(cleaned) as string[],
        };
      } catch (e) {
        console.error('Could not parse image URLs, returning empty array');
        return {
          imageUrls: [],
        };
      }
    }
  }
);
