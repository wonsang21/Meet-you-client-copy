import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import { UserRE } from '../action';
import axios from 'axios';
import { setUser } from '../action';
import Recommend from '../components/Recommend/Recommend';


function mapStateToProps(state:any) {
    console.log(state,'컨테이너에 올더')
    return {
        oldUser: state.UserPhoto.odlUser
    }
}

export default connect(mapStateToProps)(Recommend);