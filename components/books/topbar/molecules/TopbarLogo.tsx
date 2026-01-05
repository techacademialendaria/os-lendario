import React from 'react';

interface TopbarLogoProps {
  onNavigate: () => void;
}

export const TopbarLogo: React.FC<TopbarLogoProps> = ({ onNavigate }) => {
  return (
    <button
      onClick={onNavigate}
      className="group flex items-center gap-3"
    >
      <img
        src="/logo-academialendaria.svg"
        alt="Academia Lendaria"
        className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">
        Lendar[IA]
      </span>
    </button>
  );
};
