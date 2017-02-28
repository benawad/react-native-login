import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state, ownProps) => ({});

const actionCreators = {};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

