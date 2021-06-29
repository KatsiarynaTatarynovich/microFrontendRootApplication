import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { default as commonImages } from 'rootApplication/commonImages';
import { Image } from './components/image/image';

const ApplicationTwo = () => {
    const imgSrc = commonImages.find(img => img.name === 'Island').image;

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Application two</h2>
            <h3>Date : {new Date().toLocaleTimeString()}</h3>
            <Image src={imgSrc}/>
        </div>
    );
};

const headerLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: ApplicationTwo
});

export const bootstrap = headerLifecycles.bootstrap;
export const mount = headerLifecycles.mount;
export const unmount = headerLifecycles.unmount;
