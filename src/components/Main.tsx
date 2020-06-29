import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { UserProps } from '../reducers/type';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  userfile: {
    UserPhoto: {
      userfile: UserProps[];
    };
  };
  onClick: () => void;
  navigation: {
    navigate: (route: string, params: { user: UserProps }) => void;
  };
}

const Main: React.FunctionComponent<Props> = ({
  userfile,
  onClick,
  navigation,
}: Props) => {
  if (userfile.UserPhoto.userfile === undefined) {
    return <View></View>;
  }
  return (
    <View style={{ flexDirection: 'column' }}>
      <Point>
        <AntDesign name="heart" size={24} color="palevioletred" />
        {userfile.UserPhoto.myprofile.point}
      </Point>
      <Photo style={{ flexDirection: 'row' }}>
        {userfile.UserPhoto.userfile.map((user, index) => (
          <Gallery key={index}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', { user: user });
              }}
            >
              <StylePhoto source={{ uri: user.profile_Photo }} />
              <UserProfile>{user.username}</UserProfile>
              <UserProfile>{user.age}</UserProfile>
            </TouchableOpacity>
          </Gallery>
        ))}
      </Photo>
      <ButtonContainer onPress={onClick}>
        <Athoder>다른사람 추천</Athoder>
      </ButtonContainer>
      <Line style={{ borderWidth: 1, borderRightColor: 'white' }}>선</Line>
    </View>
  );
};

export default Main;

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
  left: 10px;
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
`;
const Photo = styled.View`
  margin: auto;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;
const Point = styled.Text`
  font-size: 30px;
  text-align: right;
  color: palevioletred;
  margin: 10px;
`;
const Line = styled.Text`
  font-size: 0.0000001px;
  width: 100%;
  margin: 10px;
`;
