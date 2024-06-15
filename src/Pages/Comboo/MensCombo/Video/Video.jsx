import React from 'react';
import myvideo from '../Video/Assets/v1.mp4';
import './Video.css';

const Video = () => {
    return (
        <div className='video111 smallscrennMencombo'>
            <video className='video222' autoPlay loop muted>
                <source src={myvideo} type="video/mp4"  style={{borderRadius:"10px"}}/>
            </video>
        </div>
    );
};

export default Video;
