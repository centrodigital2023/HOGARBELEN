import { useState, useEffect } from 'react';
import { searchPexelsPhotos } from '@/lib/pexels';

interface PexelsImageProps {
  query: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  size?: 'small' | 'medium' | 'large' | 'landscape' | 'portrait';
}

export const PexelsImage = ({
  query,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  size = 'large'
}: PexelsImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const photos = await searchPexelsPhotos(query, 1);
        if (photos.length > 0) {
          setImageSrc(photos[0].src[size]);
        }
      } catch (error) {
        console.error('Error loading Pexels image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [query, size]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${loading ? 'animate-pulse bg-gray-200' : ''}`}
      loading="lazy"
    />
  );
};
