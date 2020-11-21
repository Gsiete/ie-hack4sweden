import React from 'react';
import { Container } from 'react-bootstrap';
import InfestationGraph from '../../components/InfestationGraph';
import AuthContext from '../AuthProvider/context';
import RiskGraph from '../../components/RiskGraph';


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

      <p className="mt-2">On this page you can see information about your area</p>
      <div className="graph-area">
        <div className='graph-section'>
          <p className="text-muted">This graph shows the breakdown of forest in your area based on likelihood of it being infected.</p>
          <RiskGraph {...riskData}></RiskGraph>
        </div>
        <div className='graph-section'>
          <p className="text-muted">This report agregates data about curret vegatation change in order to estimate change of the vegitations caused by the i</p>
          <InfestationGraph></InfestationGraph>
        </div>
      </div>

      <p className="mt-5">Operations</p>
      <div className="operations">

      </div>
    </Container>
  );
}

export default Home;
