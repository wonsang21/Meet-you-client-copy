import { combineReducers } from 'redux';

import UserPhoto from './UserPhoto';
// import Myprofile from './Myprofile'

const rootReducer = combineReducers({
  UserPhoto,
  // Myprofile
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
