import { connect } from 'react-redux';
import Main from '../components/Main';
import axios from 'axios';
import { setUser } from '../action';
import getEnvVars from '../../environments';
function mapreduxstate(state: any) {
  // console.log(state, '이거 컨태이너');
  return {
    userfile: state,
  };
}

function mapDispatchToProps(dispatch: any, { userId }: any) {
  const { apiUrl } = getEnvVars();
  return {
    onClick: () =>
      axios({
        url: `http://${apiUrl}/main/randomUsers`,
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
export default connect(mapreduxstate, mapDispatchToProps)(Main);
