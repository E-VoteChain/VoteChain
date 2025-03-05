import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import { authReducer, initialState } from './authReducer';
import { AuthProviderProps } from './types';

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
