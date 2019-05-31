import {
  SIGN_IN,
  SIGN_OUT
} from './types';

export const signIn = token => {
  return {
    type: SIGN_IN,
    payload: token
  };
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
}