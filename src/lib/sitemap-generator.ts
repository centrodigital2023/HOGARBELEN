/**
 * Dynamic Sitemap Generator for Hogar Belén
 * 
 * This utility generates a sitemap.xml dynamically based on:
 * - Static routes defined in the application
 * - Dynamic routes from database (professionals, offers, etc.)
 * - Environment-specific domain configuration
 * 
 * Usage:
 * - Development: Uses VITE_APP_URL or defaults to localhost
 * - Production: Uses production domain from environment or config
 */

interface SitemapUrl {
  loc: string
  priority: number
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  lastmod?: string
}

/**
 * Get base URL based on environment
 */
export function getBaseUrl(): string {
  // Check for environment variable first
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL
  }
  
  // Check current hostname in browser
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5173'
    }
    return `${protocol}//${hostname}`
  }
  
  // Default production URL
  return 'https://hogarbelen.com'
}

/**
 * Static routes configuration
 */
const STATIC_ROUTES: SitemapUrl[] = [
  // Main pages
  { loc: '/', priority: 1.0, changefreq: 'daily' },
  { loc: '/nosotros', priority: 0.9, changefreq: 'monthly' },
  { loc: '/servicios', priority: 0.9, changefreq: 'weekly' },
  { loc: '/planes', priority: 0.9, changefreq: 'weekly' },
  { loc: '/belen-conecta', priority: 0.9, changefreq: 'weekly' },
  { loc: '/ingresar', priority: 0.7, changefreq: 'monthly' },
  { loc: '/registrarse', priority: 0.7, changefreq: 'monthly' },
  
  // Secondary pages
  { loc: '/lugar-sonado', priority: 0.8, changefreq: 'monthly' },
  { loc: '/por-que-hogar-belen', priority: 0.8, changefreq: 'monthly' },
  { loc: '/modo-vacaciones-permanentes', priority: 0.8, changefreq: 'monthly' },
  { loc: '/lo-que-nos-hace-unicos', priority: 0.8, changefreq: 'monthly' },
  { loc: '/testimonios', priority: 0.8, changefreq: 'weekly' },
  
  // Centro Vida
  { loc: '/centro-vida', priority: 0.9, changefreq: 'weekly' },
  { loc: '/centro-vida/buesaco', priority: 0.9, changefreq: 'monthly' },
  { loc: '/centro-vida/instalaciones', priority: 0.8, changefreq: 'monthly' },
  { loc: '/centro-vida/planes', priority: 0.9, changefreq: 'weekly' },
  { loc: '/centro-vida/agenda-visita', priority: 0.9, changefreq: 'weekly' },
  { loc: '/centro-vida/planes/compartida', priority: 0.8, changefreq: 'weekly' },
  { loc: '/centro-vida/planes/individual', priority: 0.8, changefreq: 'weekly' },
  
  // Services
  { loc: '/servicios/cuidado-en-casa', priority: 0.9, changefreq: 'weekly' },
  { loc: '/servicios/cuidado-residencial', priority: 0.9, changefreq: 'weekly' },
  { loc: '/servicios/atencion-medica', priority: 0.9, changefreq: 'weekly' },
  { loc: '/servicios/vida-activa', priority: 0.8, changefreq: 'weekly' },
  
  // Planes
  { loc: '/planes-vida-activa', priority: 0.9, changefreq: 'weekly' },
  { loc: '/planes-vida-activa/plan-amigos', priority: 0.8, changefreq: 'weekly' },
  { loc: '/planes-vida-activa/plan-sol-y-cafe', priority: 0.8, changefreq: 'weekly' },
  { loc: '/planes-vida-activa/plan-sonreir', priority: 0.8, changefreq: 'weekly' },
  { loc: '/planes-vida-activa/plan-turismo-rural', priority: 0.8, changefreq: 'weekly' },
  { loc: '/planes-vida-activa/plan-amigos/galeria', priority: 0.7, changefreq: 'monthly' },
  { loc: '/planes-vida-activa/plan-sol-y-cafe/galeria', priority: 0.7, changefreq: 'monthly' },
  
  // Belén Conecta - Families
  { loc: '/belen-conecta/familias', priority: 0.9, changefreq: 'weekly' },
  { loc: '/belen-conecta/familias/buscar-profesionales', priority: 0.9, changefreq: 'daily' },
  { loc: '/belen-conecta/familias/publicar-oferta', priority: 0.8, changefreq: 'weekly' },
  { loc: '/belen-conecta/familias/como-funciona', priority: 0.8, changefreq: 'monthly' },
  
  // Belén Conecta - Professionals
  { loc: '/belen-conecta/profesionales', priority: 0.9, changefreq: 'weekly' },
  { loc: '/belen-conecta/profesionales/registro', priority: 0.9, changefreq: 'monthly' },
  { loc: '/belen-conecta/profesionales/ofertas', priority: 0.9, changefreq: 'daily' },
  { loc: '/belen-conecta/profesionales/beneficios', priority: 0.8, changefreq: 'monthly' },
  
  // Professionals by category
  { loc: '/profesionales', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/enfermeria', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/cuidadores', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/medicos', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/terapia', priority: 0.8, changefreq: 'weekly' },
  { loc: '/profesionales/otros', priority: 0.7, changefreq: 'weekly' },
  
  // Professionals by city
  { loc: '/profesionales/bogota', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/cali', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/medellin', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/pasto', priority: 0.9, changefreq: 'weekly' },
  { loc: '/profesionales/enfermeria/bogota', priority: 0.9, changefreq: 'weekly' },
  
  // Offers
  { loc: '/ofertas', priority: 0.9, changefreq: 'daily' },
  { loc: '/ofertas/cuidado-adulto-mayor-bogota', priority: 0.9, changefreq: 'daily' },
  { loc: '/trabaja-con-nosotros', priority: 0.8, changefreq: 'weekly' },
  
  // Legal
  { loc: '/terminos-y-condiciones', priority: 0.4, changefreq: 'yearly' },
  { loc: '/politica-de-privacidad', priority: 0.4, changefreq: 'yearly' },
  { loc: '/politica-de-cookies', priority: 0.4, changefreq: 'yearly' },
  { loc: '/tratamiento-de-datos', priority: 0.4, changefreq: 'yearly' },
]

/**
 * Generates sitemap URLs from professional profiles
 * In production, this would fetch from database
 */
export async function getDynamicProfessionalUrls(): Promise<SitemapUrl[]> {
  // TODO: Replace with actual database query
  // Example:
  // const professionals = await supabase
  //   .from('professionals')
  //   .select('slug, updated_at')
  //   .eq('verified', true)
  //   .eq('active', true)
  
  // For now, return empty array
  // In production, return:
  // return professionals.map(prof => ({
  //   loc: `/profesional/${prof.slug}`,
  //   priority: 0.8,
  //   changefreq: 'weekly',
  //   lastmod: prof.updated_at
  // }))
  
  return []
}

/**
 * Generates sitemap URLs from job offers
 */
export async function getDynamicOfferUrls(): Promise<SitemapUrl[]> {
  // TODO: Replace with actual database query
  return []
}

/**
 * Generate complete sitemap XML
 */
export async function generateSitemap(): Promise<string> {
  const baseUrl = getBaseUrl()
  
  // Get all URLs
  const staticUrls = STATIC_ROUTES
  const professionalUrls = await getDynamicProfessionalUrls()
  const offerUrls = await getDynamicOfferUrls()
  
  const allUrls = [...staticUrls, ...professionalUrls, ...offerUrls]
  
  // Generate XML
  const urlEntries = allUrls
    .map(url => {
      const lastmod = url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''
      return `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>${lastmod}
  </url>`
    })
    .join('\n\n')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urlEntries}

</urlset>`
}

/**
 * Save sitemap to public directory (for build process)
 */
export async function saveSitemap(): Promise<void> {
  const xml = await generateSitemap()
  
  // In Node.js environment (build script):
  // const fs = require('fs')
  // fs.writeFileSync('public/sitemap.xml', xml)
  
  console.log('Sitemap generated:', xml.split('\n').length, 'lines')
}

/**
 * Express/API route handler for dynamic sitemap
 * Use this in production to serve sitemap.xml dynamically
 * 
 * Note: Requires Express to be installed and types imported:
 * import { Request, Response } from 'express'
 */
export async function sitemapHandler(_req: any, res: any): Promise<void> {
  const xml = await generateSitemap()
  res.header('Content-Type', 'application/xml')
  res.send(xml)
}
