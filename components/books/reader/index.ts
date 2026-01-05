// Reader components - text selection and highlight functionality
export { TextSelectionToolbar } from './text-selection-toolbar';
export { SelectionPopover } from './SelectionPopover';
export {
  HighlightActions,
  HIGHLIGHT_COLORS,
  DEFAULT_HIGHLIGHT_COLOR,
  getHighlightStyles,
  type HighlightColor,
} from './HighlightActions';

// Reader UI components
export { ReaderHeader } from './ReaderHeader';
export { MobileReaderToolbar } from './MobileReaderToolbar';

// ReaderSidebar is now in books/reader-sidebar/
// import { ReaderSidebar } from '../reader-sidebar';

// Reader theme and constants
export {
  THEME_STYLES,
  DEFAULT_READING_MODE,
  DEFAULT_FONT_SIZE,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
  FONT_SIZE_STEP,
  COVER_GRADIENTS,
  getCoverGradient,
  type ReadingMode,
  type ThemeStyle,
} from './reader-theme';
