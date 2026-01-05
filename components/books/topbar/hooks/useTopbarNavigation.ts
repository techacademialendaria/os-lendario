import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Section } from '@/types';
import type { NavItem } from '../types';

interface UseTopbarNavigationOptions {
  setSection: (section: Section) => void;
}

interface UseTopbarNavigationResult {
  isHighlightsPage: boolean;
  isMenuOpen: boolean;
  isAuthenticated: boolean;
  user: ReturnType<typeof useAuth>['user'];
  handleNavClick: (item: NavItem) => void;
  handleLogout: () => Promise<void>;
  setIsMenuOpen: (open: boolean) => void;
  navigateTo: (path: string) => void;
}

export function useTopbarNavigation(options: UseTopbarNavigationOptions): UseTopbarNavigationResult {
  const { setSection } = options;
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we're on a highlights page (should highlight "Meus Livros")
  const isHighlightsPage = location.pathname.includes('/highlights');

  // Handle navigation click
  const handleNavClick = useCallback((item: NavItem) => {
    setSection(item.section);
    setIsMenuOpen(false);
    navigate(item.path);
  }, [setSection, navigate]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    await signOut();
    navigate('/books');
  }, [signOut, navigate]);

  // Navigate to path
  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return {
    isHighlightsPage,
    isMenuOpen,
    isAuthenticated,
    user,
    handleNavClick,
    handleLogout,
    setIsMenuOpen,
    navigateTo,
  };
}
