// import React, { Component } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { withNavigation } from 'react-navigation';
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import {
//   SinglePickerMaterialDialog,
//   MultiPickerMaterialDialog,
// } from 'react-native-material-dialog';
// import signUpData from '../signUpData/data';
// import axios from 'axios';

// interface SignUpProps {}

// interface SignUpState {
//   userInfo: any;
//   singlePickerVisible_blood: boolean;
//   singlePickerVisible_gender: boolean;
//   singlePickerVisible_drinking: boolean;
//   singlePickerVisible_smoking: boolean;
//   singlePickerVisible_job: boolean;
//   singlePickerVisible_school: boolean;
//   singlePickerTitle: string;
//   singlePickerSelectedTitle: string;
//   singlePickerSelectedItem: any;
//   multiPickerVisible_hobby: boolean;
//   multiPickerVisible_personality: boolean;
//   multiPickerVisible_idealType: boolean;
//   multiPickerTitle: string;
//   multiPickerSelectedTitle: string;
//   multiPickerSelectedItems: any;
// }

// class SignUpScreen extends Component<SignUpProps, SignUpState> {
//   constructor(props: SignUpProps) {
//     super(props);
//     this.state = {
//       userInfo: {
//         username: '',
//         password: '',
//         age: '',
//         address: '',
//         profile_photo: 'default',
//         nickname: '',
//         blood: '',
//         gender: '',
//         drinking: '',
//         smoking: '',
//         job: '',
//         school: '',
//         hobby: [],
//         personality: [],
//         idealType: [],
//       },
//       singlePickerVisible_blood: false,
//       singlePickerVisible_gender: false,
//       singlePickerVisible_drinking: false,
//       singlePickerVisible_smoking: false,
//       singlePickerVisible_job: false,
//       singlePickerVisible_school: false,
//       singlePickerTitle: '',
//       singlePickerSelectedTitle: '',
//       singlePickerSelectedItem: {
//         value: '',
//         label: '',
//       },
//       multiPickerVisible_hobby: false,
//       multiPickerVisible_personality: false,
//       multiPickerVisible_idealType: false,
//       multiPickerTitle: '',
//       multiPickerSelectedTitle: '',
//       multiPickerSelectedItems: [
//         {
//           value: '',
//           label: '',
//         },
//       ],
//     };
//     this.handleInputSingleValue = this.handleInputSingleValue.bind(this);
//     this.handleInputMultiValue = this.handleInputMultiValue.bind(this);
//   }

//   // 회원가입 정보 입력부분을 state값에 넣어주는 함수
//   handleInputSingleValue = (name, value) => {
//     this.setState({
//       userInfo: { ...this.state.userInfo, [name]: value },
//     });
//   };
//   // 회원가입 정보 입력부분을 state값에 넣어주는 함수 (모달 다중 선택전용)
//   handleInputMultiValue = (name, values: []) => {
//     const arr: never[] = [];
//     if (values.length !== 0) {
//       for (let i = 0; i < values.length; i++) {
//         arr.push(values[i]['label']);
//       }
//     }
//     this.setState({
//       userInfo: { ...this.state.userInfo, [name]: arr },
//     });
//   };

//   // 갤러리에 있는 이미지를 불러와 state값에 넣어주는 함수
//   pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       this.setState({
//         userInfo: { ...this.state.userInfo, profile_photo: result.uri },
//       });
//     }
//   };

//   // 앱 실행시 초기에 나오는 권한 설정 (카메라, 위치등)
//   componentDidMount() {
//     (async () => {
//       if (Constants.platform?.android) {
//         const {
//           status,
//         } = await ImagePicker.requestCameraRollPermissionsAsync();
//         if (status !== 'granted') {
//           alert('카메라 및 갤러리 접근 권한이 꼭 필요합니다!!');
//         }
//       }
//     })();

//     //   axios({
//     //     // get 성공!
//     //     url: 'http://172.30.1.15:5000/user/information',
//     //     method: 'get',
//     //     headers: {
//     //       Authorization: `Basic ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndvbnNhbmcyMSIsInBhc3N3b3JkIjoiZDZiZWQ3MTBkYTNkNzRhZWEwMDZkOGFhYzE4YzVmODQ5OWE4MTYxZiIsImlhdCI6MTU5MjQxNDIxOCwiZXhwIjoxNTkyNTAwNjE4fQ.q4gxtGMQV9T8Uw2BS-BWEXuOp22rsu-ngfjzZW94wXs'}`,
//     //     },
//     //   })
//     //     .then((data) => {
//     //       console.log(data, 'axios');
//     //       alert('information');
//     //     })
//     //     .catch((error) => {
//     //       console.log(error, 'error');
//     //     });
//   }

//   componentDidUpdate() {
//     console.log('componentDidUpdate', this.state);
//   }

//   render() {
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.titleArea}>
//             <Text style={styles.title}>회원가입</Text>
//           </View>
//           <View style={styles.profileplaceholder}>
//             {this.state.userInfo.profile_photo && (
//               <Image
//                 source={{ uri: this.state.userInfo.profile_photo }}
//                 style={{ width: 200, height: 200 }}
//               />
//             )}
//           </View>
//           <View style={styles.submitbuttonArea}>
//             <TouchableOpacity
//               style={styles.submitbutton}
//               onPress={this.pickImage}
//             >
//               <Text style={styles.submitbuttonTitle}>프로필 사진 추가</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.formArea}>
//             <TextInput
//               style={styles.textForm}
//               placeholder="ID"
//               onChangeText={(txt) =>
//                 this.handleInputSingleValue('username', txt)
//               }
//             />
//             <TextInput
//               style={styles.textForm}
//               placeholder="Password"
//               onChangeText={(txt) =>
//                 this.handleInputSingleValue('password', txt)
//               }
//               secureTextEntry
//             />
//             <TextInput
//               style={styles.textForm}
//               placeholder="age"
//               onChangeText={(txt) => this.handleInputSingleValue('age', txt)}
//             />
//             <TextInput
//               style={styles.textForm}
//               placeholder="address"
//               onChangeText={(txt) =>
//                 this.handleInputSingleValue('address', txt)
//               }
//             />
//             <TextInput
//               style={styles.textForm}
//               placeholder="nickname"
//               onChangeText={(txt) =>
//                 this.handleInputSingleValue('nickname', txt)
//               }
//             />

