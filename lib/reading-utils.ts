/**
 * Reading Utilities
 *
 * Helper functions for content processing in the reading experience.
 * Extracted from BookReaderTemplate for reusability.
 */

/**
 * Generate URL-friendly slug from text
 * Used for heading IDs and anchor navigation
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Calculate reading time based on word count
 * Uses 200 wpm for casual reading (research-based)
 */
export const calculateReadingTime = (content: string | null): { minutes: number; words: number } => {
  if (!content) return { minutes: 0, words: 0 };
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return { minutes, words };
};

/**
 * Extract TL;DR summary from content
 * Looks for first blockquote or first substantial paragraph
 */
export const extractTLDR = (content: string | null): string | null => {
  if (!content) return null;

  // Try to find a blockquote at the start (common for summaries)
  const blockquoteMatch = content.match(/^>\s*(.+?)(?:\n\n|\n(?=[^>]))/s);
  if (blockquoteMatch) {
    return blockquoteMatch[1].replace(/\n>\s*/g, ' ').trim();
  }

  // Otherwise, get first paragraph after any heading
  const paragraphMatch = content.match(/(?:^|\n\n)(?!#)([A-Z][^#\n]{50,300}\.)/);
  if (paragraphMatch) {
    return paragraphMatch[1].trim();
  }

  return null;
};

/**
 * Extract notable quotes from content
 * Finds markdown blockquotes and text in quotation marks
 */
export const extractQuotes = (content: string | null): string[] => {
  if (!content) return [];

  const quotes: string[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Markdown blockquote
    if (line.startsWith('>')) {
      quotes.push(line.replace(/^>\s*/, '').trim());
    }
    // Text in quotes
    const quoteMatch = line.match(/"([^"]{20,})"/);
    if (quoteMatch) {
      quotes.push(quoteMatch[1]);
    }
  }

  return quotes.slice(0, 5); // Max 5 quotes
};

/**
 * Chapter/section structure for table of contents
 */
export interface Chapter {
  id: number;
  title: string;
  slug: string;
  completed: boolean;
  level: number;
}

/**
 * Extract chapters/sections from markdown content
 * Finds ## (h2) and ### (h3) headings, skips # (h1)
 */
export const extractChapters = (content: string | null): Chapter[] => {
  if (!content) return [];

  const chapters: Chapter[] = [];
  const lines = content.split('\n');
  let id = 1;

  for (const line of lines) {
    // Match ## (h2) and ### (h3) headings, skip # (h1)
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length; // 2 for ##, 3 for ###
      const title = match[2].trim();
      chapters.push({
        id: id++,
        title,
        slug: slugify(title),
        completed: false,
        level,
      });
    }
  }

  return chapters;
};

/**
 * Extract preview content (first ~800 characters)
 * Ends at a natural break point (sentence or paragraph)
 */
export const getPreviewContent = (content: string | null): string => {
  if (!content) return '';
  const maxLength = 800;
  if (content.length <= maxLength) return content;

  // Find a good breaking point (end of sentence or paragraph)
  const truncated = content.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastNewline = truncated.lastIndexOf('\n\n');
  const breakPoint = Math.max(lastPeriod, lastNewline);

  return breakPoint > 400 ? content.slice(0, breakPoint + 1) : truncated;
};

/**
 * Extract teaser content (section after preview)
 * Used for "Continue Reading" previews
 */
export const getTeaserContent = (content: string | null): string => {
  if (!content) return '';

  // Get where preview ends
  const previewEnd = getPreviewContent(content).length;
  const remainingContent = content.slice(previewEnd).trim();

  if (!remainingContent) return '';

  // Find next heading (## or ###)
  const headingMatch = remainingContent.match(/^(#{1,3}\s+.+)/m);
  if (!headingMatch) {
    // No heading found, just return first ~300 chars
    const firstPara = remainingContent.slice(0, 300);
    const endPoint = firstPara.lastIndexOf('.');
    return endPoint > 100 ? firstPara.slice(0, endPoint + 1) : firstPara;
  }

  const headingIndex = remainingContent.indexOf(headingMatch[0]);
  const afterHeading = remainingContent.slice(headingIndex);

  // Get the heading and the next paragraph (up to ~400 chars after heading)
  const lines = afterHeading.split('\n');
  let result = '';
  let charCount = 0;
  const maxChars = 400;

  for (const line of lines) {
    if (charCount > maxChars) break;
    result += line + '\n';
    charCount += line.length;
  }

  return result.trim();
};
