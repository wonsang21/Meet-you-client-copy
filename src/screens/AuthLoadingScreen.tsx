import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';

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
        this.props.navigation.navigate('Tab');
      } else {
        console.log('토큰없음', value);
        this.props.navigation.navigate('Auth');
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
