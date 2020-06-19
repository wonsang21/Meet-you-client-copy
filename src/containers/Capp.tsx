import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Main from './Main';
import Old from './Old';
import { setUser, myProFile, oldUser, userHobby} from '../action';
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
      userId : 0
    }
    //state값을 getUserfile에 setstate를 한다.
  }

  componentDidMount() {
    this.getUserfile();
 
    this.getOldUser()
  }
  getUserfile() {
    axios({
      url: 'http://192.168.0.16:5000/user/information',
      method: 'get',
      headers: {
        Authorization: `Basic ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuywqOuLqOu5hCIsInBhc3N3b3JkIjoiZDZiZWQ3MTBkYTNkNzRhZWEwMDZkOGFhYzE4YzVmODQ5OWE4MTYxZiIsImlhdCI6MTU5MjQ4MDY2MCwiZXhwIjoxNTkyNTY3MDYwfQ.kcic-giPE-3p_paURXcvk_3WRy0gq8amtPcq6HXCWdw'}`,
      },
    })
      .then((data) => {
        this.props.dispatch(myProFile(data.data[0]));
        this.props.dispatch(setUser(data.data[1]));
        console.log(data,'이거 무얏')
        this.setState({
          userId:data.data[0].id
        })
      })
      .catch((error) => {
        console.log(error, 'error');
      });   
  }
  getOldUser() {
    axios({
      url: 'http://192.168.0.16:5000/main/older',
      method: 'get',
      params: {
        userId: 1,
      },
    })
      .then((data) => {
        this.props.dispatch(oldUser(data.data))
        console.log('axasyyyyyyyyyyyyyyyyyyyyyyyyfios');
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  
  // getHobbyUser() {
  //   console.log('axasyyyyyyyyyyyyyyyyyyyyyyyyfiossssssssssssssss');
  //   axios({
  //     url: 'http://192.168.0.16:5000/main/hobby',
  //     method: 'get',
  //     params: {
  //       userId: 1,
  //     },
  //   })
  //     .then((data) => {
  //       console.log('통과ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ되나');
  //       this.props.dispatch(userHobby(data.data))
  //     })
  //     .catch((error) => {
  //       console.log(error, 'error');
  //     });
  // }

  render() {
    console.log(this.props, '이거뭐ssssssssssssss야');
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
