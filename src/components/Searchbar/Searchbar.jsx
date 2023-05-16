import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';

class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleSearchChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.pictureName.trim() === '') {
      return toast.warn('Enter picture name');
    }
    // При сабміті форми викликаємо метод з Арр onSubmit та передаємо йому значення state з цієї форми
    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header className="searchBar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <ImSearch  />
          </button>

          <input
            onChange={this.handleSearchChange}
            value={this.state.pictureName}
            className="input"
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;