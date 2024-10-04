import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/store';
import { fetchUser } from '../../actions/userActions';
import { Button } from '../../components/ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

const LoginButton: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('User State:', user); // Log the user state to verify
  }, [user]);

  if (user) {
    return (
      <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
        Logged in as {user.googleId}
      </Button>
    );
  }

  return (
    <Link href="/auth/google">
      <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
        <LogIn className="mr-2 h-4 w-4" /> Login
      </Button>
    </Link>
  );
};

export default LoginButton;