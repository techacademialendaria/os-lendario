import React from 'react';
import { cn } from '../../../../lib/utils';
import { MIND_PSYCHOMETRICS } from '../../data/minds-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import { Icon } from '../../../ui/icon';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';

interface PsychometricsViewProps {
  selectedTrait: string;
  onSelectTrait: (trait: string) => void;
  selectedTraitData: typeof MIND_PSYCHOMETRICS.bigFive[number] | undefined;
}

export const PsychometricsView: React.FC<PsychometricsViewProps> = ({
  selectedTrait,
  onSelectTrait,
  selectedTraitData
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={MIND_PSYCHOMETRICS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6 max-w-4xl">{MIND_PSYCHOMETRICS.description}</OpsText>

        {/* Big Five Traits */}
        <div className="flex flex-wrap gap-3 mb-8">
          {MIND_PSYCHOMETRICS.bigFive.map((trait) => (
            <button
              key={trait.trait}
              onClick={() => onSelectTrait(trait.trait)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedTrait === trait.trait
                  ? 'text-foreground shadow-sm scale-105'
                  : 'bg-muted/10 text-muted-foreground hover:bg-muted/20 hover:text-foreground'
              )}
              style={selectedTrait === trait.trait ? { backgroundColor: trait.color + '20', color: trait.color, border: `1px solid ${trait.color}` } : { border: '1px solid transparent' }}
            >
              <span className="font-bold opacity-70">{trait.abbrev}</span>
              <span>{trait.trait}</span>
            </button>
          ))}
        </div>

        {/* Selected Trait Detail */}
        {selectedTraitData && (
          <div className="p-6 rounded-xl bg-muted/5 border-l-4 shadow-sm animate-in fade-in zoom-in-95 duration-200" style={{ borderColor: selectedTraitData.color }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: selectedTraitData.color }}>{selectedTraitData.trait}</h4>
            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">{selectedTraitData.desc}</p>

            {/* Spectrum */}
            <div className="mb-6 p-4 rounded-lg bg-background/50 border border-border/10">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-muted-foreground w-24 text-right uppercase tracking-wider">{selectedTraitData.low}</span>
                <div className="flex-1 h-3 rounded-full relative bg-muted/20 overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${selectedTraitData.color})` }} />
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-background/40 to-transparent w-full h-full skew-x-12 opacity-30" />
                </div>
                <span className="text-xs font-bold text-muted-foreground w-24 uppercase tracking-wider">{selectedTraitData.high}</span>
              </div>
            </div>

            {/* Facets */}
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Facetas</span>
              <div className="flex flex-wrap gap-2">
                {selectedTraitData.facets.map((facet, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md font-medium border"
                    style={{
                      backgroundColor: selectedTraitData.color + '10',
                      color: selectedTraitData.color,
                      borderColor: selectedTraitData.color + '20'
                    }}
                  >
                    {facet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Example Profile */}
        <div className="mt-8 p-6 rounded-xl bg-muted/5 border border-border/10">
          <h5 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: OPS_ACCENT }}>
            <Icon name="user" size="size-4" />
            Exemplo: {MIND_PSYCHOMETRICS.exampleProfile.mind}
          </h5>

          <div className="grid grid-cols-5 gap-4 mb-4">
            {MIND_PSYCHOMETRICS.bigFive.map((trait, i) => {
              const score = MIND_PSYCHOMETRICS.exampleProfile.scores[trait.trait.toLowerCase() as keyof typeof MIND_PSYCHOMETRICS.exampleProfile.scores]?.score || 0;
              return (
                <div key={i} className="text-center group">
                  <div className="w-full h-24 rounded-lg bg-muted/20 relative overflow-hidden mb-2">
                    <div
                      className="absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out group-hover:opacity-90"
                      style={{ height: `${score}%`, backgroundColor: trait.color }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white drop-shadow-md z-10">
                      {score}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{trait.abbrev}</span>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-muted-foreground italic leading-relaxed border-t border-border/10 pt-4 mt-4">
            "{MIND_PSYCHOMETRICS.exampleProfile.interpretation}"
          </p>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
