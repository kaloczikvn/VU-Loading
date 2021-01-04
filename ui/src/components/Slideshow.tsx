import React from 'react';
import { Fade } from 'react-slideshow-image';

interface Props {
    map: string|null;
}

const Slideshow: React.FC<Props> = ({ map }) => {
    const host = "https://cdn.jsdelivr.net/gh/kaloczikvn/VU-Loading-Images@master/";
    return (
        <>
            {map &&
                <Fade arrows={false} pauseOnHover={false} canSwipe={false} autoplay={true}>
                    <div className="slideItem">
                        <img 
                            src={host + map + "/01.jpg"} 
                            alt="slideItem0" 
                            onError={(e: any) => {e.target.onerror = null; e.target.src = "images/default.jpg"}} 
                        />
                    </div>
                    <div className="slideItem">
                        <img 
                            src={host + map + "/02.jpg"} 
                            alt="slideItem1" 
                            onError={(e: any) => {e.target.onerror = null; e.target.src = "images/default.jpg"}} 
                        />
                    </div>
                    <div className="slideItem">
                        <img 
                            src={host + map + "/03.jpg"} 
                            alt="slideItem2" 
                            onError={(e: any) => {e.target.onerror = null; e.target.src = "images/default.jpg"}} 
                        />
                    </div>
                    <div className="slideItem">
                        <img 
                            src={host + map + "/04.jpg"} 
                            alt="slideItem3" 
                            onError={(e: any) => {e.target.onerror = null; e.target.src = "images/default.jpg"}} 
                        />
                    </div>
                </Fade>
            }
        </>
    )
};

export default Slideshow;
