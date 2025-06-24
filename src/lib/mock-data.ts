
export interface Photo {
  id: string;
  src: string;
  hint: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  joinDate: string;
}

export interface Gallery {
  id: string;
  clientId: string;
  title: string;
  date: string;
  imageCount: number;
  thumbnail: string;
  hint: string;
  status: 'selection' | 'proofing' | 'complete';
  photos: Photo[];
  selections: string[];
}


export const clients: Client[] = [
    {
        id: 'client-1',
        name: 'Jane & John Doe',
        email: 'jane.doe@example.com',
        joinDate: 'June 01, 2024'
    },
    {
        id: 'client-2',
        name: 'The Chen Family',
        email: 'chen.family@example.com',
        joinDate: 'March 15, 2024'
    }
];


export let galleries: Gallery[] = [
  {
    id: 'jane-john-wedding',
    clientId: 'client-1',
    title: 'Jane & John\'s Wedding',
    date: 'July 15, 2024',
    imageCount: 125,
    thumbnail: 'https://placehold.co/600x400.png',
    hint: 'wedding couple kissing',
    status: 'selection',
    photos: Array.from({ length: 125 }, (_, i) => ({
      id: `jj-wedding-${i + 1}`,
      src: 'https://placehold.co/800x600.png',
      hint: 'wedding photo',
    })),
    selections: [`jj-wedding-3`, `jj-wedding-8`, `jj-wedding-15`, `jj-wedding-22`, `jj-wedding-45`, `jj-wedding-51`, `jj-wedding-68`, `jj-wedding-99`, `jj-wedding-101`, `jj-wedding-112`, `jj-wedding-120`],
  },
  {
    id: 'chen-family-portraits',
    clientId: 'client-2',
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
    selections: Array.from({ length: 45 }, (_, i) => `chen-family-${i + 1}`),
  },
    {
    id: 'jane-john-engagement',
    clientId: 'client-1',
    title: 'Jane & John\'s Engagement',
    date: 'April 05, 2024',
    imageCount: 78,
    thumbnail: 'https://placehold.co/600x400.png',
    hint: 'engagement couple',
    status: 'complete',
    photos: Array.from({ length: 78 }, (_, i) => ({
      id: `jj-engagement-${i + 1}`,
      src: 'https://placehold.co/800x600.png',
      hint: 'engagement photo',
    })),
    selections: Array.from({ length: 78 }, (_, i) => `jj-engagement-${i + 1}`),
  },
];

export function getGalleryById(id: string | undefined): Gallery | undefined {
  if (!id) return undefined;
  const gallery = galleries.find(g => g.id === id);
  return gallery ? { ...gallery, photos: [...gallery.photos], selections: [...gallery.selections] } : undefined;
}

export function submitSelections(galleryId: string, photoIds: string[]): void {
    const galleryIndex = galleries.findIndex(g => g.id === galleryId);
    if (galleryIndex !== -1) {
        galleries[galleryIndex].selections = photoIds;
        galleries[galleryIndex].status = 'proofing';
        console.log(`Selections for ${galleryId} updated:`, photoIds);
    }
}
