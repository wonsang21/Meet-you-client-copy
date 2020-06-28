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
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';

import oc from 'open-color';
import axios from 'axios';
import { connect, useSelector, useDispatch } from 'react-redux';
const StylePhoto = styled.Image`
  width: 100%;
  height: 300px;
`;
const UserNameAge = styled.Text`
  font-size: 21px;
`;
const UserbloodAndaddress = styled.Text`
  font-size: 17px;
`;
const UserInfo = styled.Text`
  background-color: mistyrose;

  padding: 5px;
  margin: 10px;
  border-radius: 50px;
`;
const ButtonContainer = styled.TouchableOpacity`
  border: 1px solid palevioletred;
  margin: auto;
  margin-top: 30px;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
`;
const Athoder = styled.Text`
  text-align: center;
  font-size: 11px;
  color: black;
`;
const Line = styled.Text`
  font-size: 0.0000001px;
  width: 100%;
  margin: 10px;
`;
function MyProfileScreen({ navigation, userProfile }) {
  // console.log(userProfile,'aasf=sd=as=fsda=')
  // const userProfile = useSelector((state) => state.UserPhoto.myprofile);
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StylePhoto source={{ uri: userProfile.profile_Photo }}></StylePhoto>
        <UserNameAge>
          {userProfile.username}, {userProfile.nickname}, {userProfile.age}
        </UserNameAge>
        <UserbloodAndaddress>{userProfile.address}, </UserbloodAndaddress>
        <UserbloodAndaddress>혈액형 :{userProfile.blood} </UserbloodAndaddress>
        <UserbloodAndaddress>성별 : {userProfile.gender}</UserbloodAndaddress>
        <Line style={{ borderWidth: 1, borderRightColor: 'white' }}>선</Line>
        <Text>음주 : {userProfile.drinking}</Text>
        <Text>흡연 : {userProfile.smoking}</Text>
        <Text>직업 : {userProfile.job}</Text>
        <Text>학벌 : {userProfile.school}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* <Text>
          {' '}
          내 취미 는{' '}
          {userProfile.hobby.map((hobby: string, index: number) => (
            <UserInfo key={index}>{hobby}, </UserInfo>
          ))}
        </Text>
        <Text>
          내 이상형{' '}
          {userProfile.idealType.map((idealType: string, index: number) => (
            <UserInfo key={index}>{idealType}, </UserInfo>
          ))}
        </Text>
        <Text>
          {' '}
          내성격{' '}
          {userProfile.personality.map((personality: string, index: number) => (
            <UserInfo key={index}>{personality}, </UserInfo>
          ))}
        </Text> */}
        <ButtonContainer
          onPress={() => navigation.navigate('ProFileChange', userProfile)}
        >
          <Athoder>프로필 수정</Athoder>
        </ButtonContainer>
        <ButtonContainer
          onPress={() => {
            AsyncStorage.clear();
            alert('유저토큰 삭제 및 로그인유지 해제');
            navigation.navigate('AuthLoading'); // 작동됨
          }}
        >
          <Athoder>로그아웃 테스트</Athoder>
        </ButtonContainer>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    height: 60,
    backgroundColor: 'red',
  },
  content: {
    flex: 1,
  },
  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
    borderBottomWidth: 0.5,
    padding: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding: 8,
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'yellow',
  },
  name: {
    paddingLeft: 10,
  },
});

const mapStateToProps = (state: any) => {
  return {
    userProfile: state.UserPhoto.myprofile,
  };
};
export default connect(mapStateToProps)(MyProfileScreen);

// export default MyProfileScreen;
