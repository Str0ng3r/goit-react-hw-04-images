import PropTypes from 'prop-types';
import { LiList } from './ImageGalleryItem';
import styles from './styles.module.css';
export const ListGallery = ({ mass }) => {
  return (
    <ul className={styles.ImageGallery}>
      {mass.map(item => (
        <LiList
          key={item.id}
          big={item.id}
          id={item.id}
          src={item.largeImageURL}
          alt={item.tags}
        />
      ))}
    </ul>
  );
};
ListGallery.propTypes = {
  mass: PropTypes.array.isRequired,
};
