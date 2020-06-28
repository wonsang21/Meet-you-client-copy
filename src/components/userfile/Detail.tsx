import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 300px;
  height: 300px;
  margin: 70px;
  margin-bottom: 20px;
`;
const UserNameAge = styled.Text`
  font-size: 21px;
`;
const UserbloodAndaddress = styled.Text`
  font-size: 17px;
`;
const UserInfo = styled.Text`
  background-color: mistyrose;
  flex-wrap: wrap;
  padding: 5px;
  margin: 10px;
  border-radius: 50px;
`;

const Line = styled.Text`
  font-size: 0.0000001px;
  width: 100%;
  margin: 10px;
`;

interface Props {
  prpos: any;
}

function DetailsScreen({ navigation }: any) {
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
          </UserbloodAndaddress>
          <UserbloodAndaddress>
            혈액형 :{navigation.state.params.user.blood}{' '}
          </UserbloodAndaddress>
          <UserbloodAndaddress>
            성별 : {navigation.state.params.user.gender}
          </UserbloodAndaddress>
          <Line style={{ borderWidth: 1, borderRightColor: 'white' }}>선</Line>
          <Text>음주 : {navigation.state.params.user.drinking}</Text>
          <Text>흡연 : {navigation.state.params.user.smoking}</Text>
          <Text>직업 : {navigation.state.params.user.job}</Text>
          <Text>학벌 : {navigation.state.params.user.school}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>
            {' '}
            내 취미 는{' '}
            {navigation.state.params.user.hobby.map(
              (hobby: string, index: number) => (
                <UserInfo key={index}>{hobby}, </UserInfo>
              ),
            )}
          </Text>
          <Text>
            내 이상형{' '}
            {navigation.state.params.user.idealType.map(
              (idealType: string, index: number) => (
                <UserInfo key={index}>{idealType}, </UserInfo>
              ),
            )}
          </Text>
          <Text>
            {' '}
            내성격{' '}
            {navigation.state.params.user.personality.map(
              (personality: string, index: number) => (
                <UserInfo key={index}>{personality}, </UserInfo>
              ),
            )}
          </Text>
        </View>
        <Button
          icon={
            <FontAwesome5
              name="rocketchat"
              size={24}
              color="white"
            ></FontAwesome5>
          }
          title=" 채팅하기"
          onPress={() => {
            navigation.navigate('Chatting', {
              userInfo: navigation.state.params.user,
            });
            // console.log('해당유저 parms.user', navigation.state.params.user);
          }}
        ></Button>
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;
