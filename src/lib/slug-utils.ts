/**
 * Utility functions for generating SEO-friendly slugs
 * for professional profiles and other dynamic content
 */

/**
 * Removes accents/diacritics from text
 */
export function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Converts a string to a URL-friendly slug
 * - Lowercase
 * - No accents
 * - Hyphens instead of spaces
 * - Only alphanumeric and hyphens
 */
export function slugify(text: string): string {
  return removeAccents(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove non-word chars except hyphens
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single
    .replace(/^-+/, '')              // Trim hyphens from start
    .replace(/-+$/, '')              // Trim hyphens from end
}

/**
 * Generates a professional profile slug based on:
 * - Name
 * - City
 * - Category
 * 
 * Example: generateProfessionalSlug("María García", "Bogotá", "Enfermería")
 * Returns: "maria-garcia-enfermeria-bogota"
 */
export function generateProfessionalSlug(
  name: string,
  city: string,
  category: string
): string {
  const namePart = slugify(name)
  const categoryPart = slugify(category)
  const cityPart = slugify(city)
  
  return `${namePart}-${categoryPart}-${cityPart}`
}

/**
 * Parses a professional slug back into its components
 * Note: This function handles multi-word names correctly by keeping
 * all hyphens in the name part (everything before the last two segments)
 * 
 * Examples:
 * - "maria-garcia-enfermeria-bogota" → { name: "maria-garcia", category: "enfermeria", city: "bogota" }
 * - "maria-jose-garcia-enfermeria-bogota" → { name: "maria-jose-garcia", category: "enfermeria", city: "bogota" }
 * - "ana-maria-lopez-rodriguez-medicos-medellin" → { name: "ana-maria-lopez-rodriguez", category: "medicos", city: "medellin" }
 */
export function parseProfessionalSlug(slug: string): {
  name: string
  category: string
  city: string
} | null {
  const parts = slug.split('-')
  
  // Minimum: one-word name + category + city = 3 parts
  if (parts.length < 3) {
    return null
  }
  
  // Last part is city
  const city = parts[parts.length - 1]
  
  // Second to last is category
  const category = parts[parts.length - 2]
  
  // Everything else is name (preserves hyphens in multi-word names)
  const name = parts.slice(0, -2).join('-')
  
  // Validate against known categories and cities
  const validCategories = ['enfermeria', 'cuidadores', 'medicos', 'terapia', 'otros']
  const validCities = ['bogota', 'cali', 'medellin', 'pasto', 'buesaco']
  
  if (!validCategories.includes(category) && !validCities.includes(city)) {
    // If both category and city seem invalid, this might not be a valid slug
    return null
  }
  
  return { name, category, city }
}

/**
 * Validates if a slug matches the expected professional slug pattern
 */
export function isValidProfessionalSlug(slug: string): boolean {
  // Must have at least name-category-city (3 parts minimum)
  const parts = slug.split('-')
  return parts.length >= 3 && /^[a-z0-9-]+$/.test(slug)
}

/**
 * Generates a slug for job offers
 * 
 * Example: generateOfferSlug("Cuidado Adulto Mayor", "Bogotá")
 * Returns: "cuidado-adulto-mayor-bogota"
 */
export function generateOfferSlug(title: string, city: string): string {
  const titlePart = slugify(title)
  const cityPart = slugify(city)
  
  return `${titlePart}-${cityPart}`
}

/**
 * Generates a slug for blog posts or articles
 * 
 * Example: generateArticleSlug("Cómo cuidar a un adulto mayor")
 * Returns: "como-cuidar-a-un-adulto-mayor"
 */
export function generateArticleSlug(title: string): string {
  return slugify(title)
}

/**
 * Generates canonical URL for a given path
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = 'https://hogarbelen.com'
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * Common city slugs used in the application
 */
export const CITY_SLUGS = {
  bogota: 'bogota',
  cali: 'cali',
  medellin: 'medellin',
  pasto: 'pasto',
  buesaco: 'buesaco'
} as const

/**
 * Common category slugs for professionals
 */
export const CATEGORY_SLUGS = {
  enfermeria: 'enfermeria',
  cuidadores: 'cuidadores',
  medicos: 'medicos',
  terapia: 'terapia',
  otros: 'otros'
} as const

export type CitySlug = keyof typeof CITY_SLUGS
export type CategorySlug = keyof typeof CATEGORY_SLUGS
