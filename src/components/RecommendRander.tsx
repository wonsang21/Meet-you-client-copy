import React from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { UserProps } from '../reducers/type';

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 150px;
  height: 150px;
`;

const Gallery = styled.View`
  margin: auto;
  padding: 10px;
`;

const UserProfile = styled.Text`
  position: relative;
  left: 30px;
`;
const Photo = styled.View`
  margin: auto;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;

interface Props {
  navigation: {
    state: {
      params: UserProps[];
    };
    navigate: (route: string, params: { user: UserProps }) => void;
  };
}

const RecommendRander: React.FunctionComponent<Props> = ({
  navigation,
}: Props) => {
  // console.log(
  //   '===========',
  //   navigation.state.params,
  //   'fakediddddddddddddddddddddddd',
  // );
  return navigation.state.params ? (
    <ScrollView>
      <Photo style={{ flexDirection: 'row' }}>
        {navigation.state.params.map((user: UserProps, index: number) => (
          <Gallery key={index}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { user: user })}
            >
              <StylePhoto source={{ uri: user.profile_Photo }} />
              <UserProfile>{user.username}</UserProfile>
              <UserProfile>{user.age}</UserProfile>
            </TouchableOpacity>
          </Gallery>
        ))}
      </Photo>
      <TouchableOpacity>
        <Text>다른 유저 받기 Point -1000</Text>
      </TouchableOpacity>
    </ScrollView>
  ) : (
    <View></View>
  );
};

export default RecommendRander;
