/**
 * Templates Section Types
 * Types and interfaces for the templates showcase
 */

// Chat message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

// Chat history item
export interface ChatHistoryItem {
  id: string;
  title: string;
  isActive?: boolean;
}

// Chat history group (by date)
export interface ChatHistoryGroup {
  label: string;
  items: ChatHistoryItem[];
}

// User profile for sidebar
export interface UserProfile {
  name: string;
  initials: string;
  plan: string;
}
