import { useState } from 'react';
import styles from './styles.module.css';
export const SearchBar= ({onSubmit}) => {

const [valueInput,setValueInput] = useState('') 


  

    return (
      <header className={styles.Searchbar}>
        <form
          className={styles.SearchForm}
          onSubmit={evt => {
            evt.preventDefault();
          onSubmit(valueInput);
            setValueInput('')
          }}
        >
          <button type="submit" className={styles.SearchFormbutton}>
            <span className={styles['button-label']}>Search</span>
          </button>

          <input
            onChange={evt => {
            setValueInput(evt.target.value)
            }}
            value={valueInput}
            className={styles.SearchForminput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}
