import React from 'react';
import firebase from 'firebase';

const AuthContext = React.createContext<firebase.User | null>(null);

export default AuthContext;
