import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 300px;
  height: 300px;
`;
const UserNameAge = styled.Text`
  font-size: 11px;
`;
// const Aewrw = styled.Text`

// border-left-width: 1px;
// border-left-style : solid;
// border-left-color : #fff
// `
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
          이름 : {route.params.user.username},{route.params.user.age}
        </UserNameAge>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{route.params.user.address}</Text>
        <Text>{route.params.user.nickname}</Text>
        <Text>{route.params.user.blood}</Text>
        <Text>{route.params.user.gender}</Text>
        <Text>{route.params.user.drinking}</Text>
        <Text>{route.params.user.smoking}</Text>
        <Text>{route.params.user.job}</Text>
      </View>
    </View>
  );
}

export default DetailsScreen;
