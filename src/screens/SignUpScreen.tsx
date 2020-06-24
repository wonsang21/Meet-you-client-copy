import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Picker,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {
  SinglePickerMaterialDialog,
  MultiPickerMaterialDialog,
} from 'react-native-material-dialog';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import modalData from '../utils/modalData';
import axios from 'axios';
import getEnvVars from '../../environments';

interface SignUpProps {}

interface SignUpState {
  userInfo: any;
  lat: number;
  lng: number;
  DatePickerVisble: boolean;
  addressPickerVisble: boolean;
  singlePickerVisible_blood: boolean;
  singlePickerVisible_gender: boolean;
  singlePickerVisible_drinking: boolean;
  singlePickerVisible_smoking: boolean;
  singlePickerVisible_job: boolean;
  singlePickerVisible_school: boolean;
  singlePickerTitle: string;
  singlePickerSelectedTitle: string;
  singlePickerSelectedItem: any;
  multiPickerVisible_hobby: boolean;
  multiPickerVisible_personality: boolean;
  multiPickerVisible_idealType: boolean;
  multiPickerTitle: string;
  multiPickerSelectedTitle: string;
  multiPickerSelectedItems: any;
}

class SignUpScreen extends Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      userInfo: {
        username: '',
        password: '',
        age: '',
        birth: '',
        address: '',
        profile_Photo: 'default',
        nickname: '',
        blood: '',
        gender: '',
        drinking: '',
        smoking: '',
        job: '',
        school: '',
        hobby: [],
        personality: [],
        idealType: [],
      },
      lat: 0,
      lng: 0,
      DatePickerVisble: false,
      addressPickerVisble: false,
      singlePickerVisible_blood: false,
      singlePickerVisible_gender: false,
      singlePickerVisible_drinking: false,
      singlePickerVisible_smoking: false,
      singlePickerVisible_job: false,
      singlePickerVisible_school: false,
      singlePickerTitle: '',
      singlePickerSelectedTitle: '',
      singlePickerSelectedItem: {
        value: '',
        label: '',
      },
      multiPickerVisible_hobby: false,
      multiPickerVisible_personality: false,
      multiPickerVisible_idealType: false,
      multiPickerTitle: '',
      multiPickerSelectedTitle: '',
      multiPickerSelectedItems: [
        {
          value: '',
          label: '',
        },
      ],
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleInputSingleValue = this.handleInputSingleValue.bind(this);
    this.handleInputMultiValue = this.handleInputMultiValue.bind(this);
  }

  // userInfo이외에 값들을 state에 넣어주는 함수
  handleInputValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // userInfo 입력부분을 state값에 넣어주는 함수 (싱글모달)
  handleInputSingleValue = (name, value) => {
    this.setState({
      userInfo: { ...this.state.userInfo, [name]: value },
    });
  };
  // userInfo 입력부분을 state값에 넣어주는 함수 (모달 다중 선택전용)
  handleInputMultiValue = (name, values: []) => {
    const arr: never[] = [];
    if (values.length !== 0) {
      for (let i = 0; i < values.length; i++) {
        arr.push(values[i]['label']);
      }
    }
    this.setState({
      userInfo: { ...this.state.userInfo, [name]: arr },
    });
  };

  // 생년월일을 한국 만나이로 계산해주는 함수
  calculAge = (birth: string) => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    let monthDay = month + day;
    birth = birth.replace('-', '').replace('-', '');
    const birthdayy = birth.substr(0, 4);
    const birthdaymd = birth.substr(4, 4);
    const age =
      monthDay < Number(birthdaymd)
        ? year - Number(birthdayy) - 1
        : year - Number(birthdayy);

    return String(age);
  };

  // 갤러리에 있는 이미지를 불러와 state값에 넣어주는 함수
  pickImage = async () => {
    // 파일 접근 권한 (갤러리등)
    if (Constants.platform?.android) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('파일 및 갤러리 접근 권한이 꼭 필요합니다!!');
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
          this.setState({
            userInfo: { ...this.state.userInfo, profile_Photo: result.uri },
          });
        }
      }
    }
  };

  // gps연동을 하여 현재위치(위도, 경도)를 state값에 넣어주는 함수
  getLocation = async () => {
    if (Constants.platform?.android) {
      // gps사용 권한
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('gps 접근 권한이 꼭 필요합니다!!');
      } else {
        const location = await Location.getCurrentPositionAsync({});
        this.setState({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        console.log('현재위치 lat', this.state.lat);
        console.log('현재위치 lng', this.state.lng);

        // 여기서 구글 api로 위도, 경도를 보내서 현재 지역명으로 반환해온다.
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&language=ko&key=AIzaSyBIiDKf7S7Ve_Vsvi1B5LJAOrYtvvwMjgc`,
          ) // 위도, 경도 google maps api로 보냄
          .then((res) => {
            console.log('반환된 주소값', res.data.results[4].formatted_address);
            const result = res.data.results[4].formatted_address.slice(5); // 앞에 대한민국은 뺀다.
            console.log('최종 주소값', result);
            this.handleInputSingleValue('address', result);
          })
          .catch((error) => {
            console.log('axios 구글 maps api 에러', error);
          });
      }
    }
  };

  componentDidMount() {
    console.log('componentDidMount', this.state);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate', this.state);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>회원가입</Text>
          </View>
          <View style={styles.profileplaceholder}>
            {this.state.userInfo.profile_Photo && (
              <Image
                source={{ uri: this.state.userInfo.profile_Photo }}
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
              onChangeText={(txt) =>
                this.handleInputSingleValue('username', txt)
              }
            />
            <TextInput
              style={styles.textForm}
              placeholder="Password"
              onChangeText={(txt) =>
                this.handleInputSingleValue('password', txt)
              }
              secureTextEntry
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  DatePickerVisble: true,
                });
              }}
            >
              {this.state.DatePickerVisble === true ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    if (selectedDate !== undefined) {
                      let resultDate = '';
                      resultDate += selectedDate.getFullYear(); // '2020'
                      let month = selectedDate.getMonth() + 1;
                      if (month < 10) {
                        month = '0' + month;
                      }
                      resultDate += '-' + month; // '202007'
                      let date = selectedDate.getDate();
                      if (date < 10) {
                        date = '0' + date;
                      }
                      resultDate += '-' + date; // '20200723'

                      console.log('선택한 날짜', resultDate);
                      this.handleInputSingleValue('birth', resultDate);
                      this.handleInputSingleValue(
                        'age',
                        this.calculAge(resultDate),
                      );
                    }
                    this.handleInputValue('DatePickerVisble', false);
                    console.log(this.state.DatePickerVisble);
                  }}
                />
              ) : (
                ''
              )}
              {this.state.userInfo.birth === ''
                ? '생년월일을 선택해주세요'
                : `생년월일: ${this.state.userInfo.birth}`}
            </Text>
            <Text style={styles.modaltextForm} onPress={this.getLocation}>
              {this.state.userInfo.address === ''
                ? '지역을 선택해주세요'
                : `지역: ${this.state.userInfo.address}`}
            </Text>

            <TextInput
              style={styles.textForm}
              placeholder="nickname"
              onChangeText={(txt) =>
                this.handleInputSingleValue('nickname', txt)
              }
            />

            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  singlePickerVisible_blood: true,
                  singlePickerTitle: 'blood',
                  singlePickerSelectedTitle: '혈액형을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.blood === ''
                ? '혈액형을 선택해주세요'
                : `혈액형: ${this.state.userInfo.blood}`}
            </Text>
            <SinglePickerMaterialDialog
              title={this.state.singlePickerSelectedTitle}
              items={modalData.blood.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.singlePickerVisible_blood}
              selectedItem={this.state.singlePickerSelectedItem}
              onCancel={() =>
                this.setState({ singlePickerVisible_blood: false })
              }
              onOk={(result) => {
                this.setState({ singlePickerVisible_blood: false });
                this.setState({
                  singlePickerSelectedItem: result.selectedItem,
                });
                console.log(result.selectedItem); // result.selectedItem은 객체
                this.handleInputSingleValue(
                  this.state.singlePickerTitle,
                  result.selectedItem.label,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  singlePickerVisible_gender: true,
                  singlePickerTitle: 'gender',
                  singlePickerSelectedTitle: '성별을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.gender === ''
                ? '성별을 선택해주세요'
                : `성별: ${this.state.userInfo.gender}`}
            </Text>
            <SinglePickerMaterialDialog
              title={this.state.singlePickerSelectedTitle}
              items={modalData.gender.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.singlePickerVisible_gender}
              selectedItem={this.state.singlePickerSelectedItem}
              onCancel={() =>
                this.setState({ singlePickerVisible_gender: false })
              }
              onOk={(result) => {
                this.setState({ singlePickerVisible_gender: false });
                this.setState({
                  singlePickerSelectedItem: result.selectedItem,
                });
                console.log(result.selectedItem); // result.selectedItem은 객체
                this.handleInputSingleValue(
                  this.state.singlePickerTitle,
                  result.selectedItem.label,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  singlePickerVisible_drinking: true,
                  singlePickerTitle: 'drinking',
                  singlePickerSelectedTitle: '음주유형을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.drinking === ''
                ? '음주유형을 선택해주세요'
                : `음주유형: ${this.state.userInfo.drinking}`}
            </Text>
            <SinglePickerMaterialDialog
              title={this.state.singlePickerSelectedTitle}
              items={modalData.drinking.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.singlePickerVisible_drinking}
              selectedItem={this.state.singlePickerSelectedItem}
              onCancel={() =>
                this.setState({ singlePickerVisible_drinking: false })
              }
              onOk={(result) => {
                this.setState({ singlePickerVisible_drinking: false });
                this.setState({
                  singlePickerSelectedItem: result.selectedItem,
                });
                console.log(result.selectedItem); // result.selectedItem은 객체
                this.handleInputSingleValue(
                  this.state.singlePickerTitle,
                  result.selectedItem.label,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  singlePickerVisible_smoking: true,
                  singlePickerTitle: 'smoking',
                  singlePickerSelectedTitle: '흡연유형을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.smoking === ''
                ? '흡연유형을 선택해주세요'
                : `흡연유형: ${this.state.userInfo.smoking}`}
            </Text>
            <SinglePickerMaterialDialog
              title={this.state.singlePickerSelectedTitle}
              items={modalData.smoking.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.singlePickerVisible_smoking}
              selectedItem={this.state.singlePickerSelectedItem}
              onCancel={() =>
                this.setState({ singlePickerVisible_smoking: false })
              }
              onOk={(result) => {
                this.setState({ singlePickerVisible_smoking: false });
                this.setState({
                  singlePickerSelectedItem: result.selectedItem,
                });
                console.log(result.selectedItem); // result.selectedItem은 객체
                this.handleInputSingleValue(
                  this.state.singlePickerTitle,
                  result.selectedItem.label,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  singlePickerVisible_job: true,
                  singlePickerTitle: 'job',
                  singlePickerSelectedTitle: '직업을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.job === ''
                ? '직업을 선택해주세요'
                : `직업: ${this.state.userInfo.job}`}
            </Text>
            <SinglePickerMaterialDialog
              title={this.state.singlePickerSelectedTitle}
              items={modalData.job.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.singlePickerVisible_job}
              selectedItem={this.state.singlePickerSelectedItem}
              onCancel={() => this.setState({ singlePickerVisible_job: false })}
              onOk={(result) => {
                this.setState({ singlePickerVisible_job: false });
                this.setState({
                  singlePickerSelectedItem: result.selectedItem,
                });
                console.log(result.selectedItem); // result.selectedItem은 객체
                this.handleInputSingleValue(
                  this.state.singlePickerTitle,
                  result.selectedItem.label,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  singlePickerVisible_school: true,
                  singlePickerTitle: 'school',
                  singlePickerSelectedTitle: '학력을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.school === ''
                ? '학력을 선택해주세요'
                : `학력: ${this.state.userInfo.school}`}
            </Text>
            <SinglePickerMaterialDialog
              title={this.state.singlePickerSelectedTitle}
              items={modalData.school.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.singlePickerVisible_school}
              selectedItem={this.state.singlePickerSelectedItem}
              onCancel={() =>
                this.setState({ singlePickerVisible_school: false })
              }
              onOk={(result) => {
                this.setState({ singlePickerVisible_school: false });
                this.setState({
                  singlePickerSelectedItem: result.selectedItem,
                });
                console.log(result.selectedItem); // result.selectedItem은 객체
                this.handleInputSingleValue(
                  this.state.singlePickerTitle,
                  result.selectedItem.label,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  multiPickerVisible_hobby: true,
                  multiPickerTitle: 'hobby',
                  multiPickerSelectedTitle: '취미를 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.hobby.length === 0
                ? '취미를 선택해주세요'
                : `취미: ${this.state.userInfo.hobby.join(', ')}`}
            </Text>
            <MultiPickerMaterialDialog
              title={this.state.multiPickerSelectedTitle}
              items={modalData.hobby.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.multiPickerVisible_hobby}
              selectedItems={this.state.multiPickerSelectedItems}
              onCancel={() =>
                this.setState({ multiPickerVisible_hobby: false })
              }
              onOk={(result) => {
                this.setState({ multiPickerVisible_hobby: false });
                this.setState({
                  multiPickerSelectedItems: result.selectedItems,
                });
                console.log(result.selectedItems); // result.selectedItem은 객체가 든 배열
                this.handleInputMultiValue(
                  this.state.multiPickerTitle,
                  result.selectedItems,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  multiPickerVisible_personality: true,
                  multiPickerTitle: 'personality',
                  multiPickerSelectedTitle: '나의 성격을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.personality.length === 0
                ? '나의 성격을 선택해주세요'
                : `성격: ${this.state.userInfo.personality.join(', ')}`}
            </Text>
            <MultiPickerMaterialDialog
              title={this.state.multiPickerSelectedTitle}
              items={modalData.personality.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.multiPickerVisible_personality}
              selectedItems={this.state.multiPickerSelectedItems}
              onCancel={() =>
                this.setState({ multiPickerVisible_personality: false })
              }
              onOk={(result) => {
                this.setState({ multiPickerVisible_personality: false });
                this.setState({
                  multiPickerSelectedItems: result.selectedItems,
                });
                console.log(result.selectedItems); // result.selectedItem은 객체가 든 배열
                this.handleInputMultiValue(
                  this.state.multiPickerTitle,
                  result.selectedItems,
                );
              }}
            />
            <Text
              style={styles.modaltextForm}
              onPress={() => {
                this.setState({
                  multiPickerVisible_idealType: true,
                  multiPickerTitle: 'idealType',
                  multiPickerSelectedTitle: '이상형을 선택해주세요',
                });
              }}
            >
              {this.state.userInfo.idealType.length === 0
                ? '이상형을 선택해주세요'
                : `이상형: ${this.state.userInfo.idealType.join(', ')}`}
            </Text>
            <MultiPickerMaterialDialog
              title={this.state.multiPickerSelectedTitle}
              items={modalData.personality.map((row, index) => ({
                value: index,
                label: row,
              }))}
              visible={this.state.multiPickerVisible_idealType}
              selectedItems={this.state.multiPickerSelectedItems}
              onCancel={() =>
                this.setState({ multiPickerVisible_idealType: false })
              }
              onOk={(result) => {
                this.setState({ multiPickerVisible_idealType: false });
                this.setState({
                  multiPickerSelectedItems: result.selectedItems,
                });
                console.log(result.selectedItems); // result.selectedItem은 객체가 든 배열
                this.handleInputMultiValue(
                  this.state.multiPickerTitle,
                  result.selectedItems,
                );
              }}
            />
          </View>

          <View style={styles.submitbuttonArea}>
            <TouchableOpacity
              style={styles.submitbutton}
              onPress={() => {
                const {
                  username,
                  password,
                  address,
                  profile_Photo,
                  nickname,
                  blood,
                  gender,
                  drinking,
                  smoking,
                  job,
                  school,
                  hobby,
                  personality,
                  idealType,
                } = this.state.userInfo;
                if (
                  username &&
                  password &&
                  address &&
                  profile_Photo !== 'default' &&
                  nickname &&
                  blood &&
                  gender &&
                  drinking &&
                  smoking &&
                  job &&
                  school &&
                  hobby &&
                  personality &&
                  idealType
                ) {
                  // 서버로 보내기
                  const data = this.state.userInfo;
                  const { apiUrl } = getEnvVars();
                  console.log('data', data);
                  console.log('env ip주소', apiUrl);

                  axios({
                    url: `http://${apiUrl}/user/signup`, // 주소 맞음
                    method: 'POST',
                    data: data,
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                    .then((res) => {
                      if (res.status === 409) {
                        alert('이미 가입된 아이디입니다.');
                      } else if (res.status === 201) {
                        console.log(res.data);
                        alert('회원가입 완료');
                        this.props.navigation.navigate('LogIn'); // 로그인페이지로 이동
                      } else {
                        alert('회원가입 실패');
                      }
                    })
                    .catch((error) => {
                      console.log('error', error);
                    });
                } else {
                  alert('빠짐없이 입력해주세요');
                }
              }}
            >
              <Text style={styles.submitbuttonTitle}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.submitbuttonArea}>
            <TouchableOpacity
              style={styles.submitbutton}
              onPress={() => this.props.navigation.navigate('LogIn')} // 작동완료
            >
              <Text style={styles.submitbuttonTitle}>로그인으로 돌아기기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(SignUpScreen);

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
  modaltextForm: {
    borderWidth: 0.5,
    borderColor: '#888',
    width: '100%',
    height: hp('5%'),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
