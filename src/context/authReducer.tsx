import { AuthState, AuthAction } from './types';

export const initialState: AuthState = {
  is_connected: false,
  account: '',
  instance: null,
  is_admin: false,
  flag: false,
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        is_connected: true,
        account: action.payload?.account || '',
        instance: action.payload?.instance || null,
        is_admin: action.payload?.is_admin || false,
        flag: action.payload?.flag || false,
      };

    case 'REGISTER':
      return { ...state, flag: false };

    default:
      return state;
  }
};
