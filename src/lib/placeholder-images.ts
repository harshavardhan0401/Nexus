
import data from '@/app/lib/placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export function getPlaceholderImage(id: string): string {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image?.imageUrl || '';
}

export function getPlaceholderHint(id: string): string {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image?.imageHint || '';
}
