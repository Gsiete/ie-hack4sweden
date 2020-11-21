import React from 'react';
import { Container } from 'react-bootstrap';

import AuthContext from '../AuthProvider/context';
import RiskGraph from '../../components/RiskGraph';


function Home() {
  const user = React.useContext(AuthContext);

  const riskData = {
    extremlyHighRisk: 12,
    highRisk: 12,
    mediumRisk: 12,
    smallRisk: 12,
    extremlySmallRisk: 12,
  }

  return (
    <Container>
      <p>{user?.uid}</p>
      <p>On this page you can see information about your area</p>
      <RiskGraph {...riskData}></RiskGraph>
    </Container>
  );
}

export default Home;
