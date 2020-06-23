import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { UserProps } from '../reducers/type';

const StylePhoto = styled.Image`
  border-radius: 25px;
  width: 150px;
  height: 150px;
`;

const Gallery = styled.View`
  margin: auto;
  width: 50%;
  padding: 10px;
`;

const UserProfile = styled.Text`
  position: relative;
  left: 30px;
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
  console.log(navigation.state.params, 'fakediddddddddddddddddddddddd');
  return navigation.state.params ? (
    <View style={{ flexDirection: 'row' }}>
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
    </View>
  ) : (
    <View></View>
  );
};

export default RecommendRander;
