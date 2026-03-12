'use server';
/**
 * @fileOverview An AI agent that recommends footwear based on user preferences.
 *
 * - aiProductRecommendation - A function that handles the shoe recommendation process.
 * - AIProductRecommendationInput - The input type for the aiProductRecommendation function.
 * - AIProductRecommendationOutput - The return type for the aiProductRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const mockCatalog = [
  {
    id: '1',
    name: 'Vapor Max-X',
    description: 'Advanced propulsion system with reactive cushioning for ultimate speed.',
    price: 12999,
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
    styleTags: ['futuristic', 'sporty', 'performance', 'running'],
    occasionTags: ['athletic', 'casual', 'everyday'],
    features: ['reactive cushioning', 'lightweight', 'breathable mesh'],
  },
  {
    id: '2',
    name: 'Cyber Classic',
    description: 'A fusion of retro aesthetics and modern cybernetic design.',
    price: 9499,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    styleTags: ['retro', 'cyberpunk', 'streetwear', 'classic'],
    occasionTags: ['casual', 'urban', 'fashion'],
    features: ['durable sole', 'comfort fit', 'sleek design'],
  },
  {
    id: '3',
    name: 'Volt Runner',
    description: 'Electrifying speed and comfort with adaptive lighting elements.',
    price: 14200,
    imageUrl: 'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?auto=format&fit=crop&w=600&q=80',
    styleTags: ['modern', 'athletic', 'glow', 'running'],
    occasionTags: ['athletic', 'night out', 'statement'],
    features: ['adaptive lighting', 'energy return', 'flexible upper'],
  },
  {
    id: '4',
    name: 'Jordan Peak',
    description: 'Elevated design for peak performance and style, inspired by iconic basketball shoes.',
    price: 19999,
    imageUrl: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=600&q=80',
    styleTags: ['iconic', 'basketball', 'premium', 'streetwear'],
    occasionTags: ['athletic', 'casual', 'fashion'],
    features: ['high-top support', 'air cushioning', 'durable construction'],
  },
  {
    id: '5',
    name: 'ULTRA L-01',
    description: 'The pinnacle of propulsion technology, designed for extreme agility.',
    price: 24999,
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    styleTags: ['futuristic', 'performance', 'high-tech', 'minimalist'],
    occasionTags: ['athletic', 'training'],
    features: ['propulsion system', 'ultra-lightweight', 'aerodynamic design'],
  },
  {
    id: '6',
    name: 'DARK MATTER',
    description: 'Stealthy design with carbon fiber weave for unparalleled durability and strength.',n    price: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1551107643-404395679f18?auto=format&fit=crop&w=800&q=80',
    styleTags: ['stealth', 'carbon fiber', 'durable', 'modern'],
    occasionTags: ['rugged', 'casual', 'urban'],
    features: ['carbon fiber weave', 'reinforced sole', 'weather-resistant'],
  },
  {
    id: '7',
    name: 'NEON GEN',
    description: 'Adaptive lighting that reacts to your environment, making every step a statement.',
    price: 21999,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    styleTags: ['neon', 'adaptive', 'statement', 'futuristic'],
    occasionTags: ['party', 'nightlife', 'fashion'],
    features: ['programmable LEDs', 'responsive design', 'comfort fit'],
  },
];

const AIProductRecommendationInputSchema = z.object({
  description: z.string().describe('Natural language description of desired shoe style, occasion, or features.'),
});
export type AIProductRecommendationInput = z.infer<typeof AIProductRecommendationInputSchema>;

const RecommendedShoeSchema = z.object({
  name: z.string().describe('The name of the recommended shoe.'),
  description: z.string().describe('A brief description of the recommended shoe.'),
  price: z.number().describe('The price of the recommended shoe.'),
  imageUrl: z.string().url().describe('The URL of an image for the recommended shoe.'),
});

const AIProductRecommendationOutputSchema = z.array(RecommendedShoeSchema);
export type AIProductRecommendationOutput = z.infer<typeof AIProductRecommendationOutputSchema>;

// Tool to search the mock catalog
const searchCatalog = ai.defineTool(
  {
    name: 'searchCatalog',
    description: 'Searches the NeoStride footwear catalog based on keywords, styles, occasions, or features.',
    inputSchema: z.object({
      keywords: z.array(z.string()).describe('A list of keywords to search for in shoe names, descriptions, styles, occasions, or features.'),
    }),
    outputSchema: z.array(RecommendedShoeSchema),
  },
  async (input) => {
    const lowerCaseKeywords = input.keywords.map((k) => k.toLowerCase());
    const results = mockCatalog.filter((shoe) => {
      const searchString = [
        shoe.name,
        shoe.description,
        ...shoe.styleTags,
        ...shoe.occasionTags,
        ...shoe.features,
      ].join(' ').toLowerCase();
      return lowerCaseKeywords.every((keyword) => searchString.includes(keyword));
    });
    // Return only the fields defined in RecommendedShoeSchema
    return results.map((shoe) => ({
      name: shoe.name,
      description: shoe.description,
      price: shoe.price,
      imageUrl: shoe.imageUrl,
    }));
  }
);

const recommendShoesPrompt = ai.definePrompt({
  name: 'recommendShoesPrompt',
  input: { schema: AIProductRecommendationInputSchema },
  output: { schema: AIProductRecommendationOutputSchema },
  tools: [searchCatalog],
  prompt: `You are an AI footwear recommendation assistant for NeoStride E-Store. Your goal is to help users find the perfect futuristic shoes based on their description.

Use the 'searchCatalog' tool to find shoes that match the user's preferences. When using the tool, extract relevant keywords from the user's description such as style, occasion, specific features, or general preferences.

If the user asks for something general, provide a few diverse recommendations. If no specific shoes match closely, try to find similar styles or categories.

User's desired shoe: {{{description}}}

After using the tool, output an array of recommended shoe objects. Each object must have a name, description, price (as a number), and imageUrl. If no recommendations are found, return an empty array.`,
});

const aiProductRecommendationFlow = ai.defineFlow(
  {
    name: 'aiProductRecommendationFlow',
    inputSchema: AIProductRecommendationInputSchema,
    outputSchema: AIProductRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await recommendShoesPrompt(input);
    return output!;
  }
);

export async function aiProductRecommendation(input: AIProductRecommendationInput): Promise<AIProductRecommendationOutput> {
  return aiProductRecommendationFlow(input);
}
