import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { withNavigation } from 'react-navigation';

import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import getEnvVars from '../../environments';

interface ChattingScreenProps {}

interface ChattingScreenState {
  myUsername: string;
  myNickname: string;
  myProfile_Photo: string;
  username: string;
  usernickname: string;
  messages: any;
}

class ChattingScreen extends React.Component<
  ChattingScreenProps,
  ChattingScreenState
> {
  constructor(props: ChattingScreenProps) {
    super(props);
    this.state = {
      myUsername: '',
      myNickname: '',
      myProfile_Photo: '',
      username: '',
      usernickname: '',
      messages: [],
    };

    this.mounted = false;
    const { apiUrl } = getEnvVars();
    this.getMyInfo = this.getMyInfo.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.storeMessages = this.storeMessages.bind(this);
    this.onSend = this.onSend.bind(this);

    this.socket = io(`http://${apiUrl}`); // 서버의 socket io 주소 연결
    this.socket.on('message', this.onReceivedMessage); // 룸안의 다른 사용자가 보내온 메시지를 받는다.
  }

  componentDidMount() {
    this.getMyInfo();
  }

  componentDidUpdate(prevState: any) {
    console.log('디드업데이트 스테이트값: ', this.state);
    if (prevState.myUsername !== this.state.myUsername) {
      this.joinRoom();
    }
  }

  getMyInfo = async () => {
    try {
      const partnerInfo = this.props.navigation.getParam('userInfo'); // 채팅을 할 상대방의 유저정보
      console.log('detail에서 받아온 상대유저params', partnerInfo);
      const myUsername = await AsyncStorage.getItem('USERID');
      const myNickname = await AsyncStorage.getItem('USERNICKNAME');
      const myProfile_Photo = await AsyncStorage.getItem('USERPHOTO');
      if (myUsername !== '' && myNickname != '' && myProfile_Photo !== '') {
        this.setState({
          myUsername: myUsername,
          myNickname: myNickname,
          myProfile_Photo: myProfile_Photo,
          username: partnerInfo.username,
          usernickname: partnerInfo.nickname,
        });
        return true;
      }
    } catch (err) {
      console.log('componentDidMount 에러', err);
    }
  };

  // 채팅방이 열리자마자 서버에 기존룸 및 신규룸을 요청한다.
  joinRoom = () => {
    this.socket.on('welcome', (res: any) => {
      console.log(res); // 성공
    });
    this.socket.emit('joinRoom', this.state); // 서버에 룸요청을 한다. ( 룸정보 통째로 보낸다.)
    console.log('joinRoomState값: ', this.state);
    this.socket.on('messages', this.onReceivedMessage); // DB에 저장된 해당룸의 채팅 메시지를 받아온다.
  };

  // 서버에 저장된 해당 채팅방 메시지를 받아온다.
  onReceivedMessage = (messages) => {
    this.storeMessages(messages);
  };

  // 채팅 메시지를 state에 저장한다.
  storeMessages = (messages) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  // Send를 누르는 순간 서버에 작성한 메시지를 보낸다.
  onSend = (messages: []) => {
    console.log('메시지배열[0]', messages[0]);
    this.socket.emit('message', messages[0]); // 본인이 작성한 메시지를 서버로 보낸다. 아마 서버에서 DB에 저장해야 할 것이다.
    this.storeMessages(messages);
  };

  render() {
    // console.log('this.state값', this.state);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.state.myUsername,
          name: this.state.myNickname,
          avatar: this.state.myProfile_Photo,
        }}
      />
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
    backgroundColor: '#46c3ad',
  },
  title: {
    fontSize: wp('10%'),
  },
});

export default withNavigation(ChattingScreen);
