import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ListGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import axios from 'axios';
import { SpinnerWait } from './loadesSpinner';
import { ButtonLoad } from './ButtonLoader';
import styles from './styles.module.css';

export const App = () => {
  const [massiveLoading, setMassiveLoading] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [buttonLoad, setButtonLoad] = useState(false);
  const [pages, setPages] = useState(1);

  const prevSearchNameRef = useRef('');
  const prevPagesRef = useRef(2);

  const fetchData = useCallback(() => {
    setSpinner(true);

    axios
      .get(
        `https://pixabay.com/api/?q=${searchName}&page=${pages}&key=34891716-36b65b6efae61fa69d260cb9b&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits } = response.data;
        const massiveLoadin = [...massiveLoading, ...hits];
        setMassiveLoading(massiveLoadin);
        setSpinner(false);

        if (hits.length === 12) {
          setButtonLoad(true);
        }
      })
      .catch(error => {
        setErrorState(true);
        setSpinner(false);
      });
  }, [searchName, pages, massiveLoading]);

  useEffect(() => {
    if (prevSearchNameRef.current !== searchName || prevPagesRef.current !== pages) {
      fetchData();
    }

    prevSearchNameRef.current = searchName;
    prevPagesRef.current = pages;
  }, [searchName, pages, fetchData]);

  const fcOnSb = val => {
    setSearchName(val);
    setMassiveLoading([]);
    setSpinner(true);
    setPages(1);
  };

  const fcLoader = () => {
    setPages(pages + 1);
    setSpinner(true);
    setButtonLoad(false);
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={fcOnSb} />
      {errorState && <SpinnerWait message="Произошла ошибка" />}
      {massiveLoading.length > 1 && <ListGallery mass={massiveLoading} />}
      {spinner && <SpinnerWait message="Пожалуйста, подождите" />}
      {buttonLoad && <ButtonLoad funcLoad={fcLoader} />}
    </div>
  );
};