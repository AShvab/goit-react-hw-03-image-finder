import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick }) => { 
    return (
        <button type="button" onClick={onClick} aria-label="Load more">
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
};

export default Button;