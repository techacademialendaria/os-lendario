import { useEffect } from 'react';

const APP_NAME = 'Academia Lendária';
const DEFAULT_DESCRIPTION = 'Plataforma de aprendizado com resumos de livros, frameworks mentais e clones cognitivos de grandes pensadores.';
const DEFAULT_IMAGE = '/og-default.png';
const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://academialendaria.com';

export interface MetaTagsConfig {
  title: string;
  description?: string;
  image?: string | null;
  url?: string;
  type?: 'website' | 'article' | 'book' | 'profile';
  // Book-specific
  author?: string;
  isbn?: string;
  // Twitter-specific
  twitterCard?: 'summary' | 'summary_large_image';
}

/**
 * Creates or updates a meta tag
 */
function setMetaTag(property: string, content: string, isName = false): void {
  const attribute = isName ? 'name' : 'property';
  let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Removes a meta tag if it exists
 */
function removeMetaTag(property: string, isName = false): void {
  const attribute = isName ? 'name' : 'property';
  const element = document.querySelector(`meta[${attribute}="${property}"]`);
  if (element) {
    element.remove();
  }
}

/**
 * Sets or updates the canonical link
 */
function setCanonicalUrl(url: string): void {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

/**
 * Hook to manage meta tags for SEO and social sharing
 *
 * @param config - Meta tags configuration
 *
 * @example
 * // Book detail page
 * useMetaTags({
 *   title: book.title,
 *   description: book.summary,
 *   image: book.coverUrl,
 *   type: 'book',
 *   author: book.author
 * });
 *
 * @example
 * // Library listing page
 * useMetaTags({
 *   title: 'Biblioteca',
 *   description: 'Explore nossa coleção de resumos de livros',
 *   type: 'website'
 * });
 */
export function useMetaTags(config: MetaTagsConfig | null | undefined): void {
  useEffect(() => {
    if (!config) return;

    const {
      title,
      description = DEFAULT_DESCRIPTION,
      image,
      url = typeof window !== 'undefined' ? window.location.href : '',
      type = 'website',
      author,
      isbn,
      twitterCard = 'summary_large_image',
    } = config;

    const fullTitle = `${title} | ${APP_NAME}`;
    const imageUrl = image ? (image.startsWith('http') ? image : `${BASE_URL}${image}`) : `${BASE_URL}${DEFAULT_IMAGE}`;
    const truncatedDescription = description.length > 160
      ? description.substring(0, 157) + '...'
      : description;

    // Update document title
    document.title = fullTitle;

    // Basic meta tags
    setMetaTag('description', truncatedDescription, true);

    // Open Graph tags
    setMetaTag('og:title', fullTitle);
    setMetaTag('og:description', truncatedDescription);
    setMetaTag('og:image', imageUrl);
    setMetaTag('og:url', url);
    setMetaTag('og:type', type);
    setMetaTag('og:site_name', APP_NAME);
    setMetaTag('og:locale', 'pt_BR');

    // Twitter Card tags
    setMetaTag('twitter:card', twitterCard, true);
    setMetaTag('twitter:title', fullTitle, true);
    setMetaTag('twitter:description', truncatedDescription, true);
    setMetaTag('twitter:image', imageUrl, true);

    // Book-specific tags
    if (type === 'book') {
      if (author) {
        setMetaTag('book:author', author);
        setMetaTag('article:author', author);
      }
      if (isbn) {
        setMetaTag('book:isbn', isbn);
      }
    }

    // Canonical URL
    setCanonicalUrl(url);

    // Cleanup function - reset to defaults on unmount
    return () => {
      document.title = APP_NAME;
      setMetaTag('description', DEFAULT_DESCRIPTION, true);
      setMetaTag('og:title', APP_NAME);
      setMetaTag('og:description', DEFAULT_DESCRIPTION);
      setMetaTag('og:image', `${BASE_URL}${DEFAULT_IMAGE}`);
      setMetaTag('og:type', 'website');

      // Remove specific tags
      removeMetaTag('book:author');
      removeMetaTag('book:isbn');
      removeMetaTag('article:author');
    };
  }, [
    config?.title,
    config?.description,
    config?.image,
    config?.url,
    config?.type,
    config?.author,
    config?.isbn,
    config?.twitterCard,
  ]);
}

/**
 * Generate meta tags config for a book
 */
export function generateBookMetaTags(book: {
  title: string;
  summary?: string | null;
  coverUrl?: string | null;
  author?: string;
  isbn?: string | null;
  slug: string;
}): MetaTagsConfig {
  return {
    title: book.title,
    description: book.summary || `Leia o resumo de "${book.title}" por ${book.author || 'autor desconhecido'}`,
    image: book.coverUrl,
    url: `${BASE_URL}/books/${book.slug}`,
    type: 'book',
    author: book.author,
    isbn: book.isbn || undefined,
    twitterCard: 'summary_large_image',
  };
}
