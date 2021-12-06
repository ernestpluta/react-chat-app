import React, { useState } from 'react';
import ProfilePic from '../assets/annonymous.png';
import UserList from '../components/UserList';
import { useEffect } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import './Home.css';

export default function Home() {
  const [user, setUser] = useState();
  useEffect(() => {
      getDoc(doc(db, 'users', auth.currentUser.uid)).then((doc) => {
        if (doc.exists) setUser(doc.data());
      });
  }, []);
  return (
    <div className="chat_wrapper">
      <div className="chat_container">
        <div className="chat_left">
          <div className="chat_left_inner">
            <UserList user={user} />
            <UserList user={user} />
          </div>
        </div>
        <div className="chat_right"></div>
      </div>
    </div>
  );
}
