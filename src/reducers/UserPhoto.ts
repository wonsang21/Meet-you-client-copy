import { SET_USER, USER_RE, MY_PRO_FILE, OLD_USER, USER_HOBBY, RECENTLY_USER, IDEALTYPE_USER, PERSONALITY_USER } from "../action";

interface AppState{

}

// type Action =
//     | { type: "SET_USER"; user: []}
//     | { type: "USER_RE"; user:[] };

const UserPhoto = (state: AppState, action: Action) => {
    console.log(action,'action')
    if (state === undefined) {
        return  {}
    }
    switch (action.type) {
        
        case SET_USER :
            return Object.assign({}, state, {
                userfile: action.user
            })
        case USER_RE :
            return Object.assign({}, state, {
                userfile: action.user
            })
        case MY_PRO_FILE:
            return Object.assign({}, state, {
                myprofile: action.profile
            })
        case OLD_USER:
            return Object.assign({}, state, {
                odlUser: action.user
            })
        case USER_HOBBY:
            return Object.assign({}, state, {
                userHobby: action.user
            })
        case RECENTLY_USER:
            return Object.assign({},state,{
                recentlyUser:action.user
            })
        case IDEALTYPE_USER:
            return Object.assign({}, state, {
                idealTypeUser: action.user
            })
        case PERSONALITY_USER:
            return Object.assign({}, state, {
                personalityUser: action.user
            })
    }
    
}


export default UserPhoto