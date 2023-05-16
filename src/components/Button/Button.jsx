import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';

export const Button = ({ children, onClick }) => { 
    return (
        <ButtonLoad type="button" onClick={onClick} aria-label="Load more">
            {children}
        </ButtonLoad>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
};

export default Button;