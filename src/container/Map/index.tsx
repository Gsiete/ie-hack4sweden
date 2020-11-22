import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import logo from '../../logo.svg';
import Map from '../../components/Map';
import { useUserDataSubmitter } from '../../utils/hooks';
import { Redirect } from 'react-router-dom';

function Home() {
  const [isSending, setUserData] = useUserDataSubmitter()
  const [redirectHome, setRedirectHome] = useState(false);
  const handleSubmit = () => {
    setUserData({ polygon: true })
    setRedirectHome(true);
  };

  if (!isSending && redirectHome) {
    return <Redirect to="/" />
  }

  return (
      <Map/>
  );
}

export default Home;
