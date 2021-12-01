import React from 'react';
import { Form, Button, Alert, Spinner, FloatingLabel } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../hooks/useAuth';

import './Signup.css';

export default function Signup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const navigate = useNavigate();
  const { signup, isPending } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
    }
    try {
      setError('');
      await signup(emailRef.current.value, passwordConfirmRef.current.value);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {isPending && isPending && (
        <Spinner
          animation="border"
          role="status"
          style={{ margin: '0 auto' }}
        />
      )}
      {!isPending && (
        <Form className="mx-auto" onSubmit={handleSubmit}>
          <h3 className="mb-4">Sign up </h3>
          {error && error && <Alert variant="warning">{error}</Alert>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-1"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <Form.Text className="ms-1">
              We will never share your email with anybody.
            </Form.Text>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mt-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Confirm Password"
              className="mt-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordConfirmRef}
              />
            </FloatingLabel>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-2 px-4"
            disabled={loading}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </div>
  );
}
