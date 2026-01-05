import { useState, useEffect, useCallback } from 'react';
import type { Section } from '../../../../../types';
import type { NavItem } from '../types';
import { navStructure, designSystemSections } from '../data';

interface UseSidebarNavigationProps {
  currentSection: Section;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export function useSidebarNavigation({
  currentSection,
  isCollapsed,
  toggleCollapse,
}: UseSidebarNavigationProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Find parent keys for auto-expand
  const findParentKeys = useCallback(
    (items: NavItem[], targetSection: Section, parentKeys: string[] = []): string[] | null => {
      for (const item of items) {
        if (item.section === targetSection) {
          return parentKeys;
        }
        if (item.children) {
          const result = findParentKeys(item.children, targetSection, [...parentKeys, item.key]);
          if (result) return result;
        }
      }
      return null;
    },
    []
  );

  // Auto-expand parent menus based on current section
  useEffect(() => {
    const parentKeys = findParentKeys(navStructure, currentSection);
    if (parentKeys && parentKeys.length > 0) {
      setExpandedMenus((prev) => {
        const newExpanded = [...prev];
        parentKeys.forEach((key) => {
          if (!newExpanded.includes(key)) {
            newExpanded.push(key);
          }
        });
        return newExpanded;
      });
    }
  }, [currentSection, findParentKeys]);

  const toggleSubmenu = useCallback(
    (key: string) => {
      if (isCollapsed) {
        toggleCollapse();
        setExpandedMenus((prev) => [...prev, key]);
      } else {
        setExpandedMenus((prev) =>
          prev.includes(key) ? prev.filter((l) => l !== key) : [...prev, key]
        );
      }
    },
    [isCollapsed, toggleCollapse]
  );

  const isSubmenuActive = useCallback(
    (item: NavItem): boolean => {
      if (item.section === currentSection) return true;

      // Studio-level checks for section prefixes
      if (item.key === 'studio_sales' && currentSection.startsWith('template_sales')) return true;
      if (item.key === 'studio_clone' && currentSection.startsWith('app_minds')) return true;
      if (
        item.key === 'studio_learn' &&
        (currentSection.startsWith('app_creator') || currentSection.startsWith('app_lms'))
      )
        return true;
      if (item.key === 'studio_ops' && currentSection.startsWith('studio_prd')) return true;
      if (
        item.key === 'studio_brand' &&
        (currentSection.startsWith('template_') || designSystemSections.includes(currentSection))
      )
        return true;

      if (item.children) {
        return item.children.some((child) => isSubmenuActive(child));
      }

      return false;
    },
    [currentSection]
  );

  const isExpanded = useCallback(
    (key: string) => expandedMenus.includes(key),
    [expandedMenus]
  );

  return {
    expandedMenus,
    toggleSubmenu,
    isSubmenuActive,
    isExpanded,
  };
}
