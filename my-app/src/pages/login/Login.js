import { Form, Button, Alert, FloatingLabel, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { updateDoc, doc } from '@firebase/firestore';
import './Login.css';

export default function Login() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userData;

  // get attributes and pass current value
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      return setError('You need to enter your credentials.');
    }
    try {
      setError('');
      setIsPending(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, 'users', cred.user.uid), { isOnline: true });
      setUserData({ email: '', password: '' });
      // localStorage.setItem('userAuthenticated',true)
      setIsPending(false);
      
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };
  return (
    <div>
      <Form
        className="mx-auto w-75-sm loginNSignUp"
        onSubmit={handleLogin}
      >
        <h3 className="mb-4">Log to account</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {error && <Alert variant="danger">{error} </Alert>}
          {isPending && (
            <div className="text-center">
              <Spinner animation="border" role="status" className="mt-5">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {!isPending && (
            <>
              <FloatingLabel
                controlId="Email"
                label="Email address"
                className="mt-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="Password"
                label="Password"
                className="mt-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </FloatingLabel>
              <Form.Text className="ms-1 mt-1">
                Password must have atleast 6 characters.
              </Form.Text>
            </>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2 w-100 py-2">
          Log in
        </Button>
        <div className="text-center mt-2">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot your password?
          </Link>
        </div>
      </Form>
    </div>
  );
}
