import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { UserProps } from '../../reducers/type';

const ButtonContainer = styled.TouchableOpacity`
  border: 1px solid palevioletred;
  margin: auto;
  margin-top: 5px;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
`;
const Athoder = styled.Text`
  text-align: center;
  font-size: 11px;
  color: black;
`;

interface Props {
  userProFile: UserProps[];
  idealTypeUser: UserProps[];
  myprofile: UserProps;
  odlUser: UserProps[];
  recentlyUser: UserProps[] | string;
  user: UserProps[] | [];
  userHobby: UserProps[];
  userfile: UserProps[];

  navigation: {
    navigate: (route: string, params: any) => void;
  };
}

const Recommend: React.FunctionComponent<Props> = ({
  userProFile,
  navigation,
}: Props) => {
  return (
    <View>
      <Text>여기는 새로운 추천</Text>
      <ButtonContainer
        onPress={() =>
          navigation.navigate('RecommendRander', userProFile['oldUser'])
        }
      >
        <Athoder>밥 잘사주는 연상</Athoder>
      </ButtonContainer>
      <ButtonContainer
        onPress={() =>
          navigation.navigate('RecommendRander', userProFile['userHobby'])
        }
      >
        <Athoder>취미가 비슷한 친구들</Athoder>
      </ButtonContainer>
      <ButtonContainer
        onPress={() =>
          navigation.navigate('RecommendRander', userProFile['idealTypeUser'])
        }
      >
        <Athoder>내 이상형</Athoder>
      </ButtonContainer>
      <ButtonContainer
        onPress={() =>
          navigation.navigate('RecommendRander', userProFile['personalityUser'])
        }
      >
        <Athoder>나와 성격이 잘 맞는 여사친</Athoder>
      </ButtonContainer>
      <ButtonContainer
        onPress={() =>
          navigation.navigate('RecommendRander', userProFile['recentlyUser'])
        }
      >
        <Athoder>최근 가입한 여사친</Athoder>
      </ButtonContainer>
    </View>
  );
};

export default Recommend;
