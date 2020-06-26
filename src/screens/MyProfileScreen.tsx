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

function MyProfileScreen({ myprofile, navigation }) {
  const userProfile = useSelector((state) => state.UserPhoto.myprofile);
  console.log('이거 뭐f요', myprofile, '======a=');
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <StylePhoto source={{ uri: userProfile.profile_Photo }}></StylePhoto>
          <UserNameAge>
            {userProfile.username}, {userProfile.nickname}, {userProfile.age}
          </UserNameAge>
          <UserbloodAndaddress>
            {userProfile.address}, {userProfile.blood}
          </UserbloodAndaddress>

          <Text>{userProfile.gender}</Text>
          <Text>{userProfile.drinking}</Text>
          <Text>{userProfile.smoking}</Text>
          <Text>{userProfile.job}</Text>
          <Text>{userProfile.school}</Text>
        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>
            {' '}
            내 취미 는{' '}
            {userProfile.hobby.map((hobby: string, index: number) => (
              <Sadsfe key={index}>{hobby}</Sadsfe>
            ))}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProFileChange', userProfile)}
          >
            <Text>프로필 수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              alert('유저토큰 삭제 및 로그인유지 해제');
              navigation.navigate('AuthLoading'); // 작동됨
            }}
          >
            <Text>로그아웃 테스트</Text>
          </TouchableOpacity>
          <Text>
            이상형{' '}
            {userProfile.idealType.map((idealType: string, index: number) => (
              <Sadsfe key={index}>{idealType}</Sadsfe>
            ))}
          </Text>
          <Text>
            {' '}
            내성격{' '}
            {userProfile.personality.map((personality: string, index: number) => (
              <Sadsfe key={index}>{personality}</Sadsfe>
            ))}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProFileChange', userProfile)}
          >
            <Text>프로필 수정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: 'white',
  },
});

// const mapStateToProps = (state: any) => {
//   return {
//     aa: state.UserPhoto.myprofile,
//   };
// };
// export default connect(mapStateToProps)(MyProfileScreen);

export default MyProfileScreen;
