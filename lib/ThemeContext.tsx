import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved ? JSON.parse(saved) : true; // default to dark
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return true; // fallback to dark if parsing fails
    }
  });

  // Persist theme to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
