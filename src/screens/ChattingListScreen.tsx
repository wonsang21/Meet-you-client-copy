import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Button, ListItem } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

import axios from 'axios';
import { withNavigation } from 'react-navigation';

import getEnvVars from '../../environments';
import AsyncStorage from '@react-native-community/async-storage';

interface ChattingListScreenProps {}

class ChattingListScreen extends React.Component {
  constructor(props: Readonly<ChattingListScreenProps>) {
    super(props);
    this.state = {
      myuserName: '', // 사용자ID
      myProfile_Photo: '', // 사용자 프로필
      rooms: [],
    };
    this.getChatListInfo = this.getChatListInfo.bind(this);
  }

  componentDidMount() {
    this.getChatListInfo();
  }

  getChatListInfo = async () => {
    const { apiUrl } = getEnvVars();
    const username = await AsyncStorage.getItem('USERID');
    console.log('USERID', username);
    const myProfile_Photo = await AsyncStorage.getItem('USERPHOTO');

    axios
      .post(`http://${apiUrl}/roomName`, { username: username })
      .then((res) => {
        // console.log('DB에서 뱓은 메시지배열', JSON.parse(res.data[0].message));
        console.log('DB에서 뱓은 룸배열', res.data); // 룸배열
        console.log('DB에서 뱓은 메시지', res.data[0].message); // 8번째 룸의 메시지 (확정)

        this.setState({
          myuserName: username,
          myProfile_Photo: myProfile_Photo,
          rooms: res.data,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  render() {
    console.log('this.state', this.state.rooms.length);

    // const list = ggggg;
    return (
      <ScrollView style={styles.container}>
        <Button
          icon={
            <FontAwesome5
              name="rocketchat"
              size={24}
              color="white"
            ></FontAwesome5>
          }
          title=" 채팅목록 업데이트"
          onPress={() => {
            this.getChatListInfo();
            // console.log('해당유저 parms.user', navigation.state.params.user);
          }}
        ></Button>
        {this.state.rooms.map((l, i) =>
          this.state.rooms[i].message !== null ? (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar } }}
              title={l.roomName}
              subtitle={l.message[0]['text']}
              bottomDivider
              onPress={() => {
                // 클릭시 해당 대화방으로 이동 기능 구현중
              }}
            />
          ) : (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar } }}
              title={l.roomName}
              subtitle={l.message}
              bottomDivider
              onPress={() => {
                // 클릭시 해당 대화방으로 이동 기능 구현중
              }}
            />
          ),
        )}
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
    backgroundColor: '#46c3ad',
  },
  title: {
    fontSize: wp('10%'),
  },
});

export default withNavigation(ChattingListScreen);
