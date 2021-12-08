import React, { useEffect, useRef } from 'react';
import moment from 'moment/moment.js';

export default function SingleMessage({ msg, user1}) {
    const scrollRef = useRef()
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: 'smooth', block: 'start'})
    },[msg])
  return (
    <div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`} ref={scrollRef}>
      <p className={msg.from === user1 ? 'me' : 'friend'}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null} {msg.text}{' '}
        <br /> <small>{moment(msg.createdAt.toDate()).format('LT')}</small>
      </p>
    </div>
  );
}
