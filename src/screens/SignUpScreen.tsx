import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Picker,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';

interface SignUpProps {}

interface SignUpState {
  username: string;
  password: string;
  age: number;
  address: string;
  profile_photo: string;
  nickname: string;
  blood: string;
  gender: string;
  drinking: boolean;
  smoking: boolean;
  job: string;
  school: string;
  hobby: [];
  idealType: [];
  personality: [];
}

class SignUpScreen extends Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      age: 0,
      address: '',
      profile_photo: 'default',
      nickname: '',
      blood: '',
      gender: '',
      drinking: false,
      smoking: false,
      job: '',
      school: '',
      hobby: [],
      idealType: [],
      personality: [],
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key: string) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        profile_photo: result.uri,
      });
    }
  };

  // 권한 설정 (카메라, 위치등)
  componentDidMount() {
    (async () => {
      if (Constants.platform?.android) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }

  render() {
    console.log(this.props);
    console.log(this);
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>회원가입</Text>
          </View>
          <View style={styles.profileplaceholder}>
            {this.state.profile_photo && (
              <Image
                source={{ uri: this.state.profile_photo }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <View style={styles.submitbuttonArea}>
            <TouchableOpacity
              style={styles.submitbutton}
              onPress={this.pickImage}
            >
              <Text style={styles.submitbuttonTitle}>프로필 사진 추가</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formArea}>
            <TextInput
              style={styles.textForm}
              placeholder="ID"
              onChange={this.handleInputValue('username')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="Password"
              onChange={this.handleInputValue('password')}
              secureTextEntry
            />
            <TextInput
              style={styles.textForm}
              placeholder="Age"
              onChange={this.handleInputValue('Age')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="address"
              onChange={this.handleInputValue('address')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="nickname"
              onChange={this.handleInputValue('nickname')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="blood"
              onChange={this.handleInputValue('blood')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="drinking"
              onChange={this.handleInputValue('drinking')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="smoking"
              onChange={this.handleInputValue('smoking')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="job"
              onChange={this.handleInputValue('job')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="school"
              onChange={this.handleInputValue('school')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="hobby"
              onChange={this.handleInputValue('hobby')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="idealType"
              onChange={this.handleInputValue('idealType')}
            />
            <TextInput
              style={styles.textForm}
              placeholder="personality"
              onChange={this.handleInputValue('personality')}
            />
          </View>

          <View style={styles.submitbuttonArea}>
            <TouchableOpacity
              style={styles.submitbutton}
              onPress={() => alert(this.state.profile_photo)}
            >
              <Text style={styles.submitbuttonTitle}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    alignItems: 'center',
  },
  titleArea: {
    width: '100%',
    padding: wp('10%'),
    alignItems: 'center',
  },
  title: {
    fontSize: wp('10%'),
  },
  formArea: {
    width: '100%',
    paddingBottom: wp('10%'),
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: '#888',
    width: '100%',
    height: hp('5%'),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  submitbuttonArea: {
    width: '100%',
    height: hp('5%'),
  },
  submitbutton: {
    backgroundColor: '#46c3ad',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitbuttonTitle: {
    color: 'white',
  },
  profileplaceholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: 202,
    height: 202,
    marginTop: 5,
  },
});
