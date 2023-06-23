export type NodeData = {
  id: number;
  name: string;
  parent_node: number | null;
};

export type NodeElement = NodeData & {
  children: NodeElement[];
};

export type ContextMenu = {
  node: NodeElement;
  position: { x: number; y: number };
};

export type NodeModal = {
  node: NodeElement;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
};

export interface IAppState {
  nodes: NodeData[];
  menu?: ContextMenu;
  modal?: NodeModal;
}
