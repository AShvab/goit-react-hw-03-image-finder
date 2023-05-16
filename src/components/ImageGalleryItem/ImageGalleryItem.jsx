import PropTypes from 'prop-types';
import { Component } from "react";
import Modal from '../Modal';

export class ImageGalleryItem extends Component {
    state = {
        isShowModal: false,
    };

    toggleModal = () => {
        this.setState(({isShowModal}) => ({
            isShowModal: !isShowModal
        }));
    }
    
    render() {
        const { url, alt, largeImage } = this.props
        return (
            <>
            <li onClick={this.toggleModal}>
                <img
                    src={url}
                    alt={alt}
                    loading="lazy" />
                </li>
                {this.state.isShowModal &&
                    <Modal onClose={this.toggleModal}>
                        <img alt={alt} src={largeImage}/>
                    </Modal>
                }
            </>
        )
    }
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
}

export default ImageGalleryItem;