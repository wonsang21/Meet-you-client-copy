
import { SET_USER, USER_RE, MY_PRO_FILE } from '../action';



interface AppState {}


type Action = { type: 'SET_USER'; user: [] } | { type: 'USER_RE'; user: [] };

const UserPhoto = (state: AppState, action: Action) => {
  console.log(action, 'action');
  if (state === undefined) {
    return {};
  }
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        userfile: action.user,
      });
    case USER_RE:
      return Object.assign({}, state, {
        userfile: action.user,
      });
    case MY_PRO_FILE:
      return Object.assign({}, state, {
        myprofile: action.profile,
      });
  }
};
=======


export default UserPhoto;
