import { useEffect } from 'react';
import { trackPageView } from '../lib/metaPixel';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
  noindex?: boolean;
  h1?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://www.hogarbelen.org/images/og-home.jpg',
  ogType = 'website',
  schema,
  noindex = false,
  h1
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Track page view with Meta Pixel
    trackPageView();
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update keywords if provided
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }
    
    // Update robots meta tag based on noindex
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      'content', 
      noindex 
        ? 'noindex, nofollow' 
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );
    
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }
    
    const ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (ogTypeMeta) {
      ogTypeMeta.setAttribute('content', ogType);
    }
    
    if (canonical) {
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', canonical);
      }
    }
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', ogImage);
    }
    
    if (schema) {
      let scriptTag = document.querySelector('script[data-schema="page"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('data-schema', 'page');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    }
    
    // Update H1 if provided (for accessibility)
    if (h1) {
      const mainH1 = document.querySelector('h1');
      if (mainH1 && !mainH1.textContent) {
        mainH1.textContent = h1;
      }
    }
  }, [title, description, keywords, canonical, ogImage, ogType, schema, noindex, h1]);

  return null;
};
