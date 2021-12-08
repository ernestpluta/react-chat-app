import { useEffect, useState } from 'react';
import { onSnapshot, doc } from '@firebase/firestore';
import { db } from '../firebase/firebase';
import ProfilePic from '../assets/annonymous.png';
import './User.css';
import moment from 'moment/moment.js';
export default function User({ user, clickedUser, currentlyLoggedUser, chat }) {
    const user2 = user?.uid
    const [data, setData] = useState(null)
    useEffect(() => {
        const id = currentlyLoggedUser > user2 ? `${currentlyLoggedUser + user2}` : `${user2 + currentlyLoggedUser}`
        let unsub = onSnapshot(doc(db, 'lastMessage', id), doc => {
            setData(doc.data())
            console.log(doc.data())
        })
        return unsub
    },[])
  return (
    <div className={`user_container ${chat?.name === user?.name && 'selected_user'}`} onClick={() => clickedUser(user)}>
      <div className="user_wrapper">
          <div className="user_image_status">
            <img src={user?.profilePicture || ProfilePic} alt="" className="user-profile rounded-circle" />
            <div className="user_status" style={user.isOnline ? {background: '#27b738'} : {background: '#c43c3c'}}></div>
          </div>
        <div className="user_name_message">
            <div className="d-flex">
          <h6 className="mt-2 d-inline-block">
            {user?.name} {user?.lastName}
          </h6>
          <span className="d-flex h-25 my-auto ms-2">
              {data?.from !== currentlyLoggedUser && data?.unread && <span className="unread" ></span>}
          </span>
          </div>
          {data && (
              <p className="trunk">
                  <strong>{data.from === currentlyLoggedUser ? 'Me: ' : null}</strong>
                  {data.text}
            </p>
          )}
        </div>
        <div className="user_hour ms-auto me-4 ">{moment(data?.createdAt.toDate()).format('LT')}</div>
      </div>
    </div>
  );
}
