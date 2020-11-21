import React from 'react';

import logo from '../../logo.svg';
import AuthContext from '../AuthProvider/context';
import { useFetchUserData, useUserDataSubmitter } from '../../utils/hooks';

function Sample() {
  const user = React.useContext(AuthContext);
  const userData = useFetchUserData();
  const [isSending, sendUserData] = useUserDataSubmitter();
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {user?.uid && (
        <button
          onClick={() => sendUserData({ testField: userData?.testField ? `${userData.testField}a`: 'A' })}
          disabled={isSending}
        >
          Test Fs
        </button>
      )}
      {userData?.testField && (
        <div>{userData.testField}</div>
      )}
    </header>
  );
}

export default Sample;
