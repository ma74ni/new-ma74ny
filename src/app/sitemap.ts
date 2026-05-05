import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             'https://ma74ny.com',
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        1,
    },
  ];
}
