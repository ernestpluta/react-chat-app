import React, { useState, useEffect } from 'react'
import ProfilePic from '../assets/annonymous.png';
import { getDoc, doc, collection, getDocs, collectionGroup } from '@firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { getIdToken } from '@firebase/auth';
export default function UserList({user}) {
    const [users,setUsers] = useState(null)
    // getDocs(collection(db, 'users')).then((doc) => {
    //     if (doc.exists) setUsers(doc.data());
    //     console.log(doc.data())
    //   });
    // useEffect(() => {
    //     const getAllUsers = async () => {
    //         // const allUsers =  await getDocs(collection(db, 'users')).then((doc) => {
    //         //     console.log(doc.docs[0]._document.data.value.mapValue.fields)
    //         // })
    //         const data = await getDocs(collection(db,'users'))
    //         console.log(data)
    //     }
    //     getAllUsers()
    // },[])
  
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
