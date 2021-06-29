import React from 'react';

export const Image = (props) => {
    const { src } = props;

    return (
        <img src={src} style={{maxHeight: '300px'}} />
    );
};
