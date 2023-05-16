import PropTypes from 'prop-types';
import { Component } from 'react';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { fetchImages } from '../../services/api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, _) {
    const prevSearchQuery = prevProps.pictureName;
    const nextSearchQuery = this.props.pictureName;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending', page: 1 });

      try {
        const { hits, total } = await fetchImages(nextSearchQuery, 1);

        if (total === 0) {
          this.setState({ error: new Error('Sorry, we found no images'), status: 'rejected' });
          return;
        }

        this.setState(prevState => {
          return {
            gallery: hits,
            status: 'resolved',
            page: prevState.page + 1,
          };
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  loadMoreHandler = async () => {
    try {
      const { hits } = await fetchImages(
        this.props.pictureName,
        this.state.page
      );
      this.setState(prevState => {
        return {
          gallery: [...prevState.gallery, ...hits],
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      return;
    }
  };

  render() {
    const { gallery, error, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      toast.error(`Error: ${error.message}`);
      return null;
    }

    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                alt={tags}
                largeImage={largeImageURL}
              />
            ))}
          </Gallery>
          <Button onClick={this.loadMoreHandler}>Load more</Button>
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  pictureName: PropTypes.string.isRequired,
};

export default ImageGallery;
