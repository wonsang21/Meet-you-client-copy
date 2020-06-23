import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import LogInScreen from './src/screens/LogInScreen';
// import SignUpScreen from './src/screens/SignUpScreen';
import MainScreen from './src/screens/MainScreen';
=======

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SmsAuthScreen from './src/screens/SmsAuthScreen';
>>>>>>> a32eeca8b1a7b2baf3adaef9372ecf5393ae500c
import ChatsScreen from './src/screens/ChatsScreen';
import MiniGameScreen from './src/screens/MiniGameScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import rootReducer from './src/reducers/index';
import { Provider } from 'react-redux';
import RecommendRander from './src/components/RecommendRander';
import Capp from './src/containers/Capp';
import Main from './src/components/Main/Main';
import Detail from './src/components/userfile/Detail';
import { createStore, compose } from 'redux';

declare global {
  interface Window {
    devToolsExtension: typeof compose;
  }
}

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
);

<<<<<<< HEAD
// //로그인, 회원가입 스택
// const AuthStack = createStackNavigator({
//   LogIn: {
//     screen: LogInScreen,
//   },
//   SignUp: {
//     screen: SignUpScreen,
//   },
// });

// 메인 스택
const MainStack = createStackNavigator({
  CMain: {
    screen: Capp,
  },
  Main: {
    screen: Main,
  },
  Details: {
    screen: Detail,
  },
  RecommendRander: {
    screen: RecommendRander,
  },
});

=======
// //로그인, sms인증, 회원가입 스택
const AuthStack = createStackNavigator({
  LogIn: {
    screen: LogInScreen,
  },
  SmsAuth: {
    screen: SmsAuthScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
});

// 메인 스택
const MainStack = createStackNavigator({
  Main: {
    screen: Capp,
  },
  Details: {
    screen: Detail,
  },
  Recommend: {
    screen: Recommend,
  },
});

>>>>>>> a32eeca8b1a7b2baf3adaef9372ecf5393ae500c
// 채팅 스택
const ChatsStack = createStackNavigator({
  Chats: {
    screen: ChatsScreen,
  },
});

// 미니게임 스택
const MiniGameStack = createStackNavigator({
  MiniGame: {
    screen: MiniGameScreen,
  },
});

// 프로필 스택
const MyProfileStack = createStackNavigator({
  MyProfile: {
    screen: MyProfileScreen,
  },
});

// 로그인 성공 후 보여질 탭 네비게이터 생성
const TabStack = createBottomTabNavigator(
  {
    MainStack,
    ChatsStack,
    MiniGameStack,
    MyProfileStack,
  },
  {
    initialRouteName: 'MainStack',
  },
);

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
<<<<<<< HEAD
    // Auth: AuthStack,
=======
    Auth: AuthStack,
>>>>>>> a32eeca8b1a7b2baf3adaef9372ecf5393ae500c
    Tab: TabStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(RootStack);

interface AppProps {}

interface AppState {
  userToken: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
<<<<<<< HEAD
        {/* <NavigationContainer ref={navigationRef}> */}
          <SafeAreaView style={{ flex: 1 }}>
            <AppContainer></AppContainer>
          </SafeAreaView>
        {/* </NavigationContainer> */}
=======
        <SafeAreaView style={{ flex: 1 }}>
          <AppContainer ref={navigationRef}></AppContainer>
        </SafeAreaView>
>>>>>>> a32eeca8b1a7b2baf3adaef9372ecf5393ae500c
      </Provider>
    );
  }
}

export default App;
