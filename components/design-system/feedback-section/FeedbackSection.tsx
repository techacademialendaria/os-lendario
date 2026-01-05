import React from 'react';
import {
  FeedbackHeader,
  CommandPaletteSection,
  SheetSection,
  PopoverSection,
  ModalGallerySection,
  ToastSection,
  TooltipSection,
} from './organisms';

const FeedbackSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <FeedbackHeader />
      <CommandPaletteSection />
      <SheetSection />
      <PopoverSection />
      <ModalGallerySection />
      <ToastSection />
      <TooltipSection />
    </div>
  );
};

export default FeedbackSection;
