'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface CurrentAuthContextType {
  username: string;
  handleUsernameChange: any;
}

const AuthContext = createContext<CurrentAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = useCallback((username: string) => {
    setUsername(username);
  }, []);

  return (
    <AuthContext.Provider value={{ username, handleUsernameChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('authContext has to be used within <AuthContext.Provider>');
  }
  return authContext;
};
