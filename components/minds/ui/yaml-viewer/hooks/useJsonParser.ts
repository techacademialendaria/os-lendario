import { useState, useEffect } from 'react';

export interface UseJsonParserReturn {
  parsedData: any;
  parseError: string | null;
}

export function useJsonParser(content: string): UseJsonParserReturn {
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);

  useEffect(() => {
    try {
      if (!content) {
        setParsedData(null);
        setParseError(null);
        return;
      }
      const data = JSON.parse(content);
      setParsedData(data);
      setParseError(null);
    } catch (e: any) {
      console.warn('JSON Parse Warning:', e);
      setParseError(e.message || 'Unknown parsing error');
      setParsedData(null);
    }
  }, [content]);

  return { parsedData, parseError };
}
