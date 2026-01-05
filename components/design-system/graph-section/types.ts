// Graph Section Types

export interface Node {
  id: string;
  x: number;
  y: number;
  label?: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  val?: number; // Importance
}

export interface Link {
  source: string;
  target: string;
  weight?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
