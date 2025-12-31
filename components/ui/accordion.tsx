import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';

interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
  defaultValue?: string | string[];
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

// Context to manage state
const AccordionContext = React.createContext<{
  openItems: string[];
  toggleItem: (value: string) => void;
}>({ openItems: [], toggleItem: () => {} });

const AccordionItemContext = React.createContext<{ value: string }>({ value: '' });

const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  collapsible = true,
  children,
  className,
  defaultValue,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = (value: string) => {
    if (type === 'single') {
      if (openItems.includes(value)) {
        if (collapsible) setOpenItems([]);
      } else {
        setOpenItems([value]);
      }
    } else {
      // Multiple
      if (openItems.includes(value)) {
        setOpenItems(openItems.filter((i) => i !== value));
      } else {
        setOpenItems([...openItems, value]);
      }
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-1', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ value, children, className }) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn('border-b border-border', className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className }) => {
  const { openItems, toggleItem } = React.useContext(AccordionContext);
  const { value } = React.useContext(AccordionItemContext);
  const isOpen = openItems.includes(value);

  return (
    <button
      onClick={() => toggleItem(value)}
      className={cn(
        'flex w-full flex-1 items-center justify-between py-4 text-left font-sans font-medium transition-all hover:text-primary',
        isOpen ? 'text-primary' : 'text-foreground',
        className
      )}
    >
      {children}
      <Icon
        name="angle-small-down"
        className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
};

const AccordionContent: React.FC<AccordionContentProps> = ({ children, className }) => {
  const { openItems } = React.useContext(AccordionContext);
  const { value } = React.useContext(AccordionItemContext);
  const isOpen = openItems.includes(value);

  return (
    <div
      className={cn(
        'overflow-hidden text-sm transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className={cn('font-sans font-medium text-muted-foreground', className)}>{children}</div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
