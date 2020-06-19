import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import { UserRE } from '../action';
import axios from 'axios';
import { setUser } from '../action';
function mapreduxstate(state: any) {
  console.log(state, '이거 컨태이너');
  return {
    userfile: state,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onClick: () =>
      axios({
        url: 'http://172.30.1.15:5000:5000/user/information',
        method: 'get',
        headers: {
          Authorization: `Basic ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuuCqOyekCIsInBhc3N3b3JkIjoiY2Q4M2ExYTdkZWUwNWVhYzg4NDI5YjU0NTg4ZTI1ZDRkMDZlYWU5OCIsImlhdCI6MTU5MjMwMzIzNCwiZXhwIjoxNTkyMzg5NjM0fQ.KVg8po1zCMF9QEbCBU4gSD2d6Uq9PDuAbermdZskYvM'}`,
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
export default connect(mapreduxstate, mapDispatchToProps)(Main);
