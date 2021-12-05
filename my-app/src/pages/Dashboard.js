import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import {
  Form,
  Alert,
  Spinner,
  Button,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProfilePic from '../assets/annonymous.png';
import Camera from '../components/Camera';
import './Dashboard.css';
export default function Dashboard() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [img, setImg] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((doc) => {
      if (doc.exists) setUser(doc.data());
    });
  }, []);
  console.log(user);
  return (
    <div>
      <Form className="mx-auto dashboard" style={{ maxWidth: '600px' }}>
        {error && <Alert variant="danger">{error} </Alert>}
        {isPending && (
          <div className="text-center">
            <Spinner animation="border" role="status" className="mt-5">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Form.Group className="" controlId="formBasicEmail">
          {!isPending && (
            <>
              <Container>
                <Row className="d-flex align-items-center justify-content-xs-center text-align-xs-center">
                  <Col xs={12} md={4} className="profile_container">
                    <div className="img_container ">
                      <Image
                        src={ProfilePic}
                        roundedCircle
                        style={{ width: '140px' }}
                        className="my-2"
                      />
                      <div className="overlay"></div>
                      <label htmlFor="pic" className="camera-pic">
                        <Camera />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="pic"
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={8}>
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>
                    <hr />
                    <p>Created At: {user?.createdAt.toDate().toDateString()}</p>
                  </Col>
                </Row>
                <hr />
                <Col xs={12} md={8}>
                  <h2>Reset Password</h2>
                </Col>
                <Row className="d-flex align-items-center">
                  <Col>
                    <div className="">Set Username</div>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 w-25 py-2 ps-auto"
                >
                  Update
                </Button>
              </Container>
            </>
          )}
        </Form.Group>

        {/* <Button variant="primary" type="submit" className="mt-4 w-100 py-2">
          Sign Up
        </Button> */}
      </Form>
    </div>
  );
}
