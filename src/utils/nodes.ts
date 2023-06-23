import { NodeData, NodeElement } from '../types';

export const formatNodeList = (list: NodeData[], parent: number | null = null) => {
  // const start = performance.now();

  const parentNodes: NodeElement[] = [];
  const currentLevelNodes = list.filter(node => node.parent_node === parent);
  for (const node of currentLevelNodes) {
    const children = formatNodeList(
      list.filter(node => node.parent_node !== parent),
      node.id
    );
    parentNodes.push({ ...node, children });
  }

  // const timeTaken = performance.now() - start;
  // console.log('Total time taken for formatNodeList: ' + timeTaken + ' milliseconds');

  return parentNodes;
};

export const coundChildNodes = (node: NodeElement) => {
  // const start = performance.now();

  let count = 0;
  count += node.children.length;

  for (const childNode of node.children) {
    const childCount = coundChildNodes(childNode);
    count += childCount;
  }

  // const timeTaken = performance.now() - start;
  // console.log('Total time taken for coundChildNodes: ' + timeTaken + ' milliseconds');

  return count;
};
