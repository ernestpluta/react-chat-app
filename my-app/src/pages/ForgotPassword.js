import { Form, Button, Alert, FloatingLabel, Spinner } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value) {
      return setError('You need to enter your credentials.');
    }
    try {
      setError('');
      setIsPending(true);
      await resetPassword(emailRef.current.value);
    } catch {
      setIsPending(false);
      setError('Invalid Email.');
    }
  };
  console.log(error);
  return (
    <div>
      <Form className="mx-auto" onSubmit={handleReset}>
        <h3 className="mb-4">Change Password</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {error && <Alert variant="danger">{error}</Alert>}
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
                label="Enter Email"
                className="mt-3 mb-1"
              >
                <Form.Control type="email" placeholder="Email" ref={emailRef} />
              </FloatingLabel>
              <Form.Text className="ms-1 ">
                We will send you an email with link to set new password.
              </Form.Text>
              <Button
                variant="primary"
                type="submit"
                className="mt-4 w-100 py-2"
              >
                Next
              </Button>
            </>
          )}
        </Form.Group>
        <div className="text-center">
          Need an account?
           <Link to="/signup" className="text-decoration-none"> Sign up</Link>
        </div>
      </Form>
    </div>
  );
}
