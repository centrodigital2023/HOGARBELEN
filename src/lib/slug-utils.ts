/**
 * Utility functions for generating SEO-friendly slugs
 * Used primarily for professional profiles and dynamic routes
 */

/**
 * Normalizes a string to be URL-friendly
 * - Converts to lowercase
 * - Removes accents/diacritics
 * - Replaces spaces and special characters with hyphens
 * - Removes leading/trailing hyphens
 * 
 * @param str - String to normalize
 * @returns Normalized URL-friendly string
 * 
 * @example
 * normalizeString("María José Rodríguez")
 * // Returns: "maria-jose-rodriguez"
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generates a slug for a professional profile
 * Format: {name}-{category}-{city}
 * 
 * @param name - Professional's full name
 * @param category - Professional category (e.g., "enfermeria", "cuidador")
 * @param city - City where professional operates
 * @returns SEO-friendly slug
 * 
 * @example
 * generateProfessionalSlug("María Rodríguez", "Enfermera", "Pasto")
 * // Returns: "maria-rodriguez-enfermera-pasto"
 */
export function generateProfessionalSlug(
  name: string,
  category: string,
  city: string
): string {
  const namePart = normalizeString(name);
  const categoryPart = normalizeString(category);
  const cityPart = normalizeString(city);
  
  return `${namePart}-${categoryPart}-${cityPart}`;
}

/**
 * Generates a slug from a single text string (for general use)
 * 
 * @param text - Text to convert to slug
 * @returns SEO-friendly slug
 * 
 * @example
 * generateSlug("¿Cómo funciona Belén Conecta?")
 * // Returns: "como-funciona-belen-conecta"
 */
export function generateSlug(text: string): string {
  return normalizeString(text);
}

/**
 * Parses a professional slug back into its components
 * 
 * @param slug - Professional slug to parse
 * @returns Object with name, category, and city
 * 
 * @example
 * parseProfessionalSlug("maria-rodriguez-enfermera-pasto")
 * // Returns: { fullSlug: "...", city: "pasto", category: "enfermera" }
 */
export function parseProfessionalSlug(slug: string): {
  fullSlug: string;
  city: string | null;
  category: string | null;
} {
  const parts = slug.split('-');
  
  if (parts.length < 2) {
    return { fullSlug: slug, city: null, category: null };
  }
  
  // Assuming format: {name-parts}-{category}-{city}
  // Last part is city, second to last is category
  const city = parts[parts.length - 1];
  const category = parts[parts.length - 2];
  
  return {
    fullSlug: slug,
    city,
    category
  };
}

/**
 * Validates if a string is a valid slug format
 * 
 * @param slug - String to validate
 * @returns True if valid slug format
 * 
 * @example
 * isValidSlug("maria-rodriguez-enfermera-pasto") // true
 * isValidSlug("María Rodríguez") // false
 */
export function isValidSlug(slug: string): boolean {
  // Valid slug: lowercase letters, numbers, and hyphens only
  // No leading/trailing hyphens, no consecutive hyphens
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}

/**
 * Generates a unique slug by appending a number if slug already exists
 * 
 * @param baseSlug - Base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 * 
 * @example
 * generateUniqueSlug("maria-rodriguez-enfermera-pasto", ["maria-rodriguez-enfermera-pasto"])
 * // Returns: "maria-rodriguez-enfermera-pasto-2"
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }
  
  let counter = 2;
  let uniqueSlug = `${baseSlug}-${counter}`;
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
  
  return uniqueSlug;
}

/**
 * Category names mapping for URL normalization
 */
export const PROFESSIONAL_CATEGORIES = {
  enfermeria: 'enfermeria',
  enfermero: 'enfermeria',
  enfermera: 'enfermeria',
  cuidador: 'cuidadores',
  cuidadora: 'cuidadores',
  cuidadores: 'cuidadores',
  medico: 'medicos',
  medica: 'medicos',
  medicos: 'medicos',
  doctor: 'medicos',
  doctora: 'medicos',
  fisioterapeuta: 'terapia',
  terapeuta: 'terapia',
  terapia: 'terapia',
  nutricionista: 'otros',
  psicologo: 'otros',
  psicologa: 'otros',
  trabajador_social: 'otros',
  otro: 'otros'
} as const;

/**
 * Normalizes a category name to match routing structure
 * 
 * @param category - Category name to normalize
 * @returns Normalized category name
 * 
 * @example
 * normalizeCategoryForRoute("Enfermera") // "enfermeria"
 * normalizeCategoryForRoute("Cuidador") // "cuidadores"
 */
export function normalizeCategoryForRoute(category: string): string {
  const normalized = normalizeString(category);
  return PROFESSIONAL_CATEGORIES[normalized as keyof typeof PROFESSIONAL_CATEGORIES] || 'otros';
}

/**
 * Common Colombian cities for validation
 */
export const CITIES_NARINO = [
  'pasto',
  'buesaco',
  'san-lorenzo',
  'la-union',
  'narino',
  'ipiales',
  'tumaco',
  'tuquerres',
  'sandona'
] as const;

/**
 * Validates if a city slug is valid for Nariño region
 * 
 * @param citySlug - City slug to validate
 * @returns True if valid city
 */
export function isValidCity(citySlug: string): boolean {
  return CITIES_NARINO.includes(citySlug as typeof CITIES_NARINO[number]);
}
