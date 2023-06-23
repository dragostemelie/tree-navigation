import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ContextMenu, IAppState, NodeData, NodeModal } from '../types';

import data from '../data/nodes.json';

const initialState: IAppState = {
  nodes: data.nodes,
  menu: undefined,
  modal: undefined,
};

const nodesSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Nodes
    load: (state, action: PayloadAction<NodeData[]>) => ({
      ...state,
      nodes: action.payload,
    }),
    create: (state, action: PayloadAction<NodeData>) => ({
      ...state,
      nodes: [...state.nodes, action.payload],
    }),
    update: (state, action: PayloadAction<NodeData>) => ({
      ...state,
      nodes: state.nodes.map(node => {
        if (node.id === action.payload.id) return action.payload;
        else return node;
      }),
    }),
    remove: (state, action: PayloadAction<number[]>) => ({
      ...state,
      nodes: state.nodes.filter(node => !action.payload.includes(node.id)),
    }),
    // Context menu
    showMenu: (state, action: PayloadAction<ContextMenu>) => ({
      ...state,
      menu: action.payload,
    }),
    hideMenu: state => ({
      ...state,
      menu: undefined,
    }),
    // Modal
    showModal: (state, action: PayloadAction<NodeModal>) => ({
      ...state,
      modal: action.payload,
    }),
    hideModal: state => ({
      ...state,
      modal: undefined,
    }),
  },
});

// actions
export const { load, create, update, remove, showMenu, hideMenu, showModal, hideModal } =
  nodesSlice.actions;

export default nodesSlice.reducer;
