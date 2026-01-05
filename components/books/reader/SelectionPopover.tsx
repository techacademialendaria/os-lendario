import React from 'react';

// ============================================================================
// Types
// ============================================================================

interface Position {
  x: number;
  y: number;
}

interface SelectionPopoverProps {
  position: Position;
  showArrow?: boolean;
  children: React.ReactNode;
}

// ============================================================================
// Component
// ============================================================================

/**
 * SelectionPopover - Positioned popover that appears above text selection
 *
 * Features:
 * - Glass morphism styling
 * - Centered above selection point
 * - Optional arrow pointer
 * - Fade-in animation
 */
export const SelectionPopover: React.FC<SelectionPopoverProps> = ({
  position,
  showArrow = true,
  children,
}) => {
  return (
    <div
      className="absolute z-50 animate-fade-in"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}

      {/* Arrow pointer - Premium */}
      {showArrow && (
        <div
          className="absolute left-1/2 h-0 w-0 -translate-x-1/2"
          style={{
            bottom: '-7px',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid rgba(24, 24, 27, 0.95)', // zinc-900/95
          }}
        />
      )}
    </div>
  );
};

export default SelectionPopover;
