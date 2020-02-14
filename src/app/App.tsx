import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import gameSlice from '../features/game/game';
import Board from '../features/game/Board';
import MenuBar from '../features/ui/MenuBar';
import ControlPanel from '../features/ui/ControlPanel';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const levels = JSON.parse(localStorage.getItem('levels') ?? '');
      const levelIndex = JSON.parse(localStorage.getItem('levelIndex') ?? '0');
      if (levels) {
        dispatch(gameSlice.actions.loadLevels({ levels, levelIndex }));
      }
    } catch (error) {
      alert(`failed to load levels: ${error}`);
    }
  }, [dispatch]);

  return (
    <div className="App">
      <MenuBar/>
      <div className="main">
        <Board/>
        <ControlPanel/>
      </div>
    </div>
  );
}

export default App;
