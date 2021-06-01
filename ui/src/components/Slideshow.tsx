import React from 'react';
import { Fade } from 'react-slideshow-image';

interface Props {
    map: string|null;
    customMapName: string|null;
    customMapImages: any;
}

const Slideshow: React.FC<Props> = ({
    map,
    customMapName,
    customMapImages,
}) => {
    const host = "https://cdn.jsdelivr.net/gh/kaloczikvn/VU-Loading-Images@master/";
    let list = ["01", "02", "03", "04"];

    return (
        <>
            {map &&
                <Fade arrows={false} pauseOnHover={false} canSwipe={false} autoplay={true} defaultIndex={(Math.floor(Math.random() * 3))}>
                    {(customMapImages !== null && (customMapImages[map] !== undefined || customMapImages[customMapName!] !== undefined)) ?
                        (customMapName !== null ?
                            customMapImages[customMapName].sort(() => Math.random() - 0.5).map((pic: string, index: number) => (
                                <div className="slideItem" key={index}>
                                    <img 
                                        src={pic} 
                                        alt="slideItem0" 
                                        onError={(e: any) => {e.target.onerror = null; e.target.src = "images/default.jpg"}} 
                                        onLoad={(e: any) => {e.target.style = {opacity: 1}}} 
                                        style={{opacity: 0}} 
                                    />
                                </div>
                            ))
                        :
                            customMapImages[map].sort(() => Math.random() - 0.5).map((pic: string, index: number) => (
                                <div className="slideItem" key={index}>
                                    <img 
                                        src={pic} 
                                        alt="slideItem0" 
                                        onError={(e: any) => {e.target.onerror = null; e.target.src = "images/default.jpg"}} 
                                        onLoad={(e: any) => {e.target.style = {opacity: 1}}} 
                                        style={{opacity: 0}} 
                                    />
                                </div>
                            ))
                        )
                    :
                        list.sort(() => Math.random() - 0.5).map((pic: string, index: number) => (
                            <div className="slideItem" key={index}>
                                <img 
                                    src={host + map + "/" + pic + ".jpg"} 
                                    alt="slideItem0" 
                                    onError={(e: any) => {e.target.onerror = null; e.target.src = "images/default.jpg"}} 
                                    onLoad={(e: any) => {e.target.style = {opacity: 1}}} 
                                    style={{opacity: 0}} 
                                />
                            </div>
                        ))
                    }
                </Fade>
            }
        </>
    )
};

export default Slideshow;
