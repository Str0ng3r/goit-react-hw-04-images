import PropTypes from 'prop-types';
import styles from './styles.module.css';
export const ButtonLoad = ({ funcLoad }) => {
  return (
    <button className={styles.Button} onClick={funcLoad}>
      Load More
    </button>
  );
};
ButtonLoad.propTypes = {
  funcLoad: PropTypes.func.isRequired,
};
