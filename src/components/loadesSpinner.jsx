import PropTypes from 'prop-types';
export const SpinnerWait = ({ message }) => {
  return <h1>{message}</h1>;
};
SpinnerWait.propTypes = {
  message: PropTypes.string.isRequired,
};
