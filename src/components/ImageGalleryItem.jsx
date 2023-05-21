import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Modal } from './Modal';

export class LiList extends React.Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleModalOpen = () => {
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.handleModalClose();
    }
  };

  handleClick = () => {
    this.handleModalOpen();
  };

  render() {
    const { src, id, alt, big } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <li
          key={id}
          className={styles.ImageGalleryItem}
          onClick={this.handleClick}
        >
          <img
            className={styles.ImageGalleryItemimage}
            src={src}
            data-big={big}
            alt={alt}
          />
        </li>

        {showModal ? (
          <Modal src={src} alt={alt} onClose={this.handleModalClose} />
        ) : null}
      </>
    );
  }
}

LiList.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  big: PropTypes.string.isRequired,
};