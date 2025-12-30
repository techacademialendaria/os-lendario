import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../ui/icon';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export interface ModuleTopbarNavItem {
  label: string;
  icon: string;
  section?: string;
  path?: string;
  disabled?: boolean;
}

export interface ModuleTopbarProps {
  title: string;
  subtitle?: string;
  icon: string;
  navItems: ModuleTopbarNavItem[];
  currentSection: string;
  setSection: (section: string) => void;
  primaryColor: string;
  accentColor?: string;
  brandColor?: string;
  actionButton?: {
    label: string;
    icon: string;
    onClick: () => void;
    show?: boolean;
  };
  variant?: 'centered' | 'left'; // centered: nav in middle, left: nav on left with brand
}

const ModuleTopbar: React.FC<ModuleTopbarProps> = ({
  title,
  subtitle,
  icon,
  navItems,
  currentSection,
  setSection,
  primaryColor,
  accentColor,
  brandColor,
  actionButton,
  variant = 'left',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: ModuleTopbarNavItem) => {
    if (item.section) {
      setSection(item.section);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const effectiveAccentColor = accentColor || primaryColor;
  const effectiveBrandColor = brandColor || primaryColor;

  const isThemePrimary = effectiveBrandColor.includes('var(--primary-color)');
  const isThemeAccent = effectiveAccentColor.includes('var(--accent-color)');

  if (variant === 'centered') {
    // CENTERED VARIANT: Brand left, Nav centered, Actions right
    return (
      <header className="sticky top-0 z-50 h-16 border-b border-border/50 bg-[#0A0A0F]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-12">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border",
                isThemeAccent && "bg-studio-accent/20 border-studio-primary/30 text-studio-primary",
                !isThemeAccent && isThemePrimary && "bg-studio-primary/20 border-studio-primary/30 text-studio-primary"
              )}
              style={!isThemeAccent && !isThemePrimary ? {
                backgroundColor: effectiveAccentColor,
                borderColor: `${effectiveBrandColor}30`,
                color: effectiveBrandColor,
              } : {}}
            >
              <Icon name={icon} size="size-5" />
            </div>
            <div>
              <h1
                className={cn("text-sm font-bold leading-none tracking-tight", isThemeAccent && "text-studio-accent")}
                style={!isThemeAccent ? { color: effectiveAccentColor } : {}}
              >
                {title} <span className={isThemePrimary ? "text-studio-primary" : ""} style={!isThemePrimary ? { color: effectiveBrandColor } : {}}>Studio</span>
              </h1>
              {subtitle && (
                <p className="mt-0.5 text-[10px] text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden items-center md:flex">
            <div
              className={cn(
                "flex items-center rounded-xl border p-1.5",
                isThemePrimary ? "bg-studio-primary/10 border-studio-primary/30" : ""
              )}
              style={!isThemePrimary ? {
                backgroundColor: `${effectiveBrandColor}10`,
                borderColor: `${effectiveBrandColor}30`,
              } : {}}
            >
              {navItems.map((item, index) => {
                const isActive =
                  currentSection === item.section || location.pathname.startsWith(item.path || '');
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleNavClick(item)}
                    disabled={!item.section || item.disabled}
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 h-auto',
                      isActive ? 'bg-background shadow-sm' : isThemePrimary ? 'hover:bg-studio-primary/20' : 'hover:bg-studio-primary/20',
                      (!item.section || item.disabled) && 'cursor-not-allowed opacity-50'
                    )}
                    style={{ color: isThemePrimary ? 'hsl(var(--primary-color))' : effectiveBrandColor }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {actionButton && actionButton.show !== false && (
              <Button
                onClick={actionButton.onClick}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 h-auto",
                  isThemePrimary && "bg-studio-primary shadow-[0_10px_15px_-3px_rgba(var(--primary-color-rgb),0.3)]"
                )}
                style={!isThemePrimary ? {
                  backgroundColor: effectiveBrandColor,
                  boxShadow: `0 10px 15px -3px ${effectiveBrandColor}30`,
                } : {}}
              >
                <Icon name={actionButton.icon} size="size-4" />
                <span className="hidden sm:inline">{actionButton.label}</span>
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  }

  // LEFT VARIANT: Brand + Nav left, Actions right
  return (
    <div className="sticky top-0 z-40 h-16 w-full border-b border-border bg-card font-sans shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border font-bold shadow-[0_0_10px_rgba(255,255,255,0.1)]",
                isThemePrimary && "bg-studio-primary/20 border-studio-primary/50 text-studio-primary"
              )}
              style={!isThemePrimary ? {
                backgroundColor: `${effectiveBrandColor}20`,
                borderColor: `${effectiveBrandColor}50`,
                color: effectiveBrandColor,
              } : {}}
            >
              <Icon name={icon} size="size-5" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold leading-none tracking-tight">{title}</h1>
              {subtitle && (
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => {
              const isActive = currentSection === item.section;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  disabled={!item.section || item.disabled}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 h-auto',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    (!item.section || item.disabled) && 'cursor-not-allowed opacity-50'
                  )}
                  style={{
                    backgroundColor: isActive ? (isThemePrimary ? 'hsl(var(--primary-color) / 0.1)' : `${effectiveBrandColor}10`) : undefined,
                    color: isActive ? (isThemePrimary ? 'hsl(var(--primary-color))' : effectiveBrandColor) : undefined,
                  }}
                >
                  <Icon name={item.icon} size="size-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {actionButton && actionButton.show !== false && (
            <Button
              variant="ghost"
              onClick={actionButton.onClick}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors h-auto"
              style={{
                color: isThemePrimary ? 'hsl(var(--primary-color))' : effectiveBrandColor,
              }}
            >
              <Icon name={actionButton.icon} size="size-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-md text-muted-foreground transition-colors hover:text-foreground h-9 w-9"
            style={{
              color: 'currentColor',
            }}
          >
            <Icon name="bell" size="size-5" />
            <span
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: isThemePrimary ? 'hsl(var(--primary-color))' : effectiveBrandColor }}
            ></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleTopbar;
