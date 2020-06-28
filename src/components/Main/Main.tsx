import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { UserProps } from '../../reducers/type';

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
`;
const Photo = styled.View`
  margin: auto;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;

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
    console.log('통과');
    return <View></View>;
  }

  return (
    <View style={{ flexDirection: 'column' }}>
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
    </View>
  );
};

export default Main;
