import React from 'react';

import logo from '../../logo.svg';
import { AuthContext } from '../AuthProvider';
import { firestore } from '../../firebase';

function Home() {
  const user = React.useContext(AuthContext);
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      {user?.uid && (
        <button onClick={() => firestore.collection('test').add({ userId: user?.uid, data: `test ${new Date().toJSON()}` })}>
          Test Fs
        </button>
      )}
    </header>
  );
}

export default Home;
