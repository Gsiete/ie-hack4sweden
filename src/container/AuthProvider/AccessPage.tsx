import React from 'react';
import firebase from 'firebase';
import { Button, Container, Form } from 'react-bootstrap';

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

  return (
    <div className="App">
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={setFromField} value={formData.email} placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={setFromField} value={formData.password} placeholder="Enter password" />
          </Form.Group>
          <Button type="button" color="primary" disabled={!formData.email || !formData.password} onClick={signIn}>
            Sign-in
          </Button>
          <Button type="button" color="secondary" disabled={!formData.email || !formData.password} onClick={signUp}>
            Sign-up
          </Button>
        </Form>
        <Button variant="outline-primary" type="button" onClick={loginWithGoogle} className="mt-3">
          Connect With Google
        </Button>
      </Container>
    </div>
  );
}

export default AccessPage;
