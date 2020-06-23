import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import Old from './Old';
import {
  setUser,
  myProFile,
  oldUser,
  userHobby,
  recentlyUser,
  idealTypeUser,
  personalityUser,
} from '../action';
import { View, AsyncStorage } from 'react-native';
import axios from 'axios';
import { UserProps } from '../reducers/type';

export interface Props {
  userfile: UserProps;
  dispatch: (route: any) => void;
}
export interface State {
  userId: any;
  navigation: any;
}

class App extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      userId: 0,
      navigation: undefined,
    };
    //state값을 getUserfile에 setstate를 한다.
  }

  async componentDidMount() {
    await this.getUserfile();
    this.getRecentlyUser(), this.getOldUser();
    this.getHobbyUser();
    this.getIdealTypeUser();
    this.getpersonalityUser();
  }
  //초기에 로그인한 유저 정보와 랜던 유저의 정보 2명
  async getUserfile() {
    const value = await AsyncStorage.getItem('USERTOKEN');
    // const value =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuOFjCIsInBhc3N3b3JkIjoiYWQ5Y2U2NzEzZDA1N2MwYmIwOWU3OTcxZTcxNzhmMWFiODk1MGZjZCIsImlhdCI6MTU5Mjg1MTkxNCwiZXhwIjoxNTkyOTM4MzE0fQ.0IOMmrHFwcn60KOu6Zwv4FCddom4ptRa4Cr8TDg_KyI';
    console.log(value);
    return new Promise((resolve, reject) => {
      resolve(
        axios({
          url: 'http://172.30.1.58:5000/user/information',
          method: 'get',
          headers: {
            Authorization: `Basic ${value}`,
          },
        })
          .then((data) => {
            this.props.dispatch(myProFile(data.data[0]));
            this.props.dispatch(setUser(data.data[1]));
            console.log(data, '이거 무얏');
            this.setState({
              userId: data.data[0].id,
            });
          })
          .catch((error) => {
            console.log(error, 'error');
          }),
      );
      reject('에러');
    });
  }
  //로그인한 유저보다 나이가 많은 사람
  getOldUser() {
    axios({
      url: 'http://172.30.1.58:5000/main/older',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(oldUser(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //최근 가입한 사람
  getRecentlyUser() {
    axios({
      url: 'http://172.30.1.58:5000/main/recently',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(recentlyUser(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //취미 같은 사람
  getHobbyUser() {
    console.log('통과');
    axios({
      url: 'http://172.30.1.58:5000/main/hobby',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(userHobby(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //이상형  personalityUser
  getIdealTypeUser() {
    console.log('통과');
    axios({
      url: 'http://172.30.1.58:5000/main/idealType',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(idealTypeUser(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //성격이 비슷한
  getpersonalityUser() {
    console.log('통과');
    axios({
      url: 'http://172.30.1.58:5000/main/personality',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(personalityUser(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  render() {
    console.log(this.props, '이거뭐ssssssssssssss야');
    return (
      <View>
        <Main
          userId={this.state.userId}
          navigation={this.props.navigation}
        ></Main>
        <Old navigation={this.props.navigation}></Old>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log(state, 'stateaaa');
  return {
    userfile: state.UserPhoto,
  };
};
export default connect(mapStateToProps)(App);
