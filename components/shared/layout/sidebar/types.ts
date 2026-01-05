import type { Language } from '../../../../types';
import { Section } from '../../../../types';

export type { Section };

export interface SidebarProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  currentLanguage: Language;
  setLanguage: (l: Language) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
  isHidden?: boolean;
}

export interface NavItem {
  key: string;
  icon?: string;
  section?: Section;
  children?: NavItem[];
  badge?: string;
  status?: 'active' | 'soon' | 'beta';
  group?: 'user' | 'team'; // user = public, team = auth required
}

export interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

export interface NavItemRenderProps {
  item: NavItem;
  depth: number;
  isCollapsed: boolean;
  currentSection: Section;
  expandedMenus: string[];
  onToggleSubmenu: (key: string) => void;
  onSectionClick: (section: Section) => void;
  t: (key: string) => string;
  isSubmenuActive: (item: NavItem) => boolean;
}

export type TranslationDictionary = Record<Language, Record<string, string>>;
