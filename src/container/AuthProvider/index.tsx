import React from 'react';
import firebase from 'firebase';

import { auth } from '../../firebase';
import AccessPage from './AccessPage';
import AuthContext from './context';
import Loader from '../../components/Loader';

const AuthProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = React.useState<firebase.User | null>(null);
  const [loading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserInfo(user);
      } else {
        // User is signed out
        setUserInfo(null);
      }
    });
  }, []);
  if (!userInfo) {
    if (loading) {
      return <Loader />;
    }
    return <AccessPage setUserInfo={setUserInfo} />
  }
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
