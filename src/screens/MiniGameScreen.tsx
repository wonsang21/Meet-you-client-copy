import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import getEnvVars from '../../environments';
import { TextInput } from 'react-native-gesture-handler';

class MiniGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queiz: '',
      solution: '',
      result: '',
    };
  }

  async componentDidMount() {
    await this.getMiniGame();
  }
  //게임 받아오기
  getMiniGame() {
    const { apiUrl } = getEnvVars();
    axios({
      url: `http://${apiUrl}/mini/getMiniGame`,
      method: 'get',
      params: {
        userId: this.props.user.id,
      },
    }).then((data) => {
      console.log(data.data, 'aaaaaaaaaaaaaaaaaaaaaaaa');
      this.setState({
        queiz: data.data.problem,
        solution: data.data.solution,
        id: data.data.id,
        result: '',
      });
    });
  }
  //input 업데이트
  handleInputSingleValue = (result) => {
    this.setState({
      result: result,
    });
    if (this.state.result === '') {
      console.log('d');
    }
  };
  //서버에 정답 보내기
  postresult() {
    const { apiUrl } = getEnvVars();
    const data = {
      userId: this.props.user.id,
      completedMiniGameId: this.state.id,
    };
    axios({
      url: `http://${apiUrl}/mini/completedMiniGame`, // 주소 맞음
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      this.getMiniGame();
    });
  }

  render() {
    console.log('=l======1f11===', this.state, '=111===========');
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapContent}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                AsyncStorage.clear();
                alert('유저토큰 삭제 및 로그인유지 해제');
                this.props.navigation.navigate('AuthLoading'); // 작동됨
              }}
            >
              <Text style={styles.buttonTitle}>로그아웃 테스트</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapContent}>
          <View style={styles.content}>
            <Text>{this.state.queiz}</Text>
            <TextInput
              placeholder="정답을 입력하세요"
              onChangeText={(txt) => this.handleInputSingleValue(txt)}
            >
              {this.state.result === '' ? '' : this.state.result}
            </TextInput>
            <TouchableOpacity
              onPress={() => {
                const { result, solution } = this.state;
                if (result === solution) {
                  this.postresult();
                } else {
                  alert('땡~');
                }
              }}
            >
              <Text>보내자</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: 'white',
  },
  wrapContent: {
    width: wp('90%'),
    height: wp('90%'),
    paddingBottom: wp('5%'),
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: wp('10%'),
  },
  button: {
    backgroundColor: '#46c3ad',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
  },
});
const mapStateToProps = (state: any) => {
  console.log('=============', state.UserPhoto.myprofile, '============');
  return {
    user: state.UserPhoto.myprofile,
  };
};
export default connect(mapStateToProps)(MiniGameScreen);
