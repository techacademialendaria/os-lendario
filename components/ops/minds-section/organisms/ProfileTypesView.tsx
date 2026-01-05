import React from 'react';
import { cn } from '../../../../lib/utils';
import { MIND_PROFILES_DETAIL } from '../../data/minds-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText
} from '../../ops-ui';

interface ProfileTypesViewProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  selectedProfile: typeof MIND_PROFILES_DETAIL.types[number] | undefined;
}

export const ProfileTypesView: React.FC<ProfileTypesViewProps> = ({
  selectedType,
  onSelectType,
  selectedProfile
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={MIND_PROFILES_DETAIL.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6">{MIND_PROFILES_DETAIL.description}</OpsText>

        {/* Type Selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {MIND_PROFILES_DETAIL.types.map((type) => (
            <button
              key={type.type}
              onClick={() => onSelectType(type.type)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                selectedType === type.type
                  ? 'text-foreground border-transparent shadow-sm scale-105'
                  : 'bg-muted/10 text-muted-foreground border-transparent hover:bg-muted/20 hover:text-foreground'
              )}
              style={selectedType === type.type ? { backgroundColor: type.color + '20', color: type.color, borderColor: type.color } : {}}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Selected Profile Detail */}
        {selectedProfile && (
          <div className="p-6 rounded-xl bg-muted/5 border-l-4 shadow-sm" style={{ borderColor: selectedProfile.color }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: selectedProfile.color }}>{selectedProfile.name}</h4>
            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed max-w-3xl">{selectedProfile.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-background/50 border border-border/10">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Formato</span>
                <span className="text-sm text-foreground">{selectedProfile.format}</span>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border/10">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Caso de Uso</span>
                <span className="text-sm text-foreground">{selectedProfile.useCase}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-border/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: selectedProfile.color }}></div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Exemplo</span>
              <span className="text-sm italic block pl-2" style={{ color: selectedProfile.color, fontFamily: 'serif' }}>"{selectedProfile.example}"</span>
            </div>
          </div>
        )}

        {/* Storage Formats */}
        <div className="mt-8 pt-6 border-t border-border/10">
          <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Formatos de Armazenamento</h5>
          <OpsGrid columns={3}>
            {MIND_PROFILES_DETAIL.storageFormats.map((fmt, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/5 border border-border/10 transition-colors hover:border-border/20">
                <code className="text-sm font-bold block mb-2" style={{ color: OPS_ACCENT }}>{fmt.format}</code>
                <div className="text-xs text-muted-foreground mb-3 leading-relaxed">{fmt.description}</div>
                <span className="text-[10px] font-mono bg-muted/20 px-1.5 py-0.5 rounded" style={{ color: OPS_PRIMARY }}>col: {fmt.column}</span>
              </div>
            ))}
          </OpsGrid>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
