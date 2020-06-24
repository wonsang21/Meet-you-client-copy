import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
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
  prpos: any;
}

function DetailsScreen({ navigation }: any) {
  console.log(navigation.state.params.user, 'setting');
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <StylePhoto
            source={{ uri: navigation.state.params.user.profile_Photo }}
          ></StylePhoto>
          <UserNameAge>
            {navigation.state.params.user.username},{' '}
            {navigation.state.params.user.nickname},{' '}
            {navigation.state.params.user.age}
          </UserNameAge>
          <UserbloodAndaddress>
            {navigation.state.params.user.address},{' '}
            {navigation.state.params.user.blood}
          </UserbloodAndaddress>
          <Text>{navigation.state.params.user.gender}</Text>
          <Text>{navigation.state.params.user.drinking}</Text>
          <Text>{navigation.state.params.user.smoking}</Text>
          <Text>{navigation.state.params.user.job}</Text>
          <Text>{navigation.state.params.user.school}</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>
            {' '}
            내 취미 는{' '}
            {navigation.state.params.user.hobbies.map(
              (hobby: string, index: number) => (
                <Sadsfe key={index}>{hobby}</Sadsfe>
              ),
            )}
          </Text>
          <Text>
            이상형{' '}
            {navigation.state.params.user.idealTypes.map(
              (idealType: string, index: number) => (
                <Sadsfe key={index}>{idealType}</Sadsfe>
              ),
            )}
          </Text>
          <Text>
            {' '}
            내성격{' '}
            {navigation.state.params.user.personalities.map(
              (personality: string, index: number) => (
                <Sadsfe key={index}>{personality}</Sadsfe>
              ),
            )}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;
