import React from 'react';
import { Icon } from '../../../ui/icon';
import { OPS_ACCENT } from '../../ops-tokens';
import { OpsCard, OpsCardContent, OpsCode } from '../../ops-ui';

export const KeyTakeawayCard: React.FC = () => (
  <OpsCard variant="highlight">
    <OpsCardContent>
      <div
        className="p-4 rounded-lg border-l-4"
        style={{ borderColor: OPS_ACCENT, backgroundColor: 'rgba(201, 178, 152, 0.05)' }}
      >
        <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>Key Takeaway</h4>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <TakeawayItem>
            Livros sao armazenados em <OpsCode>contents</OpsCode> com <OpsCode>content_type=book_summary</OpsCode>
          </TakeawayItem>
          <TakeawayItem>
            Autores sao vinculados via <OpsCode>content_minds</OpsCode> com <OpsCode>role=author</OpsCode>
          </TakeawayItem>
          <TakeawayItem>
            Categorias usam <OpsCode>tags</OpsCode> com <OpsCode>tag_type=book_category</OpsCode>
          </TakeawayItem>
          <TakeawayItem>
            Interacoes (favoritos, lidos) em <OpsCode>mind_content_interactions</OpsCode>
          </TakeawayItem>
          <TakeawayItem>
            Pipeline adaptativo: metadata informa cada fase para output personalizado
          </TakeawayItem>
        </ul>
      </div>
    </OpsCardContent>
  </OpsCard>
);

interface TakeawayItemProps {
  children: React.ReactNode;
}

const TakeawayItem: React.FC<TakeawayItemProps> = ({ children }) => (
  <li className="flex items-start gap-2">
    <Icon name="check" size="size-3" className="mt-0.5 text-emerald-400" />
    <span>{children}</span>
  </li>
);