//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   singlePickerVisible_blood: true,
//                   singlePickerTitle: 'blood',
//                   singlePickerSelectedTitle: '혈액형을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.blood === ''
//                 ? '혈액형을 선택해주세요'
//                 : `혈액형: ${this.state.userInfo.blood}`}
//             </Text>
//             <SinglePickerMaterialDialog
//               title={this.state.singlePickerSelectedTitle}
//               items={signUpData.blood.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.singlePickerVisible_blood}
//               selectedItem={this.state.singlePickerSelectedItem}
//               onCancel={() =>
//                 this.setState({ singlePickerVisible_blood: false })
//               }
//               onOk={(result) => {
//                 this.setState({ singlePickerVisible_blood: false });
//                 this.setState({
//                   singlePickerSelectedItem: result.selectedItem,
//                 });
//                 console.log(result.selectedItem); // result.selectedItem은 객체
//                 this.handleInputSingleValue(
//                   this.state.singlePickerTitle,
//                   result.selectedItem.label,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   singlePickerVisible_gender: true,
//                   singlePickerTitle: 'gender',
//                   singlePickerSelectedTitle: '성별을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.gender === ''
//                 ? '성별을 선택해주세요'
//                 : `성별: ${this.state.userInfo.gender}`}
//             </Text>
//             <SinglePickerMaterialDialog
//               title={this.state.singlePickerSelectedTitle}
//               items={signUpData.gender.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.singlePickerVisible_gender}
//               selectedItem={this.state.singlePickerSelectedItem}
//               onCancel={() =>
//                 this.setState({ singlePickerVisible_gender: false })
//               }
//               onOk={(result) => {
//                 this.setState({ singlePickerVisible_gender: false });
//                 this.setState({
//                   singlePickerSelectedItem: result.selectedItem,
//                 });
//                 console.log(result.selectedItem); // result.selectedItem은 객체
//                 this.handleInputSingleValue(
//                   this.state.singlePickerTitle,
//                   result.selectedItem.label,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   singlePickerVisible_drinking: true,
//                   singlePickerTitle: 'drinking',
//                   singlePickerSelectedTitle: '음주유형을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.drinking === ''
//                 ? '음주유형을 선택해주세요'
//                 : `음주유형: ${this.state.userInfo.drinking}`}
//             </Text>
//             <SinglePickerMaterialDialog
//               title={this.state.singlePickerSelectedTitle}
//               items={signUpData.drinking.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.singlePickerVisible_drinking}
//               selectedItem={this.state.singlePickerSelectedItem}
//               onCancel={() =>
//                 this.setState({ singlePickerVisible_drinking: false })
//               }
//               onOk={(result) => {
//                 this.setState({ singlePickerVisible_drinking: false });
//                 this.setState({
//                   singlePickerSelectedItem: result.selectedItem,
//                 });
//                 console.log(result.selectedItem); // result.selectedItem은 객체
//                 this.handleInputSingleValue(
//                   this.state.singlePickerTitle,
//                   result.selectedItem.label,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   singlePickerVisible_smoking: true,
//                   singlePickerTitle: 'smoking',
//                   singlePickerSelectedTitle: '흡연유형을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.smoking === ''
//                 ? '흡연유형을 선택해주세요'
//                 : `흡연유형: ${this.state.userInfo.smoking}`}
//             </Text>
//             <SinglePickerMaterialDialog
//               title={this.state.singlePickerSelectedTitle}
//               items={signUpData.smoking.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.singlePickerVisible_smoking}
//               selectedItem={this.state.singlePickerSelectedItem}
//               onCancel={() =>
//                 this.setState({ singlePickerVisible_smoking: false })
//               }
//               onOk={(result) => {
//                 this.setState({ singlePickerVisible_smoking: false });
//                 this.setState({
//                   singlePickerSelectedItem: result.selectedItem,
//                 });
//                 console.log(result.selectedItem); // result.selectedItem은 객체
//                 this.handleInputSingleValue(
//                   this.state.singlePickerTitle,
//                   result.selectedItem.label,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   singlePickerVisible_job: true,
//                   singlePickerTitle: 'job',
//                   singlePickerSelectedTitle: '직업을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.job === ''
//                 ? '직업을 선택해주세요'
//                 : `직업: ${this.state.userInfo.job}`}
//             </Text>
//             <SinglePickerMaterialDialog
//               title={this.state.singlePickerSelectedTitle}
//               items={signUpData.job.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.singlePickerVisible_job}
//               selectedItem={this.state.singlePickerSelectedItem}
//               onCancel={() => this.setState({ singlePickerVisible_job: false })}
//               onOk={(result) => {
//                 this.setState({ singlePickerVisible_job: false });
//                 this.setState({
//                   singlePickerSelectedItem: result.selectedItem,
//                 });
//                 console.log(result.selectedItem); // result.selectedItem은 객체
//                 this.handleInputSingleValue(
//                   this.state.singlePickerTitle,
//                   result.selectedItem.label,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   singlePickerVisible_school: true,
//                   singlePickerTitle: 'school',
//                   singlePickerSelectedTitle: '학력을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.school === ''
//                 ? '학력을 선택해주세요'
//                 : `학력: ${this.state.userInfo.school}`}
//             </Text>
//             <SinglePickerMaterialDialog
//               title={this.state.singlePickerSelectedTitle}
//               items={signUpData.school.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.singlePickerVisible_school}
//               selectedItem={this.state.singlePickerSelectedItem}
//               onCancel={() =>
//                 this.setState({ singlePickerVisible_school: false })
//               }
//               onOk={(result) => {
//                 this.setState({ singlePickerVisible_school: false });
//                 this.setState({
//                   singlePickerSelectedItem: result.selectedItem,
//                 });
//                 console.log(result.selectedItem); // result.selectedItem은 객체
//                 this.handleInputSingleValue(
//                   this.state.singlePickerTitle,
//                   result.selectedItem.label,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   multiPickerVisible_hobby: true,
//                   multiPickerTitle: 'hobby',
//                   multiPickerSelectedTitle: '취미를 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.hobby.length === 0
//                 ? '취미를 선택해주세요'
//                 : `취미: ${this.state.userInfo.hobby.join(', ')}`}
//             </Text>
//             <MultiPickerMaterialDialog
//               title={this.state.multiPickerSelectedTitle}
//               items={signUpData.hobby.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.multiPickerVisible_hobby}
//               selectedItems={this.state.multiPickerSelectedItems}
//               onCancel={() =>
//                 this.setState({ multiPickerVisible_hobby: false })
//               }
//               onOk={(result) => {
//                 this.setState({ multiPickerVisible_hobby: false });
//                 this.setState({
//                   multiPickerSelectedItems: result.selectedItems,
//                 });
//                 console.log(result.selectedItems); // result.selectedItem은 객체가 든 배열
//                 this.handleInputMultiValue(
//                   this.state.multiPickerTitle,
//                   result.selectedItems,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   multiPickerVisible_personality: true,
//                   multiPickerTitle: 'personality',
//                   multiPickerSelectedTitle: '나의 성격을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.personality.length === 0
//                 ? '나의 성격을 선택해주세요'
//                 : `성격: ${this.state.userInfo.personality.join(', ')}`}
//             </Text>
//             <MultiPickerMaterialDialog
//               title={this.state.multiPickerSelectedTitle}
//               items={signUpData.personality.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.multiPickerVisible_personality}
//               selectedItems={this.state.multiPickerSelectedItems}
//               onCancel={() =>
//                 this.setState({ multiPickerVisible_personality: false })
//               }
//               onOk={(result) => {
//                 this.setState({ multiPickerVisible_personality: false });
//                 this.setState({
//                   multiPickerSelectedItems: result.selectedItems,
//                 });
//                 console.log(result.selectedItems); // result.selectedItem은 객체가 든 배열
//                 this.handleInputMultiValue(
//                   this.state.multiPickerTitle,
//                   result.selectedItems,
//                 );
//               }}
//             />
//             <Text
//               style={styles.modaltextForm}
//               onPress={() => {
//                 this.setState({
//                   multiPickerVisible_idealType: true,
//                   multiPickerTitle: 'idealType',
//                   multiPickerSelectedTitle: '이상형을 선택해주세요',
//                 });
//               }}
//             >
//               {this.state.userInfo.idealType.length === 0
//                 ? '이상형을 선택해주세요'
//                 : `이상형: ${this.state.userInfo.idealType.join(', ')}`}
//             </Text>
//             <MultiPickerMaterialDialog
//               title={this.state.multiPickerSelectedTitle}
//               items={signUpData.personality.map((row, index) => ({
//                 value: index,
//                 label: row,
//               }))}
//               visible={this.state.multiPickerVisible_idealType}
//               selectedItems={this.state.multiPickerSelectedItems}
//               onCancel={() =>
//                 this.setState({ multiPickerVisible_idealType: false })
//               }
//               onOk={(result) => {
//                 this.setState({ multiPickerVisible_idealType: false });
//                 this.setState({
//                   multiPickerSelectedItems: result.selectedItems,
//                 });
//                 console.log(result.selectedItems); // result.selectedItem은 객체가 든 배열
//                 this.handleInputMultiValue(
//                   this.state.multiPickerTitle,
//                   result.selectedItems,
//                 );
//               }}
//             />
//           </View>

