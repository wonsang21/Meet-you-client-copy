import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import firstfake from '../fakeData/firstfake';
import Main from './Main';
import {setUser} from '../action'
import Recomment from '../components/Recommend/Recommend'
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';


export interface Props {
    userfile: {}
    onClick?:() => void
    navigation?: any
    dispatch:any
}
export interface State {
    userfile?: {}
}

class App extends Component<Props, State>{
    
    constructor(props: Readonly<Props>) {
        super(props)
        this.state = {
          userfile: []
        }
    }
    componentDidMount() {
        this.getUserfile()
    }
    getUserfile() {
        // this.setState({ userfile: firstfake})
        this.props.dispatch(setUser())
    }

    render() {
        console.log(this.state,'이거뭐ssssssssssssss야')
        return (
            <View>
            <Main ></Main>
            <Recomment></Recomment>
            </View>
        )
    }
}

const mapStateToProps = (state: {}) => {
    console.log(state,'stateaaa')
    return {
        userfile: state
    }
}
export default connect(mapStateToProps)(App)
