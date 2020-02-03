import { map } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import { exec, loadLevels } from '../features/game/game';
import Board from '../features/game/Board';
import MenuBar from '../features/ui/MenuBar';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const levels = localStorage.getItem('levels');
    if (levels) {
      dispatch(loadLevels(JSON.parse(levels)));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <MenuBar/>
      <div className="main">
        <Board/>
        <div className="control-panel">
          <div className="info"></div>
          <div className="control">
            {map([
              [{name: 'Undo', cmd: 'UNDO'}, {name: 'Hint', cmd: 'HINT'}],
              [{name: 'Save Position', cmd: ''}],
              [{name: 'Restore Position', cmd: ''}],
              [{name: 'New', cmd: ''}, {name: 'Restart', cmd: ''}],
              [{name: 'Load Level', cmd: ''}],
              [{name: '<< Level', cmd: 'PREV_LEVEL'}, {name: 'Level >>', cmd: 'NEXT_LEVEL'}],
            ], (row, i) => {
              return <div key={i}>
                {map(row, ({name, cmd}, j) => {
                  return <div key={j} onClick={() => {
                    if (cmd) {
                      dispatch(exec(cmd))
                    }
                  }}>{name}</div>
                })}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
