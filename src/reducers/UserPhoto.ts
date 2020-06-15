import fakeData from "../fakeData/nextfakeData"
import firstfake from "../fakeData/firstfake"
import { SET_USER, USER_RE } from "../action";

interface AppState{

}

type Action =
    | { type: "SET_USER"; }
    | { type: "USER_RE"; };

const UserPhoto = (state: AppState, action: Action) => {
    console.log(action,'action')
    if (state === undefined) {
        return  {}
    }
    switch (action.type) {
        
        case SET_USER :
            return Object.assign({}, state, {
                userfile: firstfake
            })
        case USER_RE :
            return Object.assign({}, state, {
                userfile: fakeData
            })
    }
}


export default UserPhoto