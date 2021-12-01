import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebase/firebase';
import Signout from '../pages/signout/Signout';

export default function NavbarComp() {
  const { currentUser, isLogged } = useAuth();
  if(currentUser){
    console.log(auth.currentUser.uid)
  }

  return (
    <div>
      <div>
        <Navbar className="py-3" style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
          <Container className="py-2">
            <Navbar.Brand href="/" className="font-weight-bold">
              My Money
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {isLogged && currentUser && currentUser.email}
              </Navbar.Text>
              {isLogged && <Signout />}
              {!isLogged && (
                <>
              <Link to="/login">
                <Button className=" ms-4 px-4">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className=" ms-4 px-4 black"
                  variant="outline-primary"
                >
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
