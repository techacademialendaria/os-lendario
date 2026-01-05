import React from 'react';
import type { MetadataFooterProps } from '../types';

export const MetadataFooter: React.FC<MetadataFooterProps> = ({
  analysisDate,
  confidence,
}) => {
  if (!analysisDate && !confidence) {
    return null;
  }

  return (
    <div className="border-t border-border pt-4 text-center text-[10px] text-muted-foreground/50">
      {analysisDate && <span>Analise: {analysisDate}</span>}
      {analysisDate && confidence && <span className="mx-2">•</span>}
      {confidence && <span>Confianca: {confidence}</span>}
    </div>
  );
};

export default MetadataFooter;
