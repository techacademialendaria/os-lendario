import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import type { ChatMessage as ChatMessageType } from '../../../../types/groups';

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {isUser ? (
          <Icon name="user" className="size-4" />
        ) : (
          <Icon name="robot" className="size-4" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground rounded-bl-md'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <span
          className={cn(
            'text-[10px] mt-1 block',
            isUser ? 'text-primary-foreground/60' : 'text-muted-foreground/60'
          )}
        >
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
}
