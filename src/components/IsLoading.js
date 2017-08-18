import React from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import {Dimmer, Loader} from 'semantic-ui-react';

const error = {
  textAlign: 'center',
  fontSize: '25px',
  color: 'rgba(0, 0, 0, 0.30)',
  paddingBottom: '7%',
  fontWeight: 500,
};
class IsLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }

  componentDidMount() {
    this.setTimer();
  }
  componentWillUpdate(nextProps) {
    if (nextProps.data) {
      this.setTimer();
      this.setState(prevState => ({
        display: !prevState.display, // if there is data remove the progress bar
      }));
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  setTimer = () => {
    // eslint-disable-next-line
    this.timer != null ? clearTimeout(this.timer) : null;
    this.timer = setTimeout(() => {
      this.setState(prevState => ({ display: !prevState.display }));
      this.timer = null;
    }, this.props.delay);
  };
  render() {
    console.log('props', this.props.shortCountryNames);
    return this.state.display
      ?
      <Dimmer active inverted>
        <Loader size='mini'>Loading</Loader>
      </Dimmer>
      : <div style={error}> No Data Currently available </div>;
  }
}
// // TODO: needs to be implimented for ajax calls;
// const IsLoadingCircular = (props) => {
//   return <CircularProgress size={props.size || 20} thickness={props.thickness || 3} />;
// };
IsLoading.defaultProps = { delay: 8500, type: 'linear' };
/* eslint-disable react/forbid-prop-types */
IsLoading.propTypes = { data: PropTypes.any, delay: PropTypes.number };
// IsLoadingCircular.defaultProps = { size: 20, thickness: 3 };
// IsLoadingCircular.propTypes = { size: PropTypes.number, thickness: PropTypes.number };
export default IsLoading;
