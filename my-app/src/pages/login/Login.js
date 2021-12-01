import { Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase/firebase';
import './Login.css';

export default function Login() {

  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useAuth()


const handleLogin = (e) => {
  e.preventDefault()
  login(email,password)
}
  return (
    <div>
      <Form className="mx-auto" onSubmit={handleLogin}>
        <h3 className="mb-4">Log to account</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {error && error && (
            <Alert variant="danger">Incorrect email or password </Alert>
          )}
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2 px-4">
          Log in
        </Button>
      </Form>
    </div>
  );
}
