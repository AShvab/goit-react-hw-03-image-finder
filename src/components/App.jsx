import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';


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
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictureName={this.state.pictureName} />
        <ToastContainer autoClose={2000} position="top-center" />
      </div>
    );
  }
} 

export default App;

