import React from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 300px;
  height: 300px;
  margin: 70px;
  margin-bottom: 20px;
`;
const UserNameAge = styled.Text`
  font-size: 21px;
  margin-left: 10px;
`;
const UserbloodAndaddress = styled.Text`
  font-size: 17px;
  margin-left: 10px;
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
const Info = styled.Text`
  margin-left: 10px;
`;


function DetailsScreen({ navigation }: any) {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <StylePhoto
            source={{ uri: navigation.state.params.user.profile_Photo }}
          ></StylePhoto>
          <UserNameAge>
            ID: {navigation.state.params.user.username}{' '}
          </UserNameAge>
          <UserNameAge>
            닉네임: {navigation.state.params.user.nickname}{' '}
          </UserNameAge>
          <UserNameAge>나이: {navigation.state.params.user.age}</UserNameAge>
          <UserbloodAndaddress>
            {navigation.state.params.user.address}{' '}
          </UserbloodAndaddress>
          <UserbloodAndaddress>
            혈액형 :{navigation.state.params.user.blood}{' '}
          </UserbloodAndaddress>
          <UserbloodAndaddress>
            성별 : {navigation.state.params.user.gender}
          </UserbloodAndaddress>
        </View>
        <View>
          <Line style={{ borderWidth: 1, borderRightColor: 'white' }}>선</Line>
          <Info>음주 : {navigation.state.params.user.drinking}</Info>
          <Info>흡연 : {navigation.state.params.user.smoking}</Info>
          <Info>직업 : {navigation.state.params.user.job}</Info>
          <Info>학벌 : {navigation.state.params.user.school}</Info>
        </View>
        <View style={{ flex: 1 }}>
          <Info>
            내 취미 는{' '}
            {navigation.state.params.user.hobby.map(
              (hobby: string, index: number) => (
                <UserInfo key={index}>{hobby}, </UserInfo>
              ),
            )}
          </Info>
          <Info>
            내 이상형{' '}
            {navigation.state.params.user.idealType.map(
              (idealType: string, index: number) => (
                <UserInfo key={index}>{idealType}, </UserInfo>
              ),
            )}
          </Info>
          <Info>
            내성격{' '}
            {navigation.state.params.user.personality.map(
              (personality: string, index: number) => (
                <UserInfo key={index}>{personality}, </UserInfo>
              ),
            )}
          </Info>
        </View>
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;
