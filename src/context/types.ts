import { Contract } from 'ethers';

export interface AuthState {
  is_connected: boolean;
  account: string;
  instance: Contract | null;
  is_admin: boolean;
  flag: boolean;
}

export interface AuthAction {
  type: 'LOGIN' | 'REGISTER';
  payload?: Partial<AuthState>;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
