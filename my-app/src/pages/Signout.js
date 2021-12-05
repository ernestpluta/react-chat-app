import { updateDoc, doc} from '@firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { useNavigate } from 'react-router';
import { signOut } from '@firebase/auth';
import { useAuth } from '../hooks/useAuth';
export default function Signout() {
  const navigate = useNavigate()

  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { isOnline: false });
    await signOut(auth)
  };

  return (
    <div>
      <div
        className=" black d-flex align-items-center"
        variant="outline-primary"
        onClick={handleSignout}
      >
        Sign Out
      </div>
    </div>
  );
}
