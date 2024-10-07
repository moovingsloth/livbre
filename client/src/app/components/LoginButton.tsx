"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/store';
import { fetchUser, logoutUser } from '../../actions/userActions';
import { Button } from '../../components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
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

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (user) {
    return (
      <Button
        variant="default"
        className="bg-red-600 hover:bg-red-700 text-white"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    );
  }

  return (
    <Link href="/auth/google">
      <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
        <LogIn className="mr-2 h-4 w-4" /> Login
      </Button>
    </Link>
  );
};

export default LoginButton;