import {
  Form,
  Button,
  Alert,
  FloatingLabel,
  Spinner,
} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import GoBack from '../../components/GoBack';

export default function Login() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!email) {
        setError('You need to enter an email')
    }
    try {
        if(email) {
            setIsPending(true);
            setTimeout(() => {
                setIsPending(false)
            },600)
            resetPassword(email)
        }
    } catch (err) {
        console.log(err.message)
        setIsPending(false);
        setError(err.message)
    }
  };
  return (
    <div>
      <Form className="mx-auto" onSubmit={handleLogin} >
        <GoBack/>
        <h3 className="mb-4">Change Password</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {error && error && <Alert variant="danger">{error}</Alert>}
          {isPending && isPending && (
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
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              <Form.Text className="ms-1 ">
              We will send you an email with link to set new password.
            </Form.Text>
              <Button
                variant="primary"
                type="submit"
                className="mt-4 w-100 py-2"
                disabled={!email ? true : false}
              >
                Next
              </Button>
            </>
          )}
        </Form.Group>
      </Form>
    </div>
  );
}
