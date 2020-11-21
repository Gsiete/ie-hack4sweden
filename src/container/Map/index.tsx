import React from 'react';

import logo from '../../logo.svg';
import Map from '../../components/Map';

function Home() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Map />
    </header>
  );
}

export default Home;
