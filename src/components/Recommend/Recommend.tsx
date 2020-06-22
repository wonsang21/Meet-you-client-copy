import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import styled from 'styled-components/native';
// import store from '../store'
import * as RootNavigation from '../../RootNavigation';
import fakedata from '../../fakeData/firstfake';
import { withNavigation } from 'react-navigation';

const ButtonContainer = styled.TouchableOpacity`
  border: 1px solid palevioletred;
  margin: auto;
  margin-top: 5px;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
`;
const Athoder = styled.Text`
  text-align: center;
  font-size: 11px;
  color: black;
`;
console.log(fakedata, '시바 잠만 이거 뭐야?');

function Recommend() {
  return (
    <View>
      <Text>여기는 새로운 추천</Text>
      <ButtonContainer
        onPress={() => this.props.navigation.navigate('Recommend', fakedata)}
      >
        <Athoder>동네 여사친들</Athoder>
      </ButtonContainer>
      <ButtonContainer
        onPress={() => this.props.navigation.navigate('Recommend', fakedata)}
      >
        <Athoder>밥 잘사주는 연상</Athoder>
      </ButtonContainer>
      <ButtonContainer
        onPress={() => this.props.navigation.navigate('Recommend', fakedata)}
      >
        <Athoder>취미가 비슷한 친구들</Athoder>
      </ButtonContainer>
      <ButtonContainer
        onPress={() => this.props.navigation.navigate('Recommend', fakedata)}
      >
        <Athoder>내 주변 친구</Athoder>
      </ButtonContainer>
    </View>
  );
}

export default Recommend;
