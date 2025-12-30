import { useState, useRef, useEffect } from 'react';
import { Button } from '../../../ui/button';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  isLoading = false,
  disabled = false,
  placeholder = 'Digite sua pergunta...',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && !isLoading && !disabled) {
      onSend(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={cn(
            'w-full min-h-[44px] max-h-[120px] resize-none rounded-xl px-4 py-3 pr-12',
            'bg-muted/50 border border-border',
            'focus:bg-background focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20',
            'placeholder:text-muted-foreground/50',
            'text-sm',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          rows={1}
        />
      </div>
      <Button
        size="icon"
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading || disabled}
        className={cn(
          'h-11 w-11 rounded-xl flex-shrink-0',
          'transition-all duration-200'
        )}
      >
        {isLoading ? (
          <Icon name="refresh" className="size-4 animate-spin" />
        ) : (
          <Icon name="paper-plane" className="size-4" />
        )}
      </Button>
    </div>
  );
}
