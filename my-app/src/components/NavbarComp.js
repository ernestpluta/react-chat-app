import { Navbar, Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Signout from '../pages/Signout';
import './NavbarComp.css';
import ProfilePic from '../assets/annonymous.png';
import { auth } from '../firebase/firebase';
import { doc, onSnapshot ,getDoc} from '@firebase/firestore';
import { db } from '../firebase/firebase';
import { useCallback, useEffect, useState } from 'react';
import { updateProfile } from '@firebase/auth';
export default function NavbarComp() {
  const { currentUser, setCurrentUser } = useAuth();
  const [userName, setUserName] = useState();

  // const readUserName = () => {
  //   onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
  //     setCurrentUser(currentUser.displayName = doc.data().name)
  //     // setUserName(doc.data().name)
  //     // currentUser.displayName = userName
  //   })
  // }

  useEffect(() => {
    const getUserName = async() => {
      if (currentUser) {
         onSnapshot(doc(db, 'users', auth.currentUser.uid),(doc) => {
           updateProfile(auth.currentUser, {
            displayName: doc.data().name,
          });
        });
      }
    }
    getUserName()
  }, [currentUser]);
  return (
    <div>
      <div>
        <Navbar
          className="py-3"
          style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
        >
          <Container className="py-2">
            <Navbar.Brand href="/" className="font-weight-bold">
              Chatbook
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {auth.currentUser?.displayName && (
                  <span className="me-3">Cześć, {auth.currentUser.displayName}</span>
                )}
              </Navbar.Text>
              {currentUser && (
                <Dropdown>
                  <Dropdown.Toggle variant="transparent" className="px-0 py-0">
                    <img
                      src={ProfilePic}
                      alt="Profile pic"
                      width="38px"
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="p-2">
                    <Dropdown.Item href="/">Home</Dropdown.Item>
                    <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                    <Dropdown.Item>
                      <Signout />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {!currentUser && (
                <>
                  <Link to="/login">
                    <Button
                      className="ms-4 px-2 border-0 bg-transparent"
                      style={{ color: 'rgba(107,114,128)' }}
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className=" ms-4 px-4 black" variant="primary">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
