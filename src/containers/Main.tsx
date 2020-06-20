import {connect} from 'react-redux'
import Main from '../components/Main/Main'
import {UserRE} from '../action'
import axios from 'axios';
import { setUser } from '../action'
function mapreduxstate(state:any) {
    console.log(state,'이거 컨태이너')
    return {
        userfile: state
        
    }
}

function mapDispatchToProps(dispatch: any, { userId}:number) {
  console.log(typeof userId,'임너감넝람너라무푸푸푸푸푸푸')
    return {
      onClick: () =>
        axios({
          url: 'http://172.30.1.58:5000/main/randomUsers',
          method: 'get',
          params: {
            userId: userId,
          },
        })
          .then((data) => {
            console.log(data, 'axios');
            dispatch(setUser(data.data));
          })
          .catch((error) => {
            console.log(error, 'error');
          }),
    };
}
export default connect(mapreduxstate, mapDispatchToProps)(Main)
