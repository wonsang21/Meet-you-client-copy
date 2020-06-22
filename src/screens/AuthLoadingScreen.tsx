import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

interface AppProps {}

interface AppState {
  userToken: string;
}

class AuthLoadingScreen extends React.Component {
  constructor(props: AppProps) {
    super(props);
  }

  // usertoken을 가져오는 함수
  getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('USERTOKEN');
      if (value !== null) {
        console.log('토큰있음', value);
        this.props.navigation.navigate('Tab'); // 메인으로 이동
      } else {
        console.log('토큰없음', value);
        this.props.navigation.navigate('Auth'); // 로그인, 회원가입 화면으로 이동
      }
    } catch (error) {
      console.log('getUserTokenError', error);
    }
  };

  componentDidMount() {
    this.getUserToken();
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default withNavigation(AuthLoadingScreen);
