/**
 * MermaidBlock - Renders Mermaid diagrams with luxury gold theme
 */

import React, { useEffect, useState } from 'react';
import { MERMAID_CONFIG, MERMAID_LUXURY_PALETTE, getMermaidStyleOverride } from '../data';
import type { MermaidBlockProps } from '../types';

/**
 * Post-process Mermaid SVG to apply luxury gold monochrome palette.
 * Mermaid uses inline styles that override CSS, so we need to modify the SVG directly.
 */
const applyLuxuryThemeToSvg = (svg: string): string => {
  const { GOLD, GOLD_DARK, GOLD_BORDER, TEXT_LIGHT, LINE_COLOR } = MERMAID_LUXURY_PALETTE;

  let processed = svg;

  // Replace all fill colors on rects (nodes) with dark gold background
  processed = processed.replace(
    /(<rect[^>]*)(fill=["'][^"']*["'])/gi,
    `$1fill="${GOLD_DARK}"`
  );

  // Replace fill styles in style attributes
  processed = processed.replace(
    /(style=["'][^"']*)(fill:\s*[^;"']+)/gi,
    `$1fill: ${GOLD_DARK}`
  );

  // Make the root/center circle gold
  processed = processed.replace(
    /(<circle[^>]*)(fill=["'][^"']*["'])/gi,
    `$1fill="${GOLD}"`
  );

  // Replace all stroke colors with gold border
  processed = processed.replace(
    /stroke=["'](?!none)[^"']*["']/gi,
    `stroke="${GOLD_BORDER}"`
  );

  // Replace stroke in style attributes
  processed = processed.replace(
    /(style=["'][^"']*)(stroke:\s*[^;"']+)/gi,
    `$1stroke: ${GOLD_BORDER}`
  );

  // Make all path lines (connections) gold
  processed = processed.replace(
    /(<path[^>]*class=["'][^"']*edge[^"']*["'][^>]*)(stroke=["'][^"']*["'])/gi,
    `$1stroke="${LINE_COLOR}"`
  );

  // Force all text to be light colored
  processed = processed.replace(
    /(<text[^>]*)(fill=["'][^"']*["'])/gi,
    `$1fill="${TEXT_LIGHT}"`
  );

  // Also handle tspan elements
  processed = processed.replace(
    /(<tspan[^>]*)(fill=["'][^"']*["'])/gi,
    `$1fill="${TEXT_LIGHT}"`
  );

  // Replace text fill in style attributes
  processed = processed.replace(
    /(<text[^>]*style=["'][^"']*)(fill:\s*[^;"']+)/gi,
    `$1fill: ${TEXT_LIGHT}`
  );

  // Add global style override at the start of SVG
  const styleOverride = getMermaidStyleOverride();
  processed = processed.replace(/(<svg[^>]*>)/, `$1${styleOverride}`);

  return processed;
};

export const MermaidBlock: React.FC<MermaidBlockProps> = ({ chart, id }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      try {
        // Dynamic import of mermaid
        const mermaid = (await import('mermaid')).default;

        // Initialize with luxury gold theme
        mermaid.initialize(MERMAID_CONFIG);

        const uniqueId = `mermaid-${id}-${Date.now()}`;
        const { svg: renderedSvg } = await mermaid.render(uniqueId, chart);

        // Post-process SVG to force luxury gold monochrome palette
        const processedSvg = applyLuxuryThemeToSvg(renderedSvg);

        if (isMounted) {
          setSvg(processedSvg);
          setError('');
        }
      } catch (e) {
        console.error('Mermaid render error:', e);
        if (isMounted) {
          setError('Erro ao renderizar diagrama');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  if (loading) {
    return (
      <div className="my-6 flex items-center justify-center rounded-xl border border-border/30 bg-muted/20 p-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Renderizando diagrama...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div
      className="my-8 overflow-x-auto rounded-2xl border border-primary/10 bg-[#0a0a0a] p-8 [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidBlock;
