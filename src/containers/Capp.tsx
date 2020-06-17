import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Main from './Main';
import { setUser, myProFile} from '../action'
import Recomment from '../components/Recommend/Recommend'
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import axios from 'axios';


export interface Props {
    userfile: {}
    onClick?:() => void
    navigation?: any
    dispatch:any
    randomUser:any
}
export interface State {
    userfile?: {}
}

class App extends Component<Props, State>{
    
    constructor(props: Readonly<Props>) {
        super(props)
        
    }
    componentDidMount() {
        this.getUserfile()
    }
    getUserfile() {
        axios({
            url: 'http://192.168.0.16:5000/user/information',
            method: 'get',
            headers: {
                'Authorization': `Basic ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuuCqOyekCIsInBhc3N3b3JkIjoiY2Q4M2ExYTdkZWUwNWVhYzg4NDI5YjU0NTg4ZTI1ZDRkMDZlYWU5OCIsImlhdCI6MTU5MjMwMzIzNCwiZXhwIjoxNTkyMzg5NjM0fQ.KVg8po1zCMF9QEbCBU4gSD2d6Uq9PDuAbermdZskYvM"}`
            }
        }).then(data => {
            console.log(data,'axios')
            this.props.dispatch(myProFile(data.data[0]))
            this.props.dispatch(setUser(data.data[1]))
        }).catch((error) => {
            console.log(error,'error')
        })
    }

    render() {
        console.log(this.props,'이거뭐ssssssssssssss야')
        return (
            <View>
            <Main ></Main>
            <Recomment></Recomment>
            </View>
        )
    }
}

const mapStateToProps = (state: any) => {
    console.log(state,'stateaaa')
    return {
        userfile: state.UserPhoto,
        myprofile: state.Myprofile
    }
}
export default connect(mapStateToProps)(App)
