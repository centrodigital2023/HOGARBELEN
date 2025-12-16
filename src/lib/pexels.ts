const PEXELS_API_KEY = 'BTwqq2C2wgW1JIK0hKXU3IFdheqFPNSGD1k7SIKd2LKVKlq5aUY39VbF';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

export const searchPexelsPhotos = async (
  query: string,
  perPage: number = 10
): Promise<PexelsPhoto[]> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsSearchResponse = await response.json();
    return data.photos;
  } catch (error) {
    console.error('Error fetching Pexels photos:', error);
    return [];
  }
};

export const getCuratedPhotos = async (perPage: number = 15): Promise<PexelsPhoto[]> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=${perPage}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsSearchResponse = await response.json();
    return data.photos;
  } catch (error) {
    console.error('Error fetching curated Pexels photos:', error);
    return [];
  }
};

export const getPhotoById = async (id: number): Promise<PexelsPhoto | null> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/photos/${id}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsPhoto = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pexels photo:', error);
    return null;
  }
};

export const elderCareQueries = [
  'elderly care',
  'senior citizen happy',
  'nursing home',
  'elderly people smiling',
  'caregiver elderly',
  'old people happy',
  'retirement home',
  'elderly activities',
  'senior care',
  'elderly couple',
];
