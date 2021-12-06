import React from 'react'
import ProfilePic from '../assets/annonymous.png';

export default function UserList({user}) {
    return (
        <div>
            <div style={{display:'flex'}} className="my-4">
            <img src={ProfilePic} alt="" className="rounded-circle" style={{width: '60px'}}/>
            <h6 className="mt-1">{user?.name}</h6>
            <hr />
            </div>
        </div>
    )
}
