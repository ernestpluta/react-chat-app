import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebase/firebase';
import {
  Form,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@firebase/storage';
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


  useEffect(() => {
    if (auth.currentUser) {
      getDoc(doc(db, 'users', auth.currentUser.uid)).then((doc) => {
        if (doc.exists) setUser(doc.data());
      });
    }
    if (img) {
      const uploadImage = async () => {
        try {
          setIsPending(true);
          const imageRef = ref(storage,`profilePic/${new Date().getTime()} - ${img.name}`);
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
                        className="profile-pic my-2"
                      />
                      <div className="overlay"></div>
                      <label htmlFor="pic" className="camera-pic">
                        <Camera userPic={user?.profilePicture}/>
                      </label>
                        <DeleteProfilePic className="trash" deleteImage={deleteImage} userPic={user?.profilePicture}/>
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
                  <h2 >{user?.name} {user?.lastName || ''}</h2>
                  <p>{user?.email}</p>
                </Col>
              </Row>
            </Container>
          </>
        </Form.Group>
      </Form>
    </div>
  );
}
