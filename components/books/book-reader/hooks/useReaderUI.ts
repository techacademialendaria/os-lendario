import { useState, useEffect, useRef, useCallback } from 'react';
import {
  THEME_STYLES,
  DEFAULT_READING_MODE,
  DEFAULT_FONT_SIZE,
  type ReadingMode,
} from '../../reader';
import type { UseReaderUIReturn } from '../types';

interface UseReaderUIOptions {
  bookSlug: string;
  loading: boolean;
}

export function useReaderUI({ bookSlug, loading }: UseReaderUIOptions): UseReaderUIReturn {
  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasRestoredScroll = useRef(false);
  const scrollThrottleRef = useRef(0);

  // Reading mode (paper/night/sepia) - persisted
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => {
    const saved = localStorage.getItem('book-reader-mode');
    return saved === 'paper' || saved === 'night' || saved === 'sepia' ? saved : DEFAULT_READING_MODE;
  });

  // Font size - persisted
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('book-reader-font-size-px');
    const parsed = saved ? parseInt(saved, 10) : DEFAULT_FONT_SIZE;
    return parsed >= 16 && parsed <= 36 ? parsed : DEFAULT_FONT_SIZE;
  });

  // Scroll & focus
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chapters');

  // Responsive
  const [isDesktop, setIsDesktop] = useState(false);

  // Get current theme
  const currentMode = THEME_STYLES[readingMode];

  // Persist reading mode
  useEffect(() => {
    localStorage.setItem('book-reader-mode', readingMode);
  }, [readingMode]);

  // Persist font size
  useEffect(() => {
    localStorage.setItem('book-reader-font-size-px', String(fontSize));
  }, [fontSize]);

  // Detect desktop
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Restore scroll position on mount
  useEffect(() => {
    if (!bookSlug || !contentRef.current || hasRestoredScroll.current) return;

    const savedPosition = localStorage.getItem(`book-scroll-${bookSlug}`);
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      if (!isNaN(position) && position > 0) {
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = position;
            hasRestoredScroll.current = true;
          }
        }, 100);
      }
    }
    hasRestoredScroll.current = true;
  }, [bookSlug, loading]);

  // Save scroll position periodically and on unmount
  useEffect(() => {
    if (!bookSlug) return;

    const savePosition = () => {
      if (contentRef.current && contentRef.current.scrollTop > 100) {
        localStorage.setItem(`book-scroll-${bookSlug}`, String(contentRef.current.scrollTop));
      }
    };

    const interval = setInterval(savePosition, 5000);

    return () => {
      clearInterval(interval);
      savePosition();
    };
  }, [bookSlug]);

  // Scroll handler
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const now = Date.now();
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    // Throttle: only update state every 100ms
    if (now - scrollThrottleRef.current < 100) {
      lastScrollY.current = scrollTop;
      return;
    }
    scrollThrottleRef.current = now;

    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(isNaN(progress) ? 0 : progress);

    // Dynamic Focus Mode
    const scrollDelta = scrollTop - lastScrollY.current;
    if (scrollTop > 100 && scrollDelta > 0) {
      setIsFocusMode(true);
    } else if (scrollTop < 50 || scrollDelta < -50) {
      setIsFocusMode(false);
    }
    lastScrollY.current = scrollTop;
  }, []);

  // Scroll to chapter
  const scrollToChapter = useCallback((slug: string) => {
    const element = document.getElementById(slug);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return {
    // Refs
    contentRef,
    articleRef,

    // Reading mode
    readingMode,
    setReadingMode,
    currentMode,

    // Font size
    fontSize,
    setFontSize,

    // Scroll
    scrollProgress,
    isFocusMode,
    handleScroll,
    scrollToChapter,

    // Sidebar
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,

    // Responsive
    isDesktop,
  };
}