//           <View style={styles.submitbuttonArea}>
//             <TouchableOpacity
//               style={styles.submitbutton}
//               onPress={() => {
//                 const {
//                   username,
//                   password,
//                   address,
//                   profile_photo,
//                   nickname,
//                   blood,
//                   gender,
//                   drinking,
//                   smoking,
//                   job,
//                   school,
//                   hobby,
//                   personality,
//                   idealType,
//                 } = this.state.userInfo;
//                 if (
//                   username &&
//                   password &&
//                   address &&
//                   profile_photo !== 'default' &&
//                   nickname &&
//                   blood &&
//                   gender &&
//                   drinking &&
//                   smoking &&
//                   job &&
//                   school &&
//                   hobby &&
//                   personality &&
//                   idealType
//                 ) {
//                   // 서버로 보내기
//                   const data = this.state.userInfo;
//                   console.log('data', data);

//                   axios({
//                     url: 'http://172.30.1.58:5000/user/signup', // 주소 맞음
//                     method: 'POST',
//                     data: data,
//                     headers: {
//                       'Content-Type': 'application/json',
//                     },
//                   })
//                     .then((res) => {
//                       if (res.status === 409) {
//                         alert('이미 가입된 아이디입니다.');
//                       } else if (res.status === 201) {
//                         console.log(res.data);
//                         alert('회원가입 완료');
//                         this.props.navigation.navigate('LogIn'); // 로그인페이지로 이동
//                       } else {
//                         alert('회원가입 실패');
//                       }
//                     })
//                     .catch((error) => {
//                       console.log('error', error);
//                     });
//                 } else {
//                   alert('빠짐없이 입력해주세요');
//                 }
//               }}
//             >
//               <Text style={styles.submitbuttonTitle}>회원가입</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.submitbuttonArea}>
//             <TouchableOpacity
//               style={styles.submitbutton}
//               onPress={() => this.props.navigation.navigate('Login')} // 작동완료
//             >
//               <Text style={styles.submitbuttonTitle}>로그인으로 돌아기기</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// export default withNavigation(SignUpScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingLeft: wp('10%'),
//     paddingRight: wp('10%'),
//     alignItems: 'center',
//   },
//   titleArea: {
//     width: '100%',
//     padding: wp('10%'),
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: wp('10%'),
//   },
//   formArea: {
//     width: '100%',
//     paddingBottom: wp('10%'),
//   },
//   textForm: {
//     borderWidth: 0.5,
//     borderColor: '#888',
//     width: '100%',
//     height: hp('5%'),
//     paddingLeft: 5,
//     paddingRight: 5,
//     marginBottom: 5,
//   },
//   modaltextForm: {
//     borderWidth: 0.5,
//     borderColor: '#888',
//     width: '100%',
//     height: hp('5%'),
//     paddingLeft: 5,
//     paddingRight: 5,
//     marginBottom: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitbuttonArea: {
//     width: '100%',
//     height: hp('5%'),
//   },
//   submitbutton: {
//     backgroundColor: '#46c3ad',
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitbuttonTitle: {
//     color: 'white',
//   },
//   profileplaceholder: {
//     borderWidth: 1,
//     borderColor: 'black',
//     backgroundColor: '#eee',
//     width: 202,
//     height: 202,
//     marginTop: 5,
//   },
// });
