import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('ThemeProvider', () => {
    it('should render children', () => {
      render(
        <ThemeProvider>
          <div>Test Child</div>
        </ThemeProvider>
      );
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('should provide initial dark theme as true', () => {
      const TestComponent = () => {
        const { isDark } = useTheme();
        return <div>{isDark ? 'dark' : 'light'}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      expect(screen.getByText('dark')).toBeInTheDocument();
    });

    it('should load theme from localStorage on mount', () => {
      localStorage.setItem('theme', JSON.stringify(false));

      const TestComponent = () => {
        const { isDark } = useTheme();
        return <div>{isDark ? 'dark' : 'light'}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      expect(screen.getByText('light')).toBeInTheDocument();
    });

    it('should save theme to localStorage when changed', () => {
      const TestComponent = () => {
        const { isDark, setIsDark } = useTheme();
        return (
          <div>
            <span>{isDark ? 'dark' : 'light'}</span>
            <button onClick={() => setIsDark(!isDark)}>Toggle</button>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: 'Toggle' });
      fireEvent.click(button);

      expect(localStorage.getItem('theme')).toBe('false');
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      const TestComponent = () => {
        useTheme();
        return null;
      };

      // Suppress console.error for this test
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<TestComponent />)).toThrow(
        'useTheme must be used within ThemeProvider'
      );

      spy.mockRestore();
    });

    it('should toggle theme correctly', () => {
      const TestComponent = () => {
        const { isDark, setIsDark } = useTheme();
        return (
          <div>
            <span>{isDark ? 'dark' : 'light'}</span>
            <button onClick={() => setIsDark(!isDark)}>Toggle</button>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByText('dark')).toBeInTheDocument();

      const button = screen.getByRole('button', { name: 'Toggle' });
      fireEvent.click(button);

      expect(screen.getByText('light')).toBeInTheDocument();
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage.getItem to throw error
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const TestComponent = () => {
        const { isDark } = useTheme();
        return <div>{isDark ? 'dark' : 'light'}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Should fallback to dark theme
      expect(screen.getByText('dark')).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalled();

      getItemSpy.mockRestore();
      consoleSpy.mockRestore();
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      localStorage.setItem('theme', 'invalid-json');

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const TestComponent = () => {
        const { isDark } = useTheme();
        return <div>{isDark ? 'dark' : 'light'}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Should fallback to dark theme
      expect(screen.getByText('dark')).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('localStorage persistence', () => {
    it('should persist multiple theme changes', () => {
      const TestComponent = () => {
        const { isDark, setIsDark } = useTheme();
        return (
          <div>
            <span>{isDark ? 'dark' : 'light'}</span>
            <button onClick={() => setIsDark(!isDark)}>Toggle</button>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: 'Toggle' });

      // Toggle to light
      fireEvent.click(button);
      expect(localStorage.getItem('theme')).toBe('false');

      // Toggle back to dark
      fireEvent.click(button);
      expect(localStorage.getItem('theme')).toBe('true');
    });

    it('should maintain theme across re-renders', () => {
      const TestComponent = () => {
        const [count, setCount] = React.useState(0);
        const { isDark, setIsDark } = useTheme();

        return (
          <div>
            <span>{isDark ? 'dark' : 'light'}</span>
            <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <span>Count: {count}</span>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByRole('button', { name: 'Toggle Theme' });
      const incrementButton = screen.getByRole('button', { name: 'Increment' });

      // Toggle theme
      fireEvent.click(toggleButton);
      expect(screen.getByText('light')).toBeInTheDocument();

      // Re-render with count change
      fireEvent.click(incrementButton);
      expect(screen.getByText('Count: 1')).toBeInTheDocument();

      // Theme should still be light
      expect(screen.getByText('light')).toBeInTheDocument();
    });
  });
});
