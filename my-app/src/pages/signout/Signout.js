import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../hooks/useAuth';
export default function Signout() {
  const { signout } = useAuth()

  return (
    <div>
      <Button
        className=" ms-4 px-4 black text-black"
        variant="outline-success"
        onClick={signout}
      >
        Sign Out
      </Button>
    </div>
  );
}
