import React from 'react';
import { Container } from 'react-bootstrap';
import InfestationGraph from '../../components/InfestationGraph';
import RiskGraph from '../../components/RiskGraph';
import { AuthContext } from '../AuthProvider';


function Home() {
  const user = React.useContext(AuthContext);

  const riskData = {
    extremlyHighRisk: 20,
    highRisk: 32,
    mediumRisk: 12,
    smallRisk: 6,
    extremlySmallRisk: 29,
  }

  return (
    <Container>
      <p>{user?.uid}</p>
      <p>On this page you can see information about your area</p>
      <RiskGraph {...riskData}></RiskGraph>
      <InfestationGraph></InfestationGraph>
    </Container>
  );
}

export default Home;
