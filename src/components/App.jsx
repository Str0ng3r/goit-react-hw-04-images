import { useState } from 'react';
import { ListGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import axios from 'axios';
import { SpinnerWait } from './loadesSpinner';
import { ButtonLoad } from './ButtonLoader';
import styles from './styles.module.css';
import { useEffect } from 'react';

export const App = ({}) => {

const [massiveData,setMassiveData] = useState([])
const [massiveLoading,setMassiveLoading] = useState([])
const [spinner,setSpinner] = useState(false)
const [errorState,setErrorState] = useState(false)
const [searchName,setSearchName] = useState('')
const [buttonLoad,setButtonLoad] = useState(false)
const [pages,setPages] = useState(2)



  // state = {
  //   massiveData: [],
  //   massiveLoading: [],
  //   spinner: false,
  //   errorState: false,
  //   searchName: '',
  //   buttonLoad: false,
  //   pages: 2,
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchName !== this.state.searchName || prevState.pages !== this.state.pages) {
  //     this.fetchData();
  //   }
  // }

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
        setSpinner(true)
      });
  };

  const fcOnSb = val => {
    this.setState({
      searchName: val,
      massiveLoading: [],
      spinner: true,
      pages: 2,
    });
  };

 const fcLoader = () => {
    this.setState(
      prevState => ({
        pages: prevState.pages + 1,
        spinner: true,
        buttonLoad: false,
      }),
      fetchData
    );
  };


    // const { errorState, spinner, massiveData, massiveLoading, buttonLoad } =
    //   this.state;


    return (
      <div className={styles.App}>
        <SearchBar onSubmit={fcOnSb} />
        {errorState && <SpinnerWait message="Произошла ошибка" />}
        {massiveData.length > 1 && <ListGallery mass={massiveData} />}
        {massiveLoading.length > 1 && <ListGallery mass={massiveLoading} />}
        {spinner && <SpinnerWait message="Пожалуйста, подождите" />}
        {buttonLoad && <ButtonLoad funcLoad={fcLoader} />}
      </div>
    )
}
