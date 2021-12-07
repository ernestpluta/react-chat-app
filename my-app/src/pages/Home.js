import React, { useState } from 'react';
import ProfilePic from '../assets/annonymous.png';
import UserList from '../components/UserList';
import { useEffect } from 'react';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import './Home.css';

export default function Home() {
  const [user, setUser] = useState();
  const [userList, setUserList] = useState(null)
  useEffect(() => {
    if(auth.currentUser){
      getDoc(doc(db, 'users', auth.currentUser.uid)).then((doc) => {
        if (doc.exists) setUser(doc.data());
      });
      const getUserList = async() => {
         const snap = await getDocs(collection(db, 'users'))
         setUserList(snap.docs.map(doc => doc.data()))
      }
      getUserList()
    }
  }, []);
  console.log(userList)
  return (
    <div className="chat_wrapper">
      <div className="chat_container">
        <div className="chat_left">
          <div className="chat_left_inner">
            {userList && userList.map((u,index) => (
             <UserList user={u} key={index}/> 
            ))}
          </div>
        </div>
        <div className="chat_right"></div>
      </div>
    </div>
  );
}
