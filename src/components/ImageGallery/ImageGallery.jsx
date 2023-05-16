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
    isEndOfListReached: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.pictureName;
    const nextSearchQuery = this.props.pictureName;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending', page: 1, isEndOfListReached: false });

      try {
        const { hits, total, totalHits } = await fetchImages(
          nextSearchQuery,
          1
        );

        if (total === 0) {
          this.setState({
            error: new Error('Sorry, we found no images'),
            status: 'rejected',
          });
          return toast.error('Sorry, we found no images');
        }

        const isEndOfListReached = totalHits / 12 <= 1;

        this.setState({
          gallery: hits,
          status: 'resolved',
          page: 2,
          isEndOfListReached,
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  loadMoreHandler = async () => {
    const { pictureName } = this.props;
    const { page } = this.state;

    try {
      const { hits, totalHits } = await fetchImages(pictureName, page);

      if (hits.length === 0) {
        this.setState({ isEndOfListReached: true });
        return;
      }

      const isEndOfListReached = totalHits / 12 <= page;

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...hits],
        page: prevState.page + 1,
        isEndOfListReached,
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    const { gallery, status, isEndOfListReached } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
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
          {!isEndOfListReached && (
            <Button onClick={this.loadMoreHandler}>Load more</Button>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  pictureName: PropTypes.string.isRequired,
};

export default ImageGallery;
