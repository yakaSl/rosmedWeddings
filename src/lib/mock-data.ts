
export interface Photo {
  id: string;
  src: string;
  hint: string;
}

export interface Gallery {
  id: string;
  title: string;
  date: string;
  imageCount: number;
  thumbnail: string;
  hint: string;
  status: 'selection' | 'proofing' | 'complete';
  photos: Photo[];
  selections: string[];
}

export const galleries: Gallery[] = [
  {
    id: 'smith-jones-wedding',
    title: 'Smith & Jones Wedding',
    date: 'July 15, 2024',
    imageCount: 125,
    thumbnail: 'https://placehold.co/600x400.png',
    hint: 'wedding couple kissing',
    status: 'selection',
    photos: Array.from({ length: 125 }, (_, i) => ({
      id: `sj-wedding-${i + 1}`,
      src: 'https://placehold.co/800x600.png',
      hint: 'wedding photo',
    })),
    selections: [`sj-wedding-3`, `sj-wedding-8`, `sj-wedding-15`, `sj-wedding-22`, `sj-wedding-45`, `sj-wedding-51`, `sj-wedding-68`, `sj-wedding-99`, `sj-wedding-101`, `sj-wedding-112`, `sj-wedding-120`],
  },
  {
    id: 'chen-family-portraits',
    title: 'Chen Family Portraits',
    date: 'May 20, 2024',
    imageCount: 45,
    thumbnail: 'https://placehold.co/600x400.png',
    hint: 'family portrait',
    status: 'complete',
    photos: Array.from({ length: 45 }, (_, i) => ({
      id: `chen-family-${i + 1}`,
      src: 'https://placehold.co/800x600.png',
      hint: 'family photo',
    })),
    selections: [],
  },
    {
    id: 'engagement-session',
    title: 'Engagement Session',
    date: 'April 05, 2024',
    imageCount: 78,
    thumbnail: 'https://placehold.co/600x400.png',
    hint: 'engagement couple',
    status: 'complete',
    photos: Array.from({ length: 78 }, (_, i) => ({
      id: `engagement-${i + 1}`,
      src: 'https://placehold.co/800x600.png',
      hint: 'engagement photo',
    })),
    selections: [],
  },
];

export function getGalleryById(id: string | undefined): Gallery | undefined {
  if (!id) return undefined;
  // Return a copy to prevent direct mutation of the original data
  const gallery = galleries.find(g => g.id === id);
  return gallery ? { ...gallery } : undefined;
}

export function submitSelections(galleryId: string, photoIds: string[]): void {
    const gallery = galleries.find(g => g.id === galleryId);
    if (gallery) {
        gallery.selections = photoIds;
        gallery.status = 'proofing'; // Or some other status to indicate selections are made
        console.log(`Selections for ${galleryId} updated:`, photoIds);
    }
}
