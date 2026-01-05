/**
 * Color generation utilities for book components
 *
 * Used by:
 * - AuthorCard
 * - BookCardHorizontal
 * - BooksAuthorsTemplate
 */

/**
 * Generate a CSS gradient based on a string input (name, slug, etc.)
 * Creates a consistent gradient for the same input
 */
export const generateGradient = (input: string): string => {
  const hash = input
    .split('')
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 70%, 60%), hsl(${h2}, 80%, 40%))`;
};

/**
 * Generate a Tailwind background gradient class based on slug
 * Returns a consistent gradient class for the same slug
 */
export const generateBgFromSlug = (slug: string): string => {
  const colors = [
    'from-purple-900/80 to-purple-950',
    'from-blue-900/80 to-blue-950',
    'from-emerald-900/80 to-emerald-950',
    'from-amber-900/80 to-amber-950',
    'from-rose-900/80 to-rose-950',
    'from-cyan-900/80 to-cyan-950',
    'from-pink-900/80 to-pink-950',
    'from-indigo-900/80 to-indigo-950',
  ];
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

/**
 * Get initials from a name (e.g., "John Doe" => "JD")
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
