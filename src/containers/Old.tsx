import { connect } from 'react-redux';
import Recommend from '../components/Recommend/Recommend';
import { ReCommend } from '../reducers/type';

function mapStateToProps(state: ReCommend) {
  console.log(state, '컨테이너에 올더');
  return {
    userProFile: state.UserPhoto,
  };
}

export default connect(mapStateToProps)(Recommend);
