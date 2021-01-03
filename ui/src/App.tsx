import React, { useState } from "react";

import Slideshow from "./components/Slideshow";
import { Oval } from 'svg-loaders-react';

import 'react-slideshow-image/dist/styles.css'
import './App.scss';
import Gamemodes from "./helpers/Gamemodes";
import Maps from "./helpers/Maps";

const App: React.FC = () => {
    /*
    * Debug
    */
   let debugMode: boolean = false;
   if (!navigator.userAgent.includes('VeniceUnleashed')) {
       if (window.location.ancestorOrigins === undefined || window.location.ancestorOrigins[0] !== 'webui://main') {
           debugMode = true;
       }
   }

    const [loading, setLoading] = useState<boolean>(false);
    window.SetInfo = (p_DataJson: any) => {
        console.log(p_DataJson);
        setMapName(p_DataJson.m_MapName);
        setGameMode(p_DataJson.m_GameMode);
        setServerName(p_DataJson.m_ServerName);
        setServerDesc(p_DataJson.m_ServerDesc);
        setLoading(true);
    }

    const [mapName, setMapName] = useState<string|null>(null);
    const [gameMode, setGameMode] = useState<string|null>(null);
    const [serverName, setServerName] = useState<string|null>(null);
    const [serverDesc, setServerDesc] = useState<string|null>(null);

    window.HideLoading = () => {
        setMapName(null);
        setGameMode(null);
        setServerName(null);
        setServerDesc(null);
        setLoading(false);
    }

    const SetRandomInfo = () => {
        var keys = Object.keys(Gamemodes);
        setGameMode(keys[ keys.length * Math.random() << 0]);

        keys = Object.keys(Maps);
        setMapName(keys[ keys.length * Math.random() << 0]);

        setServerName("KVN's Debug Server");
        setServerDesc("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum eget lectus vitae imperdiet. Cras ultricies justo nibh, nec scelerisque nisl molestie sit amet.");

        setLoading(true);
    }

    return (
        <>
            {debugMode &&
                <style dangerouslySetInnerHTML={{__html: `
                    #debug {
                        display: block !important;
                        opacity: 0.1;
                    }
                `}} />
            }
            <div id="debug">
                <button onClick={() => SetRandomInfo()}>Random</button>
            </div>

            {loading &&
                <div className="VuLoading">
                    <Slideshow map={mapName} />
                    <div className="title">
                        <h2>
                            {gameMode &&
                                Gamemodes[gameMode]
                            }
                        </h2>
                        <h1>
                            {mapName &&
                                Maps[mapName]
                            }
                        </h1>
                        <div className="serverInfo">
                            <h3>{serverName??''}</h3>
                            {serverDesc &&
                                <p>{serverDesc??''}</p>
                            }
                        </div>
                    </div>
                    <div className="loader">
                        <Oval />
                    </div>
                </div>
            }
        </>
    );
};

export default App;

declare global {
    interface Window {
        SetInfo: (p_DataJson: any) => void;
        HideLoading: () => void;
    }
}
