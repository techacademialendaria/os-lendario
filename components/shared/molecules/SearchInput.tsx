import React from 'react';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  iconName?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className,
  iconName = 'search',
  autoFocus = false,
  disabled = false,
}) => {
  return (
    <div className={`relative flex-1 ${className || ''}`}>
      <Icon
        name={iconName}
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        autoFocus={autoFocus}
        disabled={disabled}
      />
    </div>
  );
};
