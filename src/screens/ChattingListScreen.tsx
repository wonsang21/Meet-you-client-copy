import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { ListItem } from 'react-native-elements';

import axios from 'axios';
import { withNavigation } from 'react-navigation';

import io from 'socket.io-client';
import getEnvVars from '../../environments';

interface ChatsProps {}

class ChatsScreen extends React.Component {
  constructor(props: Readonly<ChatsProps>) {
    super(props);
    this.state = {};
  }

  render() {
    const list = [
      {
        name: 'Amy Farha',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle:
          '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      },
      {
        name: 'Chris Jackson',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
      {
        name: 'Chris Jackson',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
      {
        name: 'Chris Jackson',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
      {
        name: 'Chris Jackson',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
    ];
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapContent}>
          {list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))}
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
    backgroundColor: '#46c3ad',
  },
  title: {
    fontSize: wp('10%'),
  },
});

export default withNavigation(ChatsScreen);
