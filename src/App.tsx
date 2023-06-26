import { useAppSelector } from './store';
import { selectMenu, selectModal, selectNodes } from './store/selectors';
import './App.css';

import { NodeComponent } from './components/node';
import { Menu } from './components/menu';
import { Modal } from './components/modal';

function App() {
  const nodes = useAppSelector(selectNodes);
  const menu = useAppSelector(selectMenu);
  const modal = useAppSelector(selectModal);

  return (
    <main>
      {nodes.map(node => (
        <NodeComponent key={node.id} node={node} />
      ))}

      {menu && <Menu {...menu} />}
      {modal && <Modal {...modal} />}
    </main>
  );
}

export default App;
