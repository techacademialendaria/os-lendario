import React from 'react';

interface BookBackdropProps {
  coverUrl?: string | null;
}

export const BookBackdrop: React.FC<BookBackdropProps> = ({ coverUrl }) => {
  if (!coverUrl) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] bg-cover bg-center opacity-[0.08] blur-[100px] scale-125"
        style={{ backgroundImage: `url(${coverUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
    </div>
  );
};
