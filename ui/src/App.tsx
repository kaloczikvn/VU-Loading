import React, { useState } from "react";

import Slideshow from "./components/Slideshow";

import Gamemodes from "./helpers/Gamemodes";
import Maps from "./helpers/Maps";

import { Oval } from 'svg-loaders-react';

import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import 'react-slideshow-image/dist/styles.css';
import './App.scss';

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

    const [mapName, setMapName] = useState<string|null>(null);
    const [customMapName, setCustomMapName] = useState<string|null>(null);
    const [gameMode, setGameMode] = useState<string|null>(null);
    const [serverName, setServerName] = useState<string|null>(null);
    const [customGameMode, setCustomGameMode] = useState<string|null>(null);
    const [serverDesc, setServerDesc] = useState<string|null>(null);
    const [serverRules, setServerRules] = useState<string[]|null>(null);
    const [customMapImages, setCustomMapImages] = useState<any>(null);
    const [tickRate, setTickRate] = useState<number|null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    window.SetInfo = (p_DataJson: any) => {
        setMapName(p_DataJson.m_MapName);
        setGameMode(p_DataJson.m_GameMode);
        setServerName(p_DataJson.m_ServerName);
        setServerDesc(p_DataJson.m_ServerDesc);

        if (p_DataJson.m_MapCustom !== "nil") {
            setCustomMapName(p_DataJson.m_MapCustom);
        }
        
        if (p_DataJson.m_GameModeCustom !== "nil") {
            setCustomGameMode(p_DataJson.m_GameModeCustom);
        }
        
        if (p_DataJson.m_Rules !== undefined && p_DataJson.m_Rules !== "nil") {
            setServerRules(p_DataJson.m_Rules);
        }

        if (p_DataJson.m_Maps !== undefined && p_DataJson.m_Maps !== "nil" && Object.values(p_DataJson.m_Maps).length > 0) {
            setCustomMapImages(p_DataJson.m_Maps);
        }

        setTickRate(p_DataJson.m_TickRate)

        setLoading(true);
    }

    window.HideLoading = () => {
        setMapName(null);
        setCustomMapName(null)
        setGameMode(null);
        setCustomGameMode(null)
        setServerName(null);
        setServerDesc(null);
        setServerRules(null);
        setCustomMapImages(null);
        setTickRate(null);
        setLoading(false);
    }

    const SetRandomInfo = () => {
        var keys = Object.keys(Gamemodes);
        setGameMode(keys[ keys.length * Math.random() << 0]);

        keys = Object.keys(Maps);
        setMapName(keys[ keys.length * Math.random() << 0]);

        setServerName("KVN's Debug Server");
        setServerDesc("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum eget lectus vitae imperdiet. Cras ultricies justo nibh, nec scelerisque nisl molestie sit amet.");

        setServerRules([
            "Rule number 1",
            "Rule number 2",
            "Rule number 3",
            "Rule number 4",
            "Rule number 5",
        ]);

        //setCustomMapName("KVN's test map")

        setCustomMapImages({
            "MP_001": [
                "https://images.unsplash.com/photo-1622032494057-3bdc6f355e4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1621570274614-441323d10052?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
                "https://images.unsplash.com/photo-1622019448666-284a54cc7ed0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1622020619472-1ce723164183?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            ],
            "KVN's test map": [
                "https://images.unsplash.com/photo-1622032494057-3bdc6f355e4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1621570274614-441323d10052?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
                "https://images.unsplash.com/photo-1622019448666-284a54cc7ed0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1622020619472-1ce723164183?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            ]
        });

        setTickRate(120);

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
                    <Slideshow 
                        map={mapName}
                        customMapName={customMapName}
                        customMapImages={customMapImages}
                    />
                    <div className="title">
                        <h2>
                            {customGameMode !== null 
                            ?
                                <>
                                    {customGameMode}
                                </>
                            :
                                <>
                                    {gameMode &&
                                        Gamemodes[gameMode]
                                    }
                                </>
                            }
                        </h2>
                        <h1>
                            {customMapName !== null 
                            ?
                                <>
                                    {customMapName}
                                </>
                            :
                                <>
                                    {mapName &&
                                        Maps[mapName]
                                    }
                                </>
                            }
                        </h1>
                        <div className="serverInfo">
                            <h3>
                                {serverName??''}
                                <div className="tickRate">
                                    <i className="las la-tachometer-alt"></i> {tickRate??'30'}Hz
                                </div>
                            </h3>
                            {serverDesc &&
                                <p>{serverDesc??''}</p>
                            }
                        </div>
                        {(serverRules !== null && serverRules.length > 0) &&
                            <div className="serverInfo">
                                <ul>
                                    {serverRules.map((val: string, index: number) => (
                                        <li key={index}>{val??''}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="loader">
                        <Oval width="3vw" height="3vw" />
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
