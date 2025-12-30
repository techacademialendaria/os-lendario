import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '../../../ui/sheet';
import { Button } from '../../../ui/button';
import { ScrollArea } from '../../../ui/scroll-area';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import type { ChatMessage as ChatMessageType } from '../../../../types/groups';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestedQuestions } from './SuggestedQuestions';
import { sendChatMessage, isChatServiceConfigured } from '../../../../services/groupsChatService';

interface GroupsChatPanelProps {
  groupName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GroupsChatPanel({ groupName, isOpen, onOpenChange }: GroupsChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check if service is configured
  useEffect(() => {
    setIsConfigured(isChatServiceConfigured());
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset messages when group changes
  useEffect(() => {
    setMessages([]);
  }, [groupName]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Call real chat service
      const response = await sendChatMessage({
        grupo: groupName,
        query: content,
        history,
      });

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro no chat:', error);
      const errorMessage: ChatMessageType = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="magic-wand" className="size-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-base font-semibold">
                  Insights IA
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {groupName}
                </SheetDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                'text-[10px]',
                isConfigured
                  ? 'bg-green-500/10 text-green-600 border-green-500/30'
                  : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
              )}
            >
              {isConfigured ? (
                <>
                  <Icon name="bolt" className="size-3 mr-1" />
                  Haiku
                </>
              ) : (
                <>
                  <Icon name="warning-triangle" className="size-3 mr-1" />
                  Offline
                </>
              )}
            </Badge>
          </div>
        </SheetHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="py-4 space-y-4">
            {!isConfigured ? (
              <div className="text-center py-8 space-y-3">
                <Icon name="warning-triangle" className="size-12 text-amber-500 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  API não configurada. Adicione VITE_ANTHROPIC_API_KEY no .env
                </p>
              </div>
            ) : messages.length === 0 ? (
              <SuggestedQuestions
                groupName={groupName}
                onSelectQuestion={handleSelectQuestion}
              />
            ) : (
              <>
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    index={index}
                  />
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon name="magic-wand" className="size-4 text-primary animate-pulse" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                        <span
                          className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <span
                          className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="px-4 py-4 border-t border-border bg-background">
          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            disabled={!isConfigured}
            placeholder={
              isConfigured
                ? `Perguntar sobre ${groupName}...`
                : 'Configure a API para usar o chat'
            }
          />
          <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
            {isConfigured
              ? 'Powered by Claude Haiku'
              : 'VITE_ANTHROPIC_API_KEY não encontrada'}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Floating trigger button component
interface ChatTriggerButtonProps {
  onClick: () => void;
  hasMessages?: boolean;
}

export function ChatTriggerButton({ onClick, hasMessages }: ChatTriggerButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="sm"
      className={cn(
        'gap-2 rounded-xl',
        'bg-primary hover:bg-primary/90',
        'transition-all duration-200'
      )}
    >
      <Icon name="magic-wand" className="size-4" />
      Perguntar à IA
      {hasMessages && (
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
      )}
    </Button>
  );
}
