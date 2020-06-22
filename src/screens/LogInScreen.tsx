import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import getEnvVars from '../../environments';

interface AppProps {}

interface AppState {
  username: any;
  password: any;
}
class LogInScreen extends Component<AppProps, AppState> {
  constructor(props: Readonly<AppProps>) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  // 아이디 비밀번호 입력시 state값 최신화
  handleInputValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // 로그인 성공시 토큰값 저장
  setUserToken = async (value: string) => {
    try {
      await AsyncStorage.setItem('USERTOKEN', value);
      console.log('토큰저장완료');
    } catch (error) {
      console.log('setUserTokenError', error);
    }
  };

  // 로그인 기능
  handleLogin = () => {
    const { username, password } = this.state;
    const { apiUrl } = getEnvVars();
    if (username && password) {
      console.log('env ip주소', apiUrl);
      axios
        .post(`http://${apiUrl}/user/login`, this.state) // 데이터 넘어감
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log('로그인 토큰값', res.data.accessToken);
            this.setUserToken(res.data.accessToken);
            alert('로그인 성공');
            this.props.navigation.navigate('AuthLoading'); // AuthLoadingScreen으로 이동
          }
        })
        .catch((error) => {
          console.log('axios 로그인 에러', error);
          alert('아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다');
        });
    } else {
      alert('빠짐없이 입력하세요');
    }
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Meet-you</Text>
        </View>
        <View style={styles.formArea}>
          <TextInput
            style={styles.textForm}
            placeholder={'ID'}
            onChangeText={(txt) => this.handleInputValue('username', txt)}
          />
          <TextInput
            style={styles.textForm}
            placeholder={'Password'}
            onChangeText={(txt) => this.handleInputValue('password', txt)}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleLogin();
            }}
          >
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SmsAuth')}
          >
            <Text style={styles.buttonTitle}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(LogInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    justifyContent: 'center',
  },
  titleArea: {
    width: '100%',
    padding: wp('10%'),
    alignItems: 'center',
  },
  title: {
    fontSize: wp('10%'),
  },
  formArea: {
    width: '100%',
    paddingBottom: wp('10%'),
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: '#888',
    width: '100%',
    height: hp('5%'),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  buttonArea: {
    width: '100%',
    height: hp('5%'),
  },
  button: {
    backgroundColor: '#46c3ad',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
  },
});
