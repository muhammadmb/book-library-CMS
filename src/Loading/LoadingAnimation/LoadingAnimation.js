import React from 'react';
import './LoadingAnimationStyle.css';

const LoadingAnimation = () => {

    return (
        <div className="loader">
            <div className='balls-container'>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
            </div>
        </div>
    )
}

export default LoadingAnimation