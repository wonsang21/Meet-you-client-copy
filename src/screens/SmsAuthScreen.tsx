import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';

import { withNavigation } from 'react-navigation';

import axios from 'axios';
import getEnvVars from '../../environments';

interface SmsAuthProps {}

interface SmsAuthState {
  userphone: string;
  verifynum: string;
  userphoneErr: string;
  verifynumErr: string;
}

class SmsAuth extends Component<SmsAuthProps, SmsAuthState> {
  constructor(props: SmsAuthProps) {
    super(props);
    this.state = {
      userphone: '',
      verifynum: '',
      userphoneErr: '',
      verifynumErr: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { apiUrl } = getEnvVars();
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar hidden={false} />

        <View style={{ marginTop: 20 }}>
          <Input
            placeholder="휴대폰 번호를 - 없이 입력해주세요"
            containerStyle={styles.TextViewStyle}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              this.handleInputValue('userphone', text);
            }}
            errorMessage={this.state.userphoneErr}
            errorStyle={{ alignSelf: 'center' }}
          />
          <Button
            title="인증번호 발송"
            titleStyle={{
              color: this.state.userphone.length === 11 ? 'purple' : '#fff',
            }}
            buttonStyle={{
              backgroundColor:
                this.state.userphone.length === 11 ? '#fff' : '#D1D1D1',
              borderColor:
                this.state.userphone.length === 11 ? 'purple' : '#dfe4ea',
              borderWidth: 1,
              marginBottom: 30,
              marginLeft: 20,
              marginRight: 20,
              padding: 10,
              width: '90%',
            }}
            onPress={() => {
              axios
                .post(`http://${apiUrl}/user/auth`, this.state)
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    alert('인증번호가 발송되었습니다');
                  }
                })
                .catch((err) => {
                  console.log('휴대폰보내기 오류', err);
                  this.setState({
                    userphoneErr: '정확하게 입력해주세요!!!',
                  });
                });
            }}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Input
            placeholder="인증번호를 입력해주세요"
            containerStyle={styles.TextViewStyle}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              this.handleInputValue('verifynum', text);
            }}
            errorMessage={this.state.verifynumErr}
            errorStyle={{ alignSelf: 'center' }}
          />
          <Button
            title="인증번호 확인"
            titleStyle={{
              color: this.state.verifynum.length === 4 ? 'purple' : '#fff',
            }}
            buttonStyle={{
              backgroundColor:
                this.state.verifynum.length === 4 ? '#fff' : '#D1D1D1',
              borderColor:
                this.state.verifynum.length === 4 ? 'purple' : '#dfe4ea',
              borderWidth: 1,
              marginBottom: 30,
              marginLeft: 20,
              marginRight: 20,
              padding: 10,
              width: '90%',
            }}
            onPress={() => {
              axios
                .post(`http://${apiUrl}/user/auth/verify`, this.state)
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    Alert.alert('', '휴대폰 인증이 완료되었습니다', [
                      {
                        text: 'OK',
                        onPress: () => this.props.navigation.navigate('SignUp'),
                      },
                    ]);
                  }
                })
                .catch((err) => {
                  console.log('인증번호 보내기 오류', err);
                  this.setState({
                    verifynumErr: '정확하게 입력해주세요!!!',
                  });
                });
            }}
          />
        </View>
      </View>
    );
  }
}
export default withNavigation(SmsAuth);

const styles = StyleSheet.create({
  TextViewStyle: {
    backgroundColor: '#F9F9F9',
    borderColor: '#dfe4ea',
    borderWidth: 1,

    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    width: '90%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
  },
});
