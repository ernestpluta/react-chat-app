import React, { useState } from 'react';
import User from '../components/User';
import { useEffect } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db, auth, storage } from '../firebase/firebase';
import { updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { addDoc, doc, getDoc, orderBy, Timestamp } from '@firebase/firestore';
import SingleMessage from '../components/SingleMessage';
import './Home.css';
import Message from '../components/Message.js';

export default function Home() {
  const [openChat, setOpenChat] = useState(null);
  const [userList, setUserList] = useState(null);
  const [text, setText] = useState('');
  const [img, setImage] = useState('')
  const [messages, setMessages] = useState([])
  const currentlyLoggedUser = auth.currentUser.uid;
  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, 'users'),
        where('uid', 'not-in', [currentlyLoggedUser])
      );
      const unsub = onSnapshot(q, (snapshot) => {
        let users = [];
        snapshot.forEach((doc) => users.push(doc.data()));
        setUserList(users);
      });
      return unsub;
    }
  }, [currentlyLoggedUser]);
  const clickedUser = async (user) => {
    setOpenChat(user);
    const user2 = user.uid
    const id = currentlyLoggedUser > user2 ? `${currentlyLoggedUser + user2}` : `${user2 + currentlyLoggedUser}`
    const messagesRef = collection(db, 'messages', id, 'chat')
    const q = query(messagesRef, orderBy('createdAt', 'asc'))
    onSnapshot(q, querySnapshot => {
      let messages = []
      querySnapshot.forEach(doc => {
        messages.push(doc.data())
      })
      setMessages(messages)
    })
    const snap = await getDoc(doc(db, 'lastMessage', id))
    if(snap.data() && snap.data().from !== currentlyLoggedUser){
      await updateDoc(doc(db, 'lastMessage', id),{ unread: false })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = openChat.uid;
    const id = currentlyLoggedUser > user2 ? `${currentlyLoggedUser + user2}` : `${user2 + currentlyLoggedUser}`
    let url;

    if(img){
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`)
      const snap = await uploadBytes(imgRef, img)
      const url2 = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = url2
    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text, 
      from: currentlyLoggedUser,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || ''
    })
    await setDoc(doc(db,'lastMessage', id), {
      text,
      from: currentlyLoggedUser,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread:true
    })
    setText('')
  };
  return (
    <div className="chat_wrapper">
      <div className="chat_container">
        <div className="wrap">
          <div className="chat_left">
            <div className="chat_left_inner">
              {userList?.map((user, index) => (
                <User user={user} key={index} clickedUser={clickedUser} currentlyLoggedUser={currentlyLoggedUser} chat={openChat}/>
              ))}
            </div>
          </div>
        </div>
        <div className="chat_right">
          <div className="chat_right_inner">
            {openChat ? (
              <Message chat={openChat} handleSubmit={handleSubmit} text={text} setText={setText} img={img} setImage={setImage}/>
              ) : (
                <div className="text-center my-2 fs-4"> Select a chat</div>
                )}
                <div className="messages">{messages.length ? messages.map((msg,i) => <SingleMessage key={i} msg={msg} user1={currentlyLoggedUser}/>) : null}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
