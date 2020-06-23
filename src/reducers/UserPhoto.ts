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
  | { type: 'PERSONALITY_USER'; user: UserProps[] };
const initialState: UserState = {
  user: [],
};

const UserPhoto = (state = initialState, action: Action): UserState => {
  console.log(action, 'action');
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
        odlUser: action.user,
      });

    case USER_HOBBY:
      return Object.assign({}, state, {
        userHobby: action.user,
      });

    case RECENTLY_USER:
      return Object.assign({}, state, {
        recentlyUser: action.user,
      });

    case IDEALTYPE_USER:
      return Object.assign({}, state, {
        idealTypeUser: action.user,
      });

    case PERSONALITY_USER:
      return Object.assign({}, state, {
        personalityUser: action.user,
      });
    default:
      return state;
  }
};

export default UserPhoto;
