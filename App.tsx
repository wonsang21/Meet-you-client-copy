import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main/Main'
import reducers from "./src/reducers/index";
import { Provider } from "react-redux";
import Recommend from './src/components/Recommenduser'
import Capp from './src/containers/Capp';
// import store from './src/store';
// import { createStore } from "redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Capp} />
          <Stack.Screen name="Details" component={Detail} />
          <Stack.Screen name="Recommend" component={Recommend} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}