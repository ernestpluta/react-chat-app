import React, { useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';
import Signout from '../pages/signout/Signout';

export default function NavbarComp() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div>
        <Navbar className="" style={{ background: 'rgb(31, 150, 81,.15)' }}>
          <Container className="py-2">
            <Navbar.Brand href="/" className="font-weight-bold">
              My Money
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
              {/* <span>Signed in as: {currentUser.email}</span> */}
                {currentUser && currentUser.email}
              </Navbar.Text>
              <Signout />
              <Link to="/login">
                <Button className=" ms-4 px-4">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className=" ms-4 px-4 black text-black"
                  variant="outline-success"
                >
                  Sign Up
                </Button>
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
