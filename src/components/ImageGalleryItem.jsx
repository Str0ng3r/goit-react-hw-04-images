import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Modal } from './Modal';

export const LiList = ({src, id, alt, big}) => {

const [showModal,setShowModal] = useState(false)


const handleModalOpen = () => {
  setShowModal(true)
};

const handleModalClose = () => {
  setShowModal(false)
};


const handleClick = () => {
  handleModalOpen();
}; 

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    handleModalClose();
  }
};


  useEffect(() => {

    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },);




    return (
      <>
        <li
          key={id}
          className={styles.ImageGalleryItem}
          onClick={handleClick}
        >
          <img
            className={styles.ImageGalleryItemimage}
            src={src}
            data-big={big}
            alt={alt}
          />
        </li>

        {showModal ? (
          <Modal src={src} alt={alt} onClose={handleModalClose} />
        ) : null}
      </>
    );
}

LiList.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  big: PropTypes.number.isRequired,
};