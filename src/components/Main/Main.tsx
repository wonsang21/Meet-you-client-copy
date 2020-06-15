import React,{Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button} from 'react-native';
import styled from "styled-components/native";
// import store from '../../store'
import * as RootNavigation from '../../RootNavigation';

interface Props {
  userfile:undefined|any, 
  onClick: () => void, 
}



const Gallery = styled.View`
  margin: auto;
  width: 50%;
  padding: 10px;
`;

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 150px;
  height: 150px;
`;

const UserProfile = styled.Text`
  position: relative;
  left: 30px;
`;
const ButtonContainer = styled.TouchableOpacity`
  border: 1px solid palevioletred;
  margin: auto;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
`;

const Athoder = styled.Text`
  text-align: center;
  font-size: 11px;
  color: black;
`


function Main({ userfile, onClick }: Props) {

  console.log(userfile,'요로로로로')
  if (userfile.UserPhoto.userfile === undefined) {
    console.log('통과')
    return(
      <View></View>
    )
  }
        return (
          <View style={{flexDirection: "column" }}>
            <View style={{flexDirection: "row" }}>
              {userfile.UserPhoto.userfile.map((user: { profile_photo: string; username: string; age: string; },index:number) => (
                <Gallery key={index}>
                  <TouchableOpacity onPress={function()  {return RootNavigation.navigate('Details', { user: user })}}>
                    <StylePhoto source={{ uri: user.profile_photo }} />
                    <UserProfile>{user.username}</UserProfile>
                    <UserProfile>{user.age}</UserProfile>
                  </TouchableOpacity>
                </Gallery>
              ))}
            </View>
            <ButtonContainer onPress={onClick}>
              <Athoder >다른사람 추천</Athoder>
            </ButtonContainer>
          </View>
        );
}

export default Main
