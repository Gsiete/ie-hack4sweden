import React from 'react';
import { Button } from 'react-bootstrap';

import logo from '../../logo.svg';
import Map from '../../components/Map';
import { useUserDataSubmitter } from '../../utils/hooks';

function Home() {
  const [isSending, setUserData] = useUserDataSubmitter()
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Map />
      <Button disabled={isSending} onClick={() => setUserData({ dataSubmitted: true })}>Submit!!!</Button>
    </header>
  );
}

export default Home;
