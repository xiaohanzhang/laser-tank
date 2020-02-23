import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { 
  ApolloProvider, ApolloClient, HttpLink, InMemoryCache
} from '@apollo/client';

import gameSlice from 'features/game/game';
import Board from 'features/game/Board';
import MenuBar from 'features/ui/MenuBar';
import ControlPanel from 'features/ui/ControlPanel';
import './App.css';
import '../config';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/graphql',
  })
});

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

  return <div className="App">
    <MenuBar/>
    <div className="main">
      <Board/>
      <ControlPanel/>
    </div>
  </div>
}

export default () => {
  return <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/auth">
          <div>Loading ...</div>
        </Route>
        <Route path="/">
          <App/>
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
};
