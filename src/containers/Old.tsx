import { connect } from 'react-redux';
import Recommend from '../components/Recommend/Recommend';
import { ReCommend } from '../reducers/type';

function mapStateToProps(state: ReCommend) {
  return {
    userProFile: state.UserPhoto,
  };
}

export default connect(mapStateToProps)(Recommend);
