import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class MiniGameScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapContent}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                AsyncStorage.clear();
                alert('유저토큰 삭제 및 로그인유지 해제');
                this.props.navigation.navigate('AuthLoading'); // 작동됨
              }}
            >
              <Text style={styles.buttonTitle}>로그아웃 테스트</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapContent}>
          <View style={styles.content}></View>
        </View>
        <View style={styles.wrapContent}>
          <View style={styles.content}></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: 'white',
  },
  wrapContent: {
    width: wp('90%'),
    height: wp('90%'),
    paddingBottom: wp('5%'),
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: wp('10%'),
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

export default withNavigation(MiniGameScreen);
