import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainScreen from './src/screens/MainScreen';
import ChatsScreen from './src/screens/ChatsScreen';
import MiniGameScreen from './src/screens/MiniGameScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import reducers from "./src/reducers/index";
import { Provider } from "react-redux";
import Recommend from './src/components/Recommenduser'
import Capp from './src/containers/Capp';
import Detail from './src/components/userfile/Detail'
import { navigationRef } from './src/RootNavigation';
import { createStore, compose } from 'redux'

declare global {
  interface Window {
    devToolsExtension: typeof compose;
  }
}

const store = createStore(
  reducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);


// 로그인 및 회원가입 화면 (첫화면)
const AuthStack = createStackNavigator();

// 메인탭
const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Main" component={MainScreen} />
  </MainStack.Navigator>
);

// 채팅탭
const ChatsStack = createStackNavigator();
const ChatsStackScreen = () => (
  <ChatsStack.Navigator>
    <ChatsStack.Screen name="Chats" component={ChatsScreen} />
  </ChatsStack.Navigator>
);

// 미니게임탭
const MiniGameStack = createStackNavigator();
const MiniGameStackScreen = () => (
  <MiniGameStack.Navigator>
    <MiniGameStack.Screen name="MiniGame" component={MiniGameScreen} />
  </MiniGameStack.Navigator>
);

// 프로필 탭
const MyProfileStack = createStackNavigator();
const MyProfileStackScreen = () => (
  <MyProfileStack.Navigator>
    <MyProfileStack.Screen name="MyProfile" component={MyProfileScreen} />
  </MyProfileStack.Navigator>
);

// 로그인 성공 후 보여질 탭 네비게이터 생성
const Tab = createBottomTabNavigator();

interface AppProps {}

interface AppState {
  isLogin: boolean;
  userInfo: {};
}

class Home extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: {},
    };
  }

  loginHandler = (id: string) => {
    if (!this.state.isLogin) {
      this.setState({
        userInfo: {},
      });
    }
  };

  render() {
    console.log('this.props', this.props);
    if (this.state.isLogin === false) {
      return (

          <SafeAreaView style={{ flex: 1 }}>
            <AuthStack.Navigator initialRouteName="LogIn">
              <AuthStack.Screen name="LogIn" component={LogInScreen} />
              <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            </AuthStack.Navigator>
          </SafeAreaView>

      );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <Tab.Navigator initialRouteName="MainStack">
            <Tab.Screen name="MainStack" component={Capp} />
            <Tab.Screen name="ChatsStack" component={ChatsStackScreen} />
            <Tab.Screen name="MiniGameStack" component={MiniGameStackScreen} />
            <Tab.Screen
              name="MyProfileStack"
              component={MyProfileStackScreen}
            />
          </Tab.Navigator>
        </SafeAreaView>
    );
  }
}
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AuthStack.Navigator>
          <AuthStack.Screen name="Home" component={Home} />
          <AuthStack.Screen name="Details" component={Detail} />
          <AuthStack.Screen name="Recommend" component={Recommend} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

        
