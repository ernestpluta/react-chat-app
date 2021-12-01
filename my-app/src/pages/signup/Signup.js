import React from 'react';
import { Form, Button, Alert, Spinner, FloatingLabel } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './Signup.css';

export default function Signup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, isPending } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailRef.current.value === '' && passwordRef.current.value === '' && passwordConfirmRef.current.value === '') {
      setError("Email and password cannot be empty");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
    }
    try {
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
          {error && error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="" controlId="formBasicEmail">
            <FloatingLabel
              controlId="Email"
              label="Email address"
              className="mb-1"
            >
              <Form.Control type="email" placeholder="Email address" ref={emailRef}/>
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
                ref={passwordRef}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="confirm password"
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
            className="mt-4 w-100 py-2"
            disabled={loading}
          >
            Sign Up
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
      )}
    </div>
  );
}
