import { createSelector } from '@reduxjs/toolkit';
import { formatNodeList } from '../utils/nodes';

import type { RootState } from './index';

export const selectNodes = createSelector(
  (state: RootState) => state.nodes,
  nodes => {
    const nodelist = formatNodeList(nodes);
    return nodelist;
  }
);

export const selectMenu = (state: RootState) => state.menu;
export const selectModal = (state: RootState) => state.modal;
