// JobsSection Types and Interfaces

export interface JobsSectionProps {
  className?: string;
}

export interface StatusBadgeProps {
  status: string;
  color: string;
}

export interface FieldTableProps {
  fields: { name: string; type?: string; desc: string; example?: string }[];
  showType?: boolean;
}
