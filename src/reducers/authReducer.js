import {
  SIGN_IN,
  SIGN_OUT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
};