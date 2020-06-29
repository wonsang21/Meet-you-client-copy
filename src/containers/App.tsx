import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import Old from './Recommend';
import {
  setUser,
  myProFile,
  personality,
  idealType,
  hobby,
  recently,
  older,
} from '../action';
import { UserProps } from '../reducers/type';

import AsyncStorage from '@react-native-community/async-storage';
import { View, ScrollView } from 'react-native';
import getEnvVars from '../../environments';
import axios from 'axios';

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
    this.getHobbyUser();
    this.getRecentlyUser(), this.getOldUser();
    this.getIdealTypeUser();
    this.getpersonalityUser();
  }
  //초기에 로그인한 유저 정보와 랜던 유저의 정보 2명
  async getUserfile() {
    const { apiUrl } = getEnvVars();
    const value = await AsyncStorage.getItem('USERTOKEN');
    return new Promise((resolve, reject) => {
      resolve(
        axios({
          url: `http://${apiUrl}/user/information`,
          method: 'get',
          headers: {
            Authorization: `Basic ${value}`,
          },
        })
          .then((data) => {
            this.props.dispatch(myProFile(data.data[0]));
            this.props.dispatch(setUser(data.data[1]));
            this.setState({
              userId: data.data[0].id,
            });
            AsyncStorage.setItem('USERID', data.data[0].username);
            AsyncStorage.setItem('USERNICKNAME', data.data[0].nickname);
            AsyncStorage.setItem('USERPHOTO', data.data[0].profile_Photo);
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
    const { apiUrl } = getEnvVars();
    axios({
      url: `http://${apiUrl}/main/older`,
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(older(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //최근 가입한 사람
  getRecentlyUser() {
    const { apiUrl } = getEnvVars();
    axios({
      url: `http://${apiUrl}/main/recently`,
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(recently(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //취미 같은 사람
  getHobbyUser() {
    const { apiUrl } = getEnvVars();
    console.log('통과');
    axios({
      url: `http://${apiUrl}/main/hobby`,
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        console.log(data.data, '========f=f=f=f=f==f=ff==');
        this.props.dispatch(hobby(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //이상형  personalityUser
  getIdealTypeUser() {
    const { apiUrl } = getEnvVars();
    console.log('통과');
    axios({
      url: `http://${apiUrl}/main/idealType`,
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(idealType(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //성격이 비슷한
  getpersonalityUser() {
    const { apiUrl } = getEnvVars();
    console.log('통과');
    axios({
      url: `http://${apiUrl}/main/personality`,
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(personality(data.data));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Main
            userId={this.state.userId}
            navigation={this.props.navigation}
          ></Main>
          <Old navigation={this.props.navigation}></Old>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    userfile: state.UserPhoto,
  };
};
export default connect(mapStateToProps)(App);
