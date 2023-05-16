import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import { Button, Input, SearchbarForm, SearchbarHeader } from './Searchbar.styled';

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
      <SearchbarHeader>
        <SearchbarForm onSubmit={this.handleSubmit}>
          <Button type="submit" aria-label="Search">
            <ImSearch size={28}/>
          </Button>

          <Input
            onChange={this.handleSearchChange}
            value={this.state.pictureName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchbarForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;