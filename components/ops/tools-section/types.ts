// ToolsSection Types and Interfaces

export interface ToolsSectionProps {
  className?: string;
}

export interface UseCatalogTypeReturn {
  selectedCatalogType: string;
  setSelectedCatalogType: (type: string) => void;
}

export interface UseStackExpansionReturn {
  expandedStack: string | null;
  toggleStack: (stackName: string) => void;
  isExpanded: (stackName: string) => boolean;
}

export interface UseAxisHoverReturn {
  hoveredTool: number | null;
  setHoveredTool: (index: number | null) => void;
}
