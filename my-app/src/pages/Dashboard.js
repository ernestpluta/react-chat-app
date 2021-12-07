import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebase/firebase';
import {
  Form,
  Alert,
  Spinner,
  Button,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@firebase/storage';
import { onSnapshot } from '@firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProfilePic from '../assets/annonymous.png';
import Camera from '../components/Camera';
import './Dashboard.css';
import DeleteProfilePic from '../components/DeleteProfilePic';
import { updateProfile } from '@firebase/auth';
export default function Dashboard() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [img, setImage] = useState('');
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();


  useEffect(() => {
    if (auth.currentUser) {
      // getDoc(doc(db, 'users', auth.currentUser.uid)).then((doc) => {
      //   if (doc.exists) setUser(doc.data());
      // });
      onSnapshot(doc(db, 'users', auth.currentUser.uid), async (doc) => {
        if (doc.exists) setUser(doc.data());
      })
    }
    if (img) {
      const uploadImage = async () => {
        try {
          setIsPending(true);
          const imageRef = ref(storage,`profilePic/${new Date().getTime()} - ${img.name}`);
          // if(user.profilePicturePath){
          //   await deleteObject(ref(storage, user.profilePicture))
          // }
          const snapshot = await uploadBytes(imageRef, img);
          const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
          console.log(url)
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            profilePicture: url,
            profilePicturePath: snapshot.ref.fullPath,
          });
          await updateProfile(auth.currentUser, { photoURL: url });
          setImage('');
          setIsPending(false);
          document.location.reload()
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImage();
    }
  }, [img]);
  const deleteImage = async () => {
    try{
      const res = window.confirm('Are you sure you want to delete your profile picture?')
      if(res){
        setIsPending(true);
        await deleteObject(ref(storage, user.profilePicture))
        await updateProfile(auth.currentUser, { photoURL: '' });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          profilePicture: '',
          profilePicturePath: ''
        });
      setIsPending(false);
      document.location.reload()
      }
    }
    catch(err){
      console.log(err.message)
    }
  }
  return (
    <div>
      <Form className="mx-auto dashboard" style={{ maxWidth: '600px'}}>
        {error && <Alert variant="danger">{error} </Alert>}
        <Form.Group className="" controlId="formBasicEmail">
          <>
            <Container>
              <Row className="d-flex align-items-center">
                <Col xs={12} md={4} className="profile_container">
                  <div className="img_container ">
                    {isPending && (
                      <div className="text-center" style={{ width: '140px', height: '140px' }}>
                        <Spinner animation="border" role="status" className="mt-5">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    )}
                      {!isPending && (
                        <>
                        <Image
                        src={auth.currentUser?.photoURL || ProfilePic}
                        roundedCircle
                        style={{ width: '140px', height: '140px' }}
                        className="my-2"
                      />
                      <div className="overlay"></div>
                      <label htmlFor="pic" className="camera-pic">
                        <Camera userPic={user?.profilePicture}/>
                      </label>
                        <DeleteProfilePic className="trash" deleteImage={deleteImage} userPic={user?.profilePicture}/>
                      {/* {user?.ProfilePicture ? <DeleteProfilePic className="trash" deleteImage={deleteImage}/> : null} */}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="pic"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                        </>
                      )}
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <h2>{user?.name} {user?.lastName || ''}</h2>
                  <p>{user?.email}</p>
                  <hr />
                  <p>Created At: {user?.createdAt.toDate().toDateString()}</p>
                </Col>
              </Row>
              {/* <hr />
                <Col xs={12} md={8}>
                  <h2>Reset Password</h2>
                </Col>
                <Row className="d-flex align-items-center">
                  <Col>
                    <div className="">Set Username</div>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 w-25 py-2 ps-auto"
                >
                  Update
                </Button> */}
            </Container>
          </>
        </Form.Group>

        {/* <Button variant="primary" type="submit" className="mt-4 w-100 py-2">
          Sign Up
        </Button> */}
      </Form>
    </div>
  );
}
