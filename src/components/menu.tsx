import { useRef } from 'react';
import { useClickedOutside } from '../hooks/useClickedOutside';
import { useAppDispatch } from '../store';
import { hideMenu, showModal } from '../store/reducer';
import './menu.css';

import type { ContextMenu, NodeModal } from '../types';

export const Menu = ({ node, position }: ContextMenu) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLUListElement>(null);

  useClickedOutside(menuRef, () => dispatch(hideMenu()));

  const handleShowModal = (type: NodeModal['type']) => {
    const modalData: NodeModal = {
      node:
        type === 'CREATE'
          ? { id: new Date().valueOf(), name: '', parent_node: node.id, children: [] }
          : node,
      type,
    };

    dispatch(showModal(modalData));
    dispatch(hideMenu());
  };

  return (
    <ul
      ref={menuRef}
      className="context-menu"
      style={{ right: `calc(100% - ${position.x}px)`, top: position.y }}
    >
      <li className="context-menu__menu-item" onClick={() => handleShowModal('CREATE')}>
        Add child
      </li>
      <li className="context-menu__menu-item" onClick={() => handleShowModal('UPDATE')}>
        Edit node
      </li>
      <li className="context-menu__menu-item" onClick={() => handleShowModal('DELETE')}>
        Delete node
      </li>
    </ul>
  );
};
