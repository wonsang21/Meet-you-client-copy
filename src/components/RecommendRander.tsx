import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { UserProps } from '../reducers/type';
import { connect } from 'react-redux';
import axios from 'axios';
import getEnvVars from '../../environments';
import {
  oldUser,
  older,
  hobby,
  recently,
  idealType,
  personality,
} from '../action';
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

class RecommendRander extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userfile.myprofile.id,
      route: this.props.navigation.state.params.route,
    };
  }
  getOldUser(route) {
    const { apiUrl } = getEnvVars();
    axios({
      url: `http://${apiUrl}/main/${route}`,
      method: 'get',
      params: {
        userId: this.state.userId,
      },
    })
      .then((data) => {
        if (route === 'older') {
          this.props.dispatch(older(data.data));
        }
        if (route === 'hobby') {
          this.props.dispatch(hobby(data.data));
        }
        if (route === 'recently') {
          this.props.dispatch(recently(data.data));
        }
        if (route === 'idealType') {
          this.props.dispatch(idealType(data.data));
        }
        if (route === 'personality') {
          this.props.dispatch(personality(data.data));
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  userPoint(route) {
    const { apiUrl } = getEnvVars();
    const data = {
      userId: this.state.userId,
      minosPoint: 1000,
    };
    axios({
      url: `http://${apiUrl}/minosPoint`,
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        //새로운 유저 두명 추처받기
        console.log(result.status);
        if (result.status === 201) {
          alert('포인트가 부족합니다');
        } else if (result.status === 200) {
          //디패로 포인트 삭감 된거 보내주기
          this.getOldUser(route);
          alert('유저의 포인트를 삭감하였습니다.');
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  render() {
    const route = this.state.route;
    console.log(this.props.userfile, '=f============sadf=sad=safdf=safd=');
    return this.props.userfile[route] ? (
      <ScrollView>
        <Photo style={{ flexDirection: 'row' }}>
          {this.props.userfile[route].map((user: UserProps, index: number) => (
            <Gallery key={index}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Details', { user: user })
                }
              >
                <StylePhoto source={{ uri: user.profile_Photo }} />
                <UserProfile>{user.username}</UserProfile>
                <UserProfile>{user.age}</UserProfile>
              </TouchableOpacity>
            </Gallery>
          ))}
        </Photo>
        <TouchableOpacity onPress={() => this.userPoint(route)}>
          <Text>다른 유저 받기 Point -1000</Text>
        </TouchableOpacity>
      </ScrollView>
    ) : (
      <View></View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userfile: state.UserPhoto,
  };
};
export default connect(mapStateToProps)(RecommendRander);
