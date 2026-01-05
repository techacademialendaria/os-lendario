import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../ops-ui';

export const PracticalApplicationView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Aplicacao Pratica" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="font-bold text-sm text-blue-600 mb-2">Exemplo: Decisao de Carreira</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">1. Mapa vs Territorio:</span> A descricao
                do trabalho nao e o trabalho real. Converse com pessoas que fazem.
              </p>
              <p>
                <span className="font-medium text-foreground">2. Circulo de Competencia:</span> Voce e
                bom nessa area? Ser honesto reduz riscos.
              </p>
              <p>
                <span className="font-medium text-foreground">3. Trade-offs:</span> Salario maior significa
                menos tempo livre? Qual e o preco real?
              </p>
              <p>
                <span className="font-medium text-foreground">4. Incentivos:</span> O que motiva essa
                empresa? Seus incentivos alinham com os deles?
              </p>
              <p>
                <span className="font-medium text-foreground">5. Margem de Seguranca:</span> Voce tem
                poupanca para arriscar? Qual e seu pior cenario?
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-bold text-sm text-green-600 mb-2">Exemplo: Entender Mercados</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">1. Oferta & Demanda:</span> Produto novo
                com alta demanda = precos altos no inicio.
              </p>
              <p>
                <span className="font-medium text-foreground">2. Pensamento de Primeiros Principios:</span>
                Por que as pessoas realmente querem isso? O que e a necessidade fundamental?
              </p>
              <p>
                <span className="font-medium text-foreground">3. Loops de Feedback:</span> Mais users
                criam mais valor (rede) = crescimento exponencial.
              </p>
            </div>
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
