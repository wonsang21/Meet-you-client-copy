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
import { AntDesign } from '@expo/vector-icons';
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
    console.log('=l======1f11dcz===', this.props, '=11x1=ㅊ==========');
    return (
      <View style={styles.content}>
        <Title>넌센스 퀴즈</Title>
        <Point>
          <AntDesign name="heart" size={24} color="palevioletred" />
          {this.props.user.point}
        </Point>
        <Queiz>{this.state.queiz}</Queiz>
        <Result
          placeholder="정답을 입력하세요"
          onChangeText={(txt) => this.handleInputSingleValue(txt)}
        >
          {this.state.result === '' ? '' : this.state.result}
        </Result>
        <ButtonContainer
          onPress={() => {
            const { result, solution } = this.state;
            if (result === solution) {
              this.props.user.point += 1000;
              this.postresult();
              alert('하트 1000원을 받았습니다!');
            } else {
              alert('땡~');
            }
          }}
        >
          <Send>보내자</Send>
        </ButtonContainer>
        <Text>{this.props.user.point}</Text>
        {/* <WebView
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0',
          }}
        /> */}
      </View>
    );
  }
}
const Title = styled.Text`
  font-size: 30px;
  text-align: center;
  color: black;
  margin: 30px;
`;
const Point = styled.Text`
  font-size: 30px;
  text-align: right;
  color: palevioletred;
  margin: 10px;
`;
const Queiz = styled.Text`
  font-size: 25px;
  text-align: center;
  color: black;
  margin: 10px;
`;
const Result = styled.TextInput`
  font-size: 25px;
  text-align: center;
  color: black;
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
    backgroundColor: 'white',
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
