import React, { useRef, useState } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { toast } from '../../../hooks/use-toast';

/**
 * ShareImageModal - Modal for sharing highlights as images
 *
 * Extracted from: BookHighlightsTemplate.tsx
 * Features:
 * - Generates shareable image using html2canvas
 * - Native share API support
 * - Copy to clipboard fallback
 */

interface ShareImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlight: {
    text: string;
    note?: string;
  };
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
}

const ShareImageModal: React.FC<ShareImageModalProps> = ({
  isOpen,
  onClose,
  highlight,
  bookTitle,
  bookAuthor,
  bookCover,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      // Dynamic import of html2canvas
      const html2canvas = (await import('html2canvas')).default;
      // html2canvas v1.4+ options (types are outdated)
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
      } as any);

      const link = document.createElement('a');
      link.download = `highlight-${bookTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: 'Imagem salva!',
        description: 'Agora você pode compartilhar nas redes sociais.',
      });
    } catch (err) {
      console.error('Failed to generate image:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível gerar a imagem.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = async () => {
    const shareText = highlight.note
      ? `"${highlight.text}"\n\n— ${highlight.note}\n\n📚 ${bookTitle} por ${bookAuthor}`
      : `"${highlight.text}"\n\n📚 ${bookTitle} por ${bookAuthor}`;

    await navigator.clipboard.writeText(shareText);
    toast({ title: 'Copiado!', description: 'Texto copiado para compartilhar.' });
  };

  const handleNativeShare = async () => {
    const shareText = highlight.note
      ? `"${highlight.text}"\n\n— ${highlight.note}\n\n📚 ${bookTitle} por ${bookAuthor}`
      : `"${highlight.text}"\n\n📚 ${bookTitle} por ${bookAuthor}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Destaque de ${bookTitle}`,
          text: shareText,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border p-6">
          <DialogTitle className="text-lg font-bold">Compartilhar Destaque</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Preview Card - This will be converted to image */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-6"
            style={{ aspectRatio: '1/1', maxWidth: '400px', margin: '0 auto' }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
              {/* Header with Logo */}
              <div className="mb-4 flex items-center gap-2.5">
                <img
                  src="https://academialendaria.ai/wp-content/uploads/2025/11/Silhueta-AL-32.svg"
                  alt=""
                  className="h-6 w-6"
                />
                <span className="text-[11px] font-bold tracking-widest text-zinc-400">
                  BIBLIOTECA LENDÁRIA
                </span>
              </div>

              {/* Quote */}
              <div className="flex-1">
                <p className="font-serif text-lg leading-relaxed text-white/90">
                  "
                  {highlight.text.length > 220
                    ? `${highlight.text.slice(0, 220)}...`
                    : highlight.text}
                  "
                </p>
                {highlight.note && (
                  <p className="mt-4 border-l-2 border-brand-gold/30 pl-3 font-serif text-sm italic text-zinc-500">
                    {highlight.note.length > 100
                      ? `${highlight.note.slice(0, 100)}...`
                      : highlight.note}
                  </p>
                )}
              </div>

              {/* Book Info */}
              <div className="mt-4 flex items-center gap-3 border-t border-zinc-800/50 pt-4">
                {bookCover && (
                  <img src={bookCover} alt="" className="h-12 w-8 rounded object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{bookTitle}</p>
                  <p className="truncate text-xs text-zinc-500">{bookAuthor}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 gap-2" onClick={handleNativeShare}>
              <Icon name="share" size="size-4" />
              Compartilhar
            </Button>
            <Button
              className="h-12 gap-2 bg-brand-gold text-black hover:bg-brand-gold/90"
              onClick={handleDownloadImage}
              disabled={isGenerating}
            >
              <Icon name="download" size="size-4" />
              {isGenerating ? 'Gerando...' : 'Baixar Imagem'}
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Baixe a imagem para postar no Instagram, Twitter ou LinkedIn
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareImageModal;
