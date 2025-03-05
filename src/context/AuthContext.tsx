import React from 'react';
import { AuthContextProps } from './types';

const defaultAuthState = {
  is_connected: false,
  account: '',
  instance: null,
  is_admin: false,
  flag: false,
};

const noop = () => {};

const AuthContext = React.createContext<AuthContextProps>({
  state: defaultAuthState,
  dispatch: noop,
});

export default AuthContext;
