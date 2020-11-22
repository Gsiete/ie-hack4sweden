import React from 'react';
import { Container } from 'react-bootstrap';
import InfestationGraph from '../../components/InfestationGraph';
import RiskGraph from '../../components/RiskGraph';
import Icon from '../../components/Icon';
import { Redirect } from 'react-router-dom';
import { useFetchUserData } from '../../utils/hooks';
import Loader from '../../components/Loader';


function Home() {
  const userData = useFetchUserData();
  if (userData !== undefined && !userData?.polygon) {
    return <Redirect to="/map" />
  }

  if (userData === undefined) {
    return <Loader />;
  }

  const riskData = {
    extremlyHighRisk: 20,
    highRisk: 32,
    mediumRisk: 12,
    smallRisk: 6,
    extremlySmallRisk: 29,
  }
  const polygon = userData?.polygon as {lat: number, lng: number}[]
  console.log(userData?.polygon)
  const sumPoint = polygon?.reduce(
    ({ sumLat, sumLng }, { lat, lng }) => ({ sumLat: sumLat + lat, sumLng: sumLng + lng }),
    { sumLat: 0, sumLng: 0 }
  );
  console.log('sumPoint', sumPoint)
  console.log('polygon.length', polygon.length)
  const avgPoint = polygon ? { lat: sumPoint.sumLat/polygon.length, lng: sumPoint.sumLng/polygon.length } : {};
  // const { lat, lng } = avgPoint;
  const lat = 58.62;
  const lng = 16.08
  const googleLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const riskLink = `https://kartor.skogsstyrelsen.se/kartor/?startapp=skador&x=6784288.83&y=435145.725&scale=100002.5736864&bg=Granbarkborre`
  const infestationLink = `https://kartor.skogsstyrelsen.se/kartor/?startapp=skador&x=6784288.83&y=435145.725&scale=100002.5736864&bg=Analys`
  const resolutionLink = `https://googlethatforyou.com?q=My%20forest%20is%20eaten%20by%20bugs%20...%20or%20ghosts`;

  return (
    <Container>

      <p className="mt-2">On this page you can see information about your area</p>
      <div className="graph-area">
        <div className='graph-section'>
          <p className="text-muted">This graph shows the breakdown of forest in your area based on likelihood of it being infected.</p>
          <RiskGraph {...riskData}></RiskGraph>
        </div>
        <div className='graph-section'>
          <p className="text-muted">This report agregates data about curret vegatation change in order to estimate change of the vegitations caused by the infestation.</p>
          <InfestationGraph></InfestationGraph>
        </div>
      </div>

      <p className="mt-5">Operations</p>
      <div className="operations">
        <Icon image="google-map.png" link={googleLink} title="Google Maps"></Icon>
        <Icon image="skog.jpeg" link={riskLink} title="Risk Map"></Icon>
        <Icon image="skog.jpeg" link={infestationLink} title="Infestation Map"></Icon>
        <Icon image="ghostbusters.jpg" link={resolutionLink} title="Who you gonna call"></Icon>
      </div>
    </Container>
  );
}

export default Home;
