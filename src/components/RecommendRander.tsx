import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { UserProps } from '../reducers/type';
import { connect } from 'react-redux';
import axios from 'axios';
import getEnvVars from '../../environments';
import {
  older,
  hobby,
  recently,
  idealType,
  personality,
  myProFile,
} from '../action';
import { AntDesign } from '@expo/vector-icons';
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
const Point = styled.Text`
  font-size: 30px;
  text-align: right;
  color: palevioletred;
  margin: 10px;
`;
const Send = styled.Text`
  text-align: center;
  font-size: 20px;
  color: black;
`;
const ButtonContainer = styled.TouchableOpacity`
  border: 1px solid palevioletred;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
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
  getUser(route) {
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
      .then((result) => {
        this.getUserfile();
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
          this.getUser(route);
          alert('유저의 포인트를 삭감하였습니다.');
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  //dispatch로 유저 정보 업데이트
  async getUserfile() {
    const { apiUrl } = getEnvVars();
    const value = await AsyncStorage.getItem('USERTOKEN');
    return new Promise((resolve, reject) => {
      resolve(
        axios({
          url: `http://${apiUrl}/user/information`,
          method: 'get',
          headers: {
            Authorization: `Basic ${value}`,
          },
        })
          .then((data) => {
            this.props.dispatch(myProFile(data.data[0]));
            this.setState({
              userId: data.data[0].id,
            });
          })
          .catch((error) => {
            console.log(error, 'error');
          }),
      );
      reject('에러');
    });
  }

  render() {
    const route = this.state.route;
    console.log(this.props.userfile, '=f============sadf=sad=safdf=safd=');
    return this.props.userfile[route] ? (
      <ScrollView>
        <Point>
          <AntDesign name="heart" size={24} color="palevioletred" />
          {this.props.userfile.myprofile.point}
        </Point>
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
        <ButtonContainer onPress={() => this.userPoint(route)}>
          <Send>다른 유저 받기 Point -1000</Send>
        </ButtonContainer>
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
