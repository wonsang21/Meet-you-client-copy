import {
  SET_USER,
  // USER_RE,
  MY_PRO_FILE,
  OLD_USER,
  USER_HOBBY,
  RECENTLY_USER,
  IDEALTYPE_USER,
  PERSONALITY_USER,
} from '../action';
import { UserProps, UserState } from './type';

type Action =
  | { type: 'SET_USER'; user: UserProps[] }
  | { type: 'MY_PRO_FILE'; user: UserProps[] }
  | { type: 'OLD_USER'; user: UserProps[] }
  | { type: 'USER_HOBBY'; user: UserProps[] }
  | { type: 'RECENTLY_USER'; user: UserProps[] }
  | { type: 'IDEALTYPE_USER'; user: UserProps[] }
  | { type: 'PERSONALITY_USER'; user: UserProps[] }
  | { type: 'MINIGAME_SCORE'; point: number };
const initialState: UserState = {
  user: [],
};

const UserPhoto = (state = initialState, action: Action): UserState => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        userfile: action.user,
      });

    case MY_PRO_FILE:
      return Object.assign({}, state, {
        myprofile: action.user,
      });

    case OLD_USER:
      return Object.assign({}, state, {
        older: action.user,
      });

    case USER_HOBBY:
      return Object.assign({}, state, {
        hobby: action.user,
      });

    case RECENTLY_USER:
      return Object.assign({}, state, {
        recently: action.user,
      });

    case IDEALTYPE_USER:
      return Object.assign({}, state, {
        idealType: action.user,
      });

    case PERSONALITY_USER:
      return Object.assign({}, state, {
        personality: action.user,
      });
    default:
      return state;
  }
};

export default UserPhoto;
