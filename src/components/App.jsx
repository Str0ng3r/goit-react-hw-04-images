import { useState } from 'react';
import { ListGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import axios from 'axios';
import { SpinnerWait } from './loadesSpinner';
import { ButtonLoad } from './ButtonLoader';
import styles from './styles.module.css';
import { useEffect,useRef } from 'react';

export const App = () => {

const [massiveLoading,setMassiveLoading] = useState([])
const [spinner,setSpinner] = useState(false)
const [errorState,setErrorState] = useState(false)
const [searchName,setSearchName] = useState('')
const [buttonLoad,setButtonLoad] = useState(false)
const [pages,setPages] = useState(2)


  const prevSearchNameRef = useRef(searchName);
  const prevPagesRef = useRef(pages);

  useEffect(() => {
    if (prevSearchNameRef.current !== searchName || prevPagesRef.current !== pages) {
      fetchData();
    }
  
    prevSearchNameRef.current = searchName;
    prevPagesRef.current = pages;
  }, [searchName, pages]);

  
  const fetchData = () => {
   setSpinner(true)

    axios
      .get(
        `https://pixabay.com/api/?q=${searchName}&page=${pages}&key=34891716-36b65b6efae61fa69d260cb9b&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits } = response.data;
        const massiveLoadin = [...massiveLoading, ...hits];
setMassiveLoading(massiveLoadin)
setSpinner(false)
        if(hits.length === 12){
          setButtonLoad(true)
        }})
      .catch(error => {
        setErrorState(true)
        setSpinner(false)
      });
  };



  const fcOnSb = val => {
setSearchName(val)
setMassiveLoading([])
setSpinner(true)
setPages(2)
  };

 const fcLoader = () => {
  setPages(pages + 1)
  fetchData()
  setSpinner(true)
  setButtonLoad(false)
  };

    return (
      <div className={styles.App}>
        <SearchBar onSubmit={fcOnSb} />
        {errorState && <SpinnerWait message="Произошла ошибка" />}
        {massiveLoading.length > 1 && <ListGallery mass={massiveLoading} />}
        {spinner && <SpinnerWait message="Пожалуйста, подождите" />}
        {buttonLoad && <ButtonLoad funcLoad={fcLoader} />}
      </div>
    )
}
