import React from 'react';
import { Container } from 'react-bootstrap';
import RiskGraph from '../../components/RiskGraph';
import { AuthContext } from '../AuthProvider';


function Home() {
  const user = React.useContext(AuthContext);


  return (
    <Container>
      <p>{user?.uid}</p>
      <RiskGraph></RiskGraph>
    </Container>
  );
}

export default Home;
