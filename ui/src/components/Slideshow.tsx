import React, { memo, useMemo } from 'react';
import { Fade } from 'react-slideshow-image';

interface IProps {
    mapName: string | null;
    customMapName: string | null;
    customMapImages: any;
}

const HOST = 'https://cdn.jsdelivr.net/gh/kaloczikvn/VU-Loading-Images@master';
const DEFAULT_INDEX = Math.floor(Math.random() * 3);

const Slideshow: React.FC<IProps> = ({ mapName, customMapName, customMapImages }) => {
    const imagesMemo = useMemo(() => {
        if (!mapName) return [];

        if (customMapImages !== null) {
            if (customMapName && customMapImages[customMapName]) {
                return customMapImages[customMapName];
            }

            if (customMapImages[mapName]) {
                return customMapImages[mapName];
            }
        }

        const _tempImages = [];
        for (let i = 1; i <= 4; i++) {
            _tempImages.push(`${HOST}/${mapName}/0${i}.jpg`);
        }

        return _tempImages.sort(() => Math.random() - 0.5);
    }, [mapName, customMapName, customMapImages]);

    if (imagesMemo.length === 0) {
        return null;
    }

    return (
        <Fade arrows={false} pauseOnHover={false} canSwipe={false} autoplay defaultIndex={DEFAULT_INDEX}>
            {imagesMemo.map((imageUrl: string, index: number) => (
                <div className="slideItem" key={`${mapName}-${index}`}>
                    <div className="slideItem-Image" style={{ backgroundImage: `url(${imageUrl})` }} />
                </div>
            ))}
        </Fade>
    );
};

export default memo(Slideshow);
