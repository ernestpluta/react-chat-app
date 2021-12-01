import { Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import { useState, useRef, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailRef.current.value === '' && passwordRef.current.value === '') {
      setError("Wrong credentials");
    }
    try {
      await login(emailRef.current.value, passwordRef.current.value)
       navigate('/dashboard')
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <Form className="mx-auto" onSubmit={handleLogin} style={{minHeight: '420px'}}>
        <h3 className="mb-4">Log to account</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {error && error && (
            <Alert variant="danger">{error} </Alert>
          )}
          <FloatingLabel
            controlId="Email"
            label="Email address"
            className="mt-3"
          >
            <Form.Control
              type="email"
              placeholder="Enter Email"
              ref={emailRef}
            />
          </FloatingLabel>
          <FloatingLabel controlId="Password" label="Password" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </FloatingLabel>
          <Form.Text className="ms-1 mt-1">
            Password must have atleast 6 characters.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2 w-100 py-2">
          Log in
        </Button>
        <div className="text-center mt-2">
          <Link
            to="/forgot-password"
            className="text-decoration-none"
          >
            Forgot your password?
          </Link>
        </div>
      </Form>
    </div>
  );
}
