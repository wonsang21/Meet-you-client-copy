import { UserProps, Action } from '../reducers/type';

export const SET_USER = 'SET_USER' as const;
// export const USER_RE = 'USER_RE';
export const MY_PRO_FILE = 'MY_PRO_FILE' as const;
export const OLD_USER = 'OLD_USER' as const;
export const USER_HOBBY = 'USER_HOBBY' as const;
export const RECENTLY_USER = 'RECENTLY_USER' as const;
export const IDEALTYPE_USER = 'IDEALTYPE_USER' as const;
export const PERSONALITY_USER = 'PERSONALITY_USER' as const;
export const MINIGAME_SCORE = 'MINIGAME_SCORE' as const;

export const setUser = (user: UserProps[]): Action => ({
  type: SET_USER,
  user,
});

export const myProFile = (user: UserProps[]): Action => ({
  type: MY_PRO_FILE,
  user,
});

export const older = (user: UserProps[]): Action => ({
  type: OLD_USER,
  user,
});
export const hobby = (user: UserProps[]): Action => ({
  type: USER_HOBBY,
  user,
});
export const recently = (user: UserProps[]): Action => ({
  type: RECENTLY_USER,
  user,
});
export const idealType = (user: UserProps[]): Action => ({
  type: IDEALTYPE_USER,
  user,
});
export const personality = (user: UserProps[]): Action => ({
  type: PERSONALITY_USER,
  user,
});

