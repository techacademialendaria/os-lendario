import type { GraphData, Node, Link } from '../types';

export const generateNetwork = (nodeCount: number): GraphData => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Center Node
  nodes.push({ id: '0', x: 50, y: 50, label: 'LENDARIA', type: 'primary', val: 10 });

  for (let i = 1; i < nodeCount; i++) {
    nodes.push({
      id: i.toString(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      label: `Node ${i}`,
      type: Math.random() > 0.8 ? 'secondary' : 'tertiary',
      val: Math.random() * 5 + 2,
    });
  }

  // Create Connections (Proximity based simplified)
  nodes.forEach((node, i) => {
    // Connect to center sometimes
    if (i > 0 && Math.random() > 0.7) {
      links.push({ source: node.id, target: '0', weight: 1 });
    }

    // Connect to random neighbors
    nodes.forEach((target, j) => {
      if (i !== j) {
        const dist = Math.sqrt(Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2));
        if (dist < 15) {
          // Threshold for connection
          links.push({ source: node.id, target: target.id, weight: 1 });
        }
      }
    });
  });

  return { nodes, links };
};

export const generateRadialTree = (): GraphData => {
  const categories = ['Estrategia', 'Tecnologia', 'Cultura', 'Marketing'];
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Center
  nodes.push({ id: 'core', x: 50, y: 50, label: 'CORE', type: 'primary', val: 10 });

  categories.forEach((cat, i) => {
    // Level 1: Categories (Circle)
    const angle = (i / categories.length) * 2 * Math.PI;
    const r1 = 20;
    const catX = 50 + r1 * Math.cos(angle);
    const catY = 50 + r1 * Math.sin(angle);
    const catId = `cat-${i}`;

    nodes.push({ id: catId, x: catX, y: catY, label: cat, type: 'secondary', val: 7 });
    links.push({ source: 'core', target: catId });

    // Level 2: Topics
    for (let j = 0; j < 3; j++) {
      const subAngle = angle + (j - 1) * 0.5;
      const r2 = 35;
      const subX = 50 + r2 * Math.cos(subAngle);
      const subY = 50 + r2 * Math.sin(subAngle);
      const subId = `sub-${i}-${j}`;
      nodes.push({ id: subId, x: subX, y: subY, label: `Item ${j + 1}`, type: 'tertiary', val: 3 });
      links.push({ source: catId, target: subId });
    }
  });

  return { nodes, links };
};
