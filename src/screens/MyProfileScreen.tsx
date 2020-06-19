import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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

function MyProfileScreen({ myprofile }) {
  console.log(myprofile, '이거 뭐요');
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <StylePhoto source={{ uri: myprofile.profile_photo }}></StylePhoto>
          <UserNameAge>
            {myprofile.username}, {myprofile.nickname}, {myprofile.age}
          </UserNameAge>
          <UserbloodAndaddress>
            {myprofile.address}, {myprofile.blood}
          </UserbloodAndaddress>
          <Text>{myprofile.gender}</Text>
          <Text>{myprofile.drinking}</Text>
          <Text>{myprofile.smoking}</Text>
          <Text>{myprofile.job}</Text>
          <Text>{myprofile.school}</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>
            {' '}
            내 취미 는{' '}
            {myprofile.hobbies.map((hobby: string, index: number) => (
              <Sadsfe key={index}>{hobby}</Sadsfe>
            ))}
          </Text>
          <Text>
            이상형{' '}
            {myprofile.idealTypes.map((idealType: string, index: number) => (
              <Sadsfe key={index}>{idealType}</Sadsfe>
            ))}
          </Text>
          <Text>
            {' '}
            내성격{' '}
            {myprofile.personalities.map(
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state: any) => {
  return {
    myprofile: state.UserPhoto.myprofile,
  };
};
export default connect(mapStateToProps)(MyProfileScreen);

// export default MyProfileScreen;
