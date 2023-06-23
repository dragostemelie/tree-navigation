import { useState } from 'react';
import { coundChildNodes } from '../utils/nodes';
import './node.css';

import type { NodeElement } from '../types';

import { MinusIcon, MoreIcon, PlusIcon } from '../assets/icons';
import { useAppDispatch } from '../store';
import { showMenu } from '../store/reducer';

interface Props {
  node: NodeElement;
}

export const NodeComponent = ({ node }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const count = coundChildNodes(node);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleMenu = (event: React.MouseEvent) => {
    const { right, bottom } = event.currentTarget.getBoundingClientRect();
    const contextMenu = {
      node,
      position: { x: right, y: bottom },
    };
    dispatch(showMenu(contextMenu));
  };

  return (
    <div className="node">
      <div className="node__wrapper">
        <div
          className={`node__icon ${node.children.length === 0 ? 'node__icon--disabled' : ''}`}
          onClick={toggleExpand}
        >
          {node.children.length > 0 ? expanded ? <MinusIcon /> : <PlusIcon /> : null}
        </div>
        <div className="node__card">
          <div className="node__content">
            <p className="node__name">{node.name}</p>
            <p className="node__count">{`${count} nodes under`}</p>
          </div>
          <div className="node__icon node__menu-icon" onClick={toggleMenu}>
            <MoreIcon />
          </div>
        </div>
      </div>
      {expanded && node.children.map(child => <NodeComponent key={child.name} node={child} />)}
    </div>
  );
};
