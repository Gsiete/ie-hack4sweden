import React from 'react';
import firebase from 'firebase';

import '../../App.css';
import { auth } from '../../firebase';

interface Props {
  setUserInfo: (userInfo: firebase.User | null) => void,
}
const AccessPage: React.FC<Props> = ({ setUserInfo }) => {
  const [formData, setFormData] = React.useState<{ email?: string, password?: string }>({});
  const setFromField = (e: React.ChangeEvent<HTMLInputElement>) => (
      setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value }));

  const signIn = () => formData.email && formData.password
      && auth.signInWithEmailAndPassword(formData.email, formData.password).then((user) => setUserInfo(user.user));
  const signUp = () => formData.email && formData.password
      && auth.createUserWithEmailAndPassword(formData.email, formData.password).then((user) => setUserInfo(user.user));

  const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then((result) => setUserInfo(result.user));
  }
  console.log(formData)
  return (
      <div>
        <form>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" onChange={setFromField} value={formData.email} />
          <label htmlFor="password">Password</label>
          <input name="password" id="password" onChange={setFromField} value={formData.password} type="password" />
          <button type="button" disabled={!formData.email || !formData.password} onClick={signIn}>Sign-in</button>
          <button type="button" disabled={!formData.email || !formData.password} onClick={signUp}>Sign-up</button>
        </form>
        <button type="button" onClick={loginWithGoogle}>Connect With Google</button>
      </div>
  );
}

export default AccessPage;
