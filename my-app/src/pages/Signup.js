import { Form, Button, Alert, Spinner, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setDoc, doc, Timestamp } from '@firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useAuth } from '../hooks/useAuth';

export default function Signup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    lastName: ''
  });
  const navigate = useNavigate()
  const { name, lastName, email, password } = userData;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !email && !password) {
      return setError('You need to enter your credentials.');
    }

    try {
      setError('');
      // setIsPending(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        name: name,
        lastName: lastName,
        email: email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      })
        setUserData({name: '', lastName: '', email: '', password: ''})
        // localStorage.setItem('userAuthenticated',true)
        setIsPending(false);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };
  return (
    <div>
      <Form className="mx-auto" onSubmit={handleSubmit} className="loginNSignUp">
        <h3 className="mb-4">Sign up </h3>
        {error && <Alert variant="danger">{error} </Alert>}
        {isPending && (
          <div className="text-center" style={{minHeight: '306px'}}>
            <Spinner animation="border" role="status" className="mt-5">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Form.Group className="" controlId="Name">
          {!isPending && (
            <>
              <FloatingLabel controlId="Name" label="Name" className="mb-3">
                <Form.Control
                  type="name"
                  placeholder="Name"
                  onChange={handleChange}
                  name="name"
                />
              </FloatingLabel>
              <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                <Form.Control
                  type="name"
                  placeholder="lastName"
                  onChange={handleChange}
                  name="lastName"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="Email"
                label="Email address"
                className="mb-1"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </FloatingLabel>
              <Form.Text className="ms-1">
                We will never share your email with anybody.
              </Form.Text>
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
            </>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4 w-100 py-2">
         {isPending ? 'Creating User...' :  'Sign Up'}
        </Button>

        <Link to="/login">
          <Button
            variant="transparent"
            type="submit"
            className="mt-2 w-100 text-primary"
          >
            Already have an account?
          </Button>
        </Link>
      </Form>
    </div>
  );
}
