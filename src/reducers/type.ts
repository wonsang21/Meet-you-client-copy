export interface UserProps {
  address: string;
  age: string;
  blood: string;
  drinking: string;
  gender: string;
  hobbies: string[];
  id: number;
  idealTypes: string[];
  job: string;
  nickname: string;
  password: string;
  personalities: string[];
  point: number;
  profile_Photo: any;
  school: string;
  signUpCreateTime: string;
  smoking: string;
  username: string;
}
export interface UserState {
  user: UserProps[];
}
export interface ReCommend {
  UserPhoto: UserProps[];
}
export interface MainProps {
  userfile: {
    UserPhoto: {
      userfile?: UserProps[];
    };
  };
  onClick: () => void;
  navigation: {
    navigate: (route: string, params: { user: UserProps }) => void;
  };
}

export interface Action {
  user: UserProps[];
  type: string;
}
