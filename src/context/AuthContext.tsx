import React from 'react';
import { AuthContextProps } from './types';

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;
