import { Component } from 'react';
import styles from './styles.module.css';
export class SearchBar extends Component {
  state = {
    valueInput: '',
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form
          className={styles.SearchForm}
          onSubmit={evt => {
            evt.preventDefault();
            this.props.onSubmit(this.state.valueInput);
            this.setState({
              valueInput: '',
            });
          }}
        >
          <button type="submit" className={styles.SearchFormbutton}>
            <span className={styles['button-label']}>Search</span>
          </button>

          <input
            onChange={evt => {
              this.setState({
                valueInput: evt.target.value,
              });
            }}
            value={this.state.valueInput}
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
}
