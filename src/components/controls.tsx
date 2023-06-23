import { useState } from 'react';
import { useAppDispatch } from '../store';
import { load } from '../store/reducer';
import './controls.css';

import data0 from '../data/nodes.json';
import data1 from '../data/nodes-100.json';
import data2 from '../data/nodes-1000.json';

export const Controls = () => {
  const [dataIndex, setDataIndex] = useState(0);
  const dispatch = useAppDispatch();

  const loadData = (index: number) => {
    setDataIndex(index);
    switch (index) {
      case 1:
        dispatch(load(data1.nodes));
        break;
      case 2:
        dispatch(load(data2.nodes));
        break;

      default:
        dispatch(load(data0.nodes));
        break;
    }
  };
  return (
    <div className="controls">
      <button onClick={() => loadData(0)} disabled={dataIndex === 0}>
        10 nodes
      </button>
      <button onClick={() => loadData(1)} disabled={dataIndex === 1}>
        100 nodes
      </button>
      <button onClick={() => loadData(2)} disabled={dataIndex === 2}>
        1000 nodes
      </button>
    </div>
  );
};
