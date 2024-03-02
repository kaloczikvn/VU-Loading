import React from "react";
import { Fade } from "react-slideshow-image";

interface IProps {
  mapName: string | null;
  customMapName: string | null;
  customMapImages: any;
}

const HOST = "https://cdn.jsdelivr.net/gh/kaloczikvn/VU-Loading-Images@master";

const Slideshow: React.FC<IProps> = ({ mapName, customMapName, customMapImages }) => {
  if (!mapName) {
    return <></>;
  }

  const getImages = () => {
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
    return _tempImages;
  };

  const images = getImages();

  return (
    <Fade arrows={false} pauseOnHover={false} canSwipe={false} autoplay={true} defaultIndex={Math.floor(Math.random() * 3)}>
      {images
        .sort(() => Math.random() - 0.5)
        .map((pic: string, index: number) => (
          <div className="slideItem" key={`${mapName}-${index}`}>
            <img
              src={pic}
              alt=""
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "images/default.jpg";
              }}
              onLoad={(e: any) => {
                e.target.style = { opacity: 1 };
              }}
              style={{ opacity: 0 }}
            />
          </div>
        ))}
    </Fade>
  );
};

export default Slideshow;
