import { NodeData, NodeElement } from '../types';

export const formatNodeList = (list: NodeData[], parent: number | null = null) => {
  const parentNodes: NodeElement[] = [];
  const currentLevelNodes = list.filter(node => node.parent_node === parent);

  for (const node of currentLevelNodes) {
    const children = formatNodeList(
      list.filter(node => node.parent_node !== parent),
      node.id
    );
    parentNodes.push({ ...node, children });
  }
  return parentNodes;
};

export const coundChildNodes = (node: NodeElement) => {
  let count = 0;
  count += node.children.length;

  for (const childNode of node.children) {
    const childCount = coundChildNodes(childNode);
    count += childCount;
  }
  return count;
};
