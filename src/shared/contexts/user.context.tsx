'use client';
import { useAuth } from '@clerk/nextjs';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { IUser } from '@/database/user.model';
import { getUserInfo } from '@/lib/actions/user.actions';

const UserContext = createContext<{
  userInfo: IUser | null;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | null>>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchUserInfo() {
      const user = await getUserInfo({ userId: userId || '' });

      if (user?._id) {
        setUserInfo(user);
      }
    }
    fetchUserInfo();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error('useUserContext must be used within an UserProvider');

  return context;
};
