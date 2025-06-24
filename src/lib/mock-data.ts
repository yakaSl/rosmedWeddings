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
  },
];

export const getGalleryById = (id: string | undefined) => {
  if (!id) return undefined;
  return galleries.find(g => g.id === id);
}
