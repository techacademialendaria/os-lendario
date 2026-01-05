/**
 * Form Section - Design System Showcase
 *
 * This page demonstrates advanced form components from input primitives
 * to complex upload and verification components.
 *
 * Refactored: 407 -> ~50 lines (88% reduction)
 */

import React from 'react';
import {
  FormHeader,
  PrimitivesShowcase,
  ChatInputShowcase,
  CalendarShowcase,
  SecurityShowcase,
  MediaUploadShowcase,
  ValidationShowcase,
  GuidelinesShowcase,
} from './organisms';

export const FormSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <FormHeader />
      <PrimitivesShowcase />
      <ChatInputShowcase />
      <CalendarShowcase />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <SecurityShowcase />
        <MediaUploadShowcase />
        <ValidationShowcase />
      </div>

      <GuidelinesShowcase />
    </div>
  );
};

export default FormSection;
