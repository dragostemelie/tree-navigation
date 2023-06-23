import { useAppSelector } from './store';
import { selectMenu, selectModal, selectNodes } from './store/selectors';
import './App.css';

import { NodeComponent } from './components/node';
import { Menu } from './components/menu';
import { Modal } from './components/modal';
// import { Controls } from './components/controls';

function App() {
  const nodes = useAppSelector(selectNodes);
  const menu = useAppSelector(selectMenu);
  const modal = useAppSelector(selectModal);

  return (
    <main>
      {/* <Controls /> */}

      {nodes
        .filter(node => node.parent_node === null)
        .map(node => (
          <NodeComponent key={node.id} node={node} />
        ))}

      {menu && <Menu {...menu} />}
      {modal && <Modal {...modal} />}

      <a href="https://github.com/dragostemelie/tree-navigation" target="_blank">
        https://github.com/dragostemelie/tree-navigation
      </a>
    </main>
  );
}

export default App;
