import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import '../../App.css';
import AccessPage from '../AuthProvider/AccessPage';
import Home from '../Home';
import Map from '../Map';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/access" exact component={AccessPage} />
          <Route path="/map" exact component={Map} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
