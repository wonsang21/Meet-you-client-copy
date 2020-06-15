import { combineReducers } from 'redux';
import UserPhoto from './UserPhoto'

const rootReducer = combineReducers({
    UserPhoto
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>