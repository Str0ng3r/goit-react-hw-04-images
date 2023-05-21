import PropTypes from 'prop-types';
import styles from './styles.module.css';
export const Modal = ({ src, alt, onClose }) => (
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
  

  Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };