import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styled from "styled-components/native";
import * as RootNavigation from '../RootNavigation';

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 150px;
  height: 150px;
`;
const UserNameAge = styled.Text`
   font-size: 11px
     
`;


const Gallery = styled.View`
  margin: auto;
  width: 50%;
  padding: 10px;
`;


const UserProfile = styled.Text`
  position: relative;
  left: 30px;
`;
const ButtonContainer = styled.TouchableOpacity`
  background-color: red
  margin: auto;
  width: 50%;
  padding: 10px;
`;

interface Props {
  route: any;
  
}

interface User {
  profile_photo: any;
  username: React.ReactNode;
  age: React.ReactNode;
}
//재사용 할수 있을까? 추천 기능을?


function OldUser(props) {
  console.log(props.route.params,'fake')
  return props.route.params ? (
        <View style={{ flexDirection: "row" }}>
      {props.route.params.oldUser.map((user: User, index: number) => (<Gallery key={index}>
              <TouchableOpacity onPress={() => RootNavigation.navigate('Details', { user: user })}>
                <StylePhoto source={{ uri: user.profile_photo }} />
                <UserProfile>{user.username}</UserProfile>
                <UserProfile>{user.age}</UserProfile>
              </TouchableOpacity>
            </Gallery>))}
        </View>
    ) : <View></View>
}

export default OldUser