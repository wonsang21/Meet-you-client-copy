import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 300px;
  height: 300px;
`;
const UserNameAge = styled.Text`

  font-size: 21px;
`;
const UserbloodAndaddress = styled.Text`
  font-size: 17px;
`;
const Sadsfe = styled.Text`
  background-color: mistyrose;

  padding: 5px;
  margin: 10px;
  border-radius: 50px;
`;

interface Props {
  route: any;
}

function DetailsScreen({ route }: Props) {
  console.log(route.params.user, 'setting');
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StylePhoto
          source={{ uri: route.params.user.profile_photo }}
        ></StylePhoto>
        <UserNameAge>
          {route.params.user.username}, {route.params.user.nickname},{' '}
          {route.params.user.age}
        </UserNameAge>
        <UserbloodAndaddress>
          {route.params.user.address}, {route.params.user.blood}
        </UserbloodAndaddress>
        <Text>{route.params.user.gender}</Text>
        <Text>{route.params.user.drinking}</Text>
        <Text>{route.params.user.smoking}</Text>
        <Text>{route.params.user.job}</Text>
        <Text>{route.params.user.school}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {' '}
          내 취미 는{' '}
          {route.params.user.hobbies.map((hobby: string, index: number) => (
            <Sadsfe key={index}>{hobby}</Sadsfe>
          ))}
        </Text>
        <Text>
          이상형{' '}
          {route.params.user.idealTypes.map(
            (idealType: string, index: number) => (
              <Sadsfe key={index}>{idealType}</Sadsfe>
            ),
          )}
        </Text>
        <Text>
          {' '}
          내성격{' '}
          {route.params.user.personalities.map(
            (personality: string, index: number) => (
              <Sadsfe key={index}>{personality}</Sadsfe>
            ),
          )}
        </Text>
      </View>
    </View>
  );

}

export default DetailsScreen;
