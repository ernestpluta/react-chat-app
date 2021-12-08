import { Navbar, Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Signout from '../pages/Signout';
import './NavbarComp.css';
import ProfilePic from '../assets/annonymous.png';
import { auth } from '../firebase/firebase';
import { doc, onSnapshot , getDoc} from '@firebase/firestore';
import { db } from '../firebase/firebase';
import { useCallback, useEffect, useState } from 'react';
import { updateProfile } from '@firebase/auth';
import ChatIcon from '../assets/Chatbook.svg'
export default function NavbarComp() {
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    const getUserName = async () => {
      if (auth.currentUser) {
          onSnapshot(doc(db, 'users', auth.currentUser.uid), async (doc) => {
            await updateProfile(auth.currentUser, {
            displayName: doc.data().name,
          });
        });
      }
    }
    getUserName()
  }, []);
  return (
    <div>
      <div>
        <Navbar
          className="py-3"
          style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', background: '#fff' }}
        >
          <Container className="py-2">
            <Navbar.Brand href="/" className="font-weight-bold">
             <img src={ChatIcon} style={{width: '28px'}} alt="" /> Chatbook
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {auth.currentUser && (
                  <span className="me-3">Cześć, {auth.currentUser?.displayName}</span>
                )}
              </Navbar.Text>
              {currentUser && (
                <Dropdown>
                  <Dropdown.Toggle variant="transparent" className="px-0 py-0">
                    <img
                      src={auth.currentUser?.photoURL || ProfilePic}
                      alt="Profile pic"
                      style={{width:'40px', height: '40px'}}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="p-2" style={window.innerWidth < 420 ? {left: '-150%'} : {}}>
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
