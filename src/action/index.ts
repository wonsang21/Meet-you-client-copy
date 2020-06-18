export const SET_USER = 'SET_USER'
export const USER_RE = 'USER_RE'
export const MY_PRO_FILE = 'MY_PRO_FYLE'
export const OLD_USER = 'OLD_USER'

export const setUser = (user:[]) => ({
    type: SET_USER,
    user
})

export const UserRE = () => ({
    type: USER_RE,
    
})

export const myProFile = (profile: any) => ({
    type: MY_PRO_FILE,
    profile
})

export const oldUser = (user:[]) =>({
    type: OLD_USER,
    user
})