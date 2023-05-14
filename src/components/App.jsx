import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import SearchBar from './Searchbar';


class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName});
   };
  render() {

    return (
      <div>
              {/* onSubmit - передача аргумента в функцію */}
        <SearchBar onSubmit={this.handleFormSubmit}/>
        <ToastContainer autoClose={2000} position="top-center" theme="colored"/>
      </div>
    );
  }
} 

export default App;
