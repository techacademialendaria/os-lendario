import { motion } from 'framer-motion';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';

interface SuggestedQuestionsProps {
  groupName: string;
  onSelectQuestion: (question: string) => void;
}

const SUGGESTED_QUESTIONS = [
  'Quais as principais dúvidas dos alunos essa semana?',
  'Resuma as discussões dos últimos 3 dias',
  'Houve alguma reclamação recente?',
  'Quem foram os participantes mais ativos?',
  'Qual o sentimento geral do grupo?',
];

export function SuggestedQuestions({
  groupName,
  onSelectQuestion,
}: SuggestedQuestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
          <Icon name="magic-wand" className="size-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Pergunte sobre {groupName}
        </h3>
        <p className="text-sm text-muted-foreground">
          Use IA para explorar insights do grupo
        </p>
      </div>

      {/* Suggestions */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Sugestões
        </p>
        <div className="space-y-2">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <motion.div
              key={question}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4 rounded-xl text-sm font-normal hover:bg-primary/5 hover:border-primary/30 transition-all"
                onClick={() => onSelectQuestion(question)}
              >
                {question}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground/60">
          RAG em desenvolvimento. Respostas baseadas em dados históricos.
        </p>
      </div>
    </motion.div>
  );
}
