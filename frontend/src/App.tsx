import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './modules';
import { Snippets } from './modules/snippets';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/snippets" component={Snippets} />
      </Switch>
    </Router>
  );
};

export default App;
