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

function mapDispatchToProps(dispatch:any) {
    return {
      onClick: () =>
        axios({
          url: 'http://192.168.0.16:5000/user/information',
          method: 'get',
          headers: {
            Authorization: `Basic ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuywqOuLqOu5hCIsInBhc3N3b3JkIjoiZDZiZWQ3MTBkYTNkNzRhZWEwMDZkOGFhYzE4YzVmODQ5OWE4MTYxZiIsImlhdCI6MTU5MjQ4MDY2MCwiZXhwIjoxNTkyNTY3MDYwfQ.kcic-giPE-3p_paURXcvk_3WRy0gq8amtPcq6HXCWdw'}`,
          },
        })
          .then((data) => {
            console.log(data, 'axios');
            dispatch(setUser(data.data[1]));
          })
          .catch((error) => {
            console.log(error, 'error');
          }),
    };
}
export default connect(mapreduxstate, mapDispatchToProps)(Main)
