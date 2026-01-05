import React from 'react';
import {
  HeroSection,
  DiagnosisSection,
  StatsSection,
  AuthoritySection,
  ModulesSection,
  ToolsSection,
  PricingSection,
  FaqSection,
  MobileFooterCTA,
} from './organisms';

const CommunitySalesTemplate: React.FC = () => (
  <div className="w-full animate-fade-in bg-background pb-20 font-sans selection:bg-primary/30">
    <HeroSection />
    <DiagnosisSection />
    <StatsSection />
    <AuthoritySection />
    <ModulesSection />
    <ToolsSection />
    <PricingSection />
    <FaqSection />
    <MobileFooterCTA />
  </div>
);

export default CommunitySalesTemplate;
