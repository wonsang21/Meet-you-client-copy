import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import { UserRE } from '../action';

function mapreduxstate(state: any) {
  console.log(state, '이거 컨태이너');
  return {
    userfile: state,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onClick: () => dispatch(UserRE()),
  };
}
export default connect(mapreduxstate, mapDispatchToProps)(Main);
