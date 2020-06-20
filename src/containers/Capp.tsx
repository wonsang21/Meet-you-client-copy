import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Main from './Main';
import Old from './Old';
import { setUser, myProFile, oldUser, userHobby, recentlyUser, idealTypeUser, personalityUser} from '../action';
import Recomment from '../components/Recommend/Recommend';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';

export interface Props {
  userfile: {};
  onClick?: () => void;
  navigation?: any;
  dispatch: any;
  randomUser: any;
}
export interface State {
  userfile?: {};
  userId:number
}

class App extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      userId: 0
    }
    //state값을 getUserfile에 setstate를 한다.
  }

   async componentDidMount() {
    await this.getUserfile();
     this.getRecentlyUser(),
     this.getOldUser()
     this.getHobbyUser()
     this.getIdealTypeUser()
  }
  //초기에 로그인한 유저 정보와 랜던 유저의 정보 2명
  getUserfile() {
    return new Promise((resolve, reject) => {
      resolve(axios({
        url: 'http://172.30.1.58:5000/user/information',
        method: 'get',
        headers: {
          Authorization: `Basic ${'eyJhbciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuyWtOugpOuLqOu5hOyVvCIsInBhc3N3b3JkIjoiZDZiZWQ3MTBkYTNkNzRhZWEwMDZkOGFhYzE4YzVmODQ5OWE4MTYxZiIsImlhdCI6MTU5MjU1OTM1MiwiZXhwIjoxNTkyNjQ1NzUyfQ.mdOeh6xJ0A3FbebiwbtTt3de4yc6q3XzFzdAXHKgTyE'}`,
        },
      })
        .then((data) => {
          this.props.dispatch(myProFile(data.data[0]));
          this.props.dispatch(setUser(data.data[1]));
          console.log(data, '이거 무얏')
          this.setState({
            userId: data.data[0].id
          })
        })
        .catch((error) => {
          console.log(error, 'error');
        }) )
        reject('에러')  
    }) 
    
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
        this.props.dispatch(oldUser(data.data))
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
        this.props.dispatch(recentlyUser(data.data))
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
//취미 같은 사람
  getHobbyUser() {
    console.log('통과')
    axios({
      url: 'http://172.30.1.58:5000/main/hobby',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(userHobby(data.data))
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //이상형  personalityUser
  getIdealTypeUser() {
    console.log('통과')
    axios({
      url: 'http://172.30.1.58:5000/main/idealType',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(idealTypeUser(data.data))
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //성격이 비슷한
  getpersonalityUser() {
    console.log('통과')
    axios({
      url: 'http://172.30.1.58:5000/main/personality',
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        this.props.dispatch(personalityUser(data.data))
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  render() {
    console.log(this.props.userfile.myprofile, '이거뭐ssssssssssssss야');
    return (
      <View>
        <Main userId={this.state.userId}></Main>
        <Old ></Old>
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
