import { useState, useEffect } from 'react';
import YAML from 'yaml';

export interface UseYamlParserReturn {
  parsedData: any;
  parseError: string | null;
}

export function useYamlParser(content: string): UseYamlParserReturn {
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);

  useEffect(() => {
    try {
      if (!content) {
        setParsedData(null);
        setParseError(null);
        return;
      }
      // Basic YAML safety check
      if (content.length > 200000) throw new Error('File too large to parse');

      // Handle multi-document YAML (e.g. from Jekyll/Frontmatter)
      // Split by --- and find the first valid YAML object
      const documents = content.split(/^---$/m).filter((doc) => doc.trim().length > 0);

      let data = null;
      if (documents.length > 0) {
        try {
          data = YAML.parse(documents[0]);
        } catch (e) {
          // If first doc fails, try the second (common in frontmatter files where first part is empty)
          if (documents.length > 1) {
            data = YAML.parse(documents[1]);
          } else {
            throw e;
          }
        }
      } else {
        data = YAML.parse(content);
      }

      setParsedData(data);
      setParseError(null);
    } catch (e: any) {
      console.warn('YAML Parse Warning:', e);
      setParseError(e.message || 'Unknown parsing error');
      setParsedData(null);
    }
  }, [content]);

  return { parsedData, parseError };
}
