import React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { OPS_ACCENT, OPS_CARD_CLASSES } from './ops-tokens';

/**
 * OPS UI SYSTEM
 * Centralized components to ensure consistency, theme support, and ease of maintenance.
 * Addresses "Decompressed" layout standards and "Light Mode" compatibility.
 */

// --- Layout Components ---

export const OpsPage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn("space-y-8 animate-in fade-in duration-300", className)} {...props}>
            {children}
        </div>
    );
};

export const OpsSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn("space-y-6", className)} {...props}>
            {children}
        </div>
    );
};

export const OpsGrid: React.FC<React.HTMLAttributes<HTMLDivElement> & { columns?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
    className,
    children,
    columns = 2,
    ...props
}) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
        6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    };

    return (
        <div className={cn("grid gap-6", gridCols[columns], className)} {...props}>
            {children}
        </div>
    );
};

// --- Card Components ---

interface OpsCardProps extends React.HTMLAttributes<HTMLDivElement> {
    accentColor?: string;
    variant?: 'default' | 'highlight' | 'feature';
}

export const OpsCard: React.FC<OpsCardProps> = ({
    className,
    children,
    accentColor,
    variant = 'default',
    style,
    ...props
}) => {
    const highlightStyles = variant === 'highlight' ? "border-l-4 shadow-sm" : "";
    const featureStyles = variant === 'feature' ? "border shadow-md" : "";

    return (
        <Card
            className={cn(OPS_CARD_CLASSES, highlightStyles, featureStyles, className)}
            style={{
                ...(accentColor ? { borderColor: accentColor } : {}),
                ...style
            }}
            {...props}
        >
            {children}
        </Card>
    );
};

export const OpsCardHeader: React.FC<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & { title: React.ReactNode; accentColor?: string }> = ({
    className,
    title,
    accentColor = OPS_ACCENT,
    children,
    ...props
}) => {
    return (
        <CardHeader className={cn("border-b border-border/40 pb-4", className)} {...props}>
            <CardTitle
                className="text-sm font-bold uppercase tracking-widest flex items-center justify-between"
                style={{ color: accentColor }}
            >
                <span>{title}</span>
                {children}
            </CardTitle>
        </CardHeader>
    );
};

export const OpsCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <CardContent className={cn("pt-6", className)} {...props}>
            {children}
        </CardContent>
    );
};

// --- Typography & Details ---

export const OpsLabel: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, children, ...props }) => {
    return (
        <span className={cn("text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1", className)} {...props}>
            {children}
        </span>
    );
};

export const OpsText: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => {
    return (
        <p className={cn("text-sm md:text-base text-muted-foreground leading-relaxed", className)} {...props}>
            {children}
        </p>
    );
};

export const OpsCode: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, children, ...props }) => {
    return (
        <code className={cn("text-xs md:text-sm font-bold font-mono bg-muted/40 text-foreground px-1.5 py-0.5 rounded border border-border/20", className)} {...props}>
            {children}
        </code>
    );
};

// --- Data Visualization Wrappers ---

export const OpsBadge: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'outline' | 'success' | 'warning' | 'error' | 'info' }> = ({
    className,
    children,
    variant = 'default',
    ...props
}) => {
    const variants = {
        default: "bg-muted text-muted-foreground border-transparent",
        outline: "bg-transparent border-border text-muted-foreground",
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        error: "bg-red-500/10 text-red-500 border-red-500/20",
        info: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    };

    return (
        <div className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border transition-colors", variants[variant], className)} {...props}>
            {children}
        </div>
    );
};

export const OpsProgressBar: React.FC<{ value: number; max?: number; color?: string; label?: string; showValue?: boolean; className?: string }> = ({
    value,
    max = 100,
    color = OPS_ACCENT,
    label,
    showValue = true,
    className
}) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={cn("space-y-1.5 w-full", className)}>
            {(label || showValue) && (
                <div className="flex justify-between items-end">
                    {label && <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>}
                    {showValue && <span className="text-[10px] font-mono font-bold" style={{ color }}>{value}/{max}</span>}
                </div>
            )}
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden border border-border/10 relative">
                <div
                    className="h-full rounded-full transition-all duration-500 ease-in-out"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}20`
                    }}
                />
            </div>
        </div>
    );
};

export const OpsKeyValue: React.FC<{ label: string; value: React.ReactNode; vertical?: boolean; className?: string }> = ({
    label,
    value,
    vertical = false,
    className
}) => {
    if (vertical) {
        return (
            <div className={cn("flex flex-col", className)}>
                <OpsLabel>{label}</OpsLabel>
                <div className="text-sm font-medium">{value}</div>
            </div>
        );
    }
    return (
        <div className={cn("flex items-center justify-between gap-4 py-1", className)}>
            <span className="text-sm text-muted-foreground">{label}</span>
            <div className="text-sm font-medium">{value}</div>
        </div>
    );
};
