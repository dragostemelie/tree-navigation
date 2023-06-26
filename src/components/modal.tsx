import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from '../store';
import { create, hideModal, remove, update } from '../store/reducer';
import { useClickedOutside } from '../hooks/useClickedOutside';
import './modal.css';

import type { NodeModal } from '../types';
import { getNestedIds } from '../utils/nodes';

export const Modal = ({ node, type }: NodeModal) => {
  const [nodeName, setNodeName] = useState<string>(node.name);

  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  useClickedOutside(modalRef, () => dispatch(hideModal()));

  const getModalTitle = () => {
    switch (type) {
      case 'CREATE':
        return 'Create new child node:';
      case 'UPDATE':
        return 'Update node name:';
      default:
        return `Delete node <${node.name}> and all it's child nodes?`;
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'CREATE':
        return 'Add';
      case 'UPDATE':
        return 'Save';
      default:
        return `Yes`;
    }
  };

  const handleNodeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setNodeName(value);
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      setNodeName(event.currentTarget.value);
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    switch (type) {
      case 'CREATE':
        dispatch(
          create({
            id: node.id,
            name: nodeName,
            parent_node: node.parent_node,
          })
        );
        break;
      case 'UPDATE':
        dispatch(
          update({
            id: node.id,
            name: nodeName,
            parent_node: node.parent_node,
          })
        );
        break;
      default:
        dispatch(remove(getNestedIds(node)));
        break;
    }
    dispatch(hideModal());
  };

  const handleCancel = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    modalRef.current?.querySelector('input')?.focus();
  }, []);

  return (
    <div className="modal">
      <div ref={modalRef} className="modal__content">
        <label style={{ alignItems: `${type === 'DELETE' ? 'center' : 'flex-start'}` }}>
          <span>{getModalTitle()}</span>
          {type !== 'DELETE' && (
            <input
              type="text"
              value={nodeName}
              onChange={handleNodeName}
              onKeyDown={handleEnterKey}
            />
          )}
        </label>
        <div className="modal__buttons">
          <button onClick={handleConfirm} disabled={nodeName.length === 0}>
            {getButtonText()}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
