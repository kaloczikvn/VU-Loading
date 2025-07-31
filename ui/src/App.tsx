import React, { useMemo, useState } from 'react';
import Slideshow from './components/Slideshow';
import { DefaultGameModes, handleGetGameModeName } from './helpers/DefaultGameModes';
import { DefaultMaps, handleGetMapName } from './helpers/DefaultMaps';

import 'react-slideshow-image/dist/styles.css';
import './App.scss';

/*
 * Debug
 */
let debugMode: boolean = false;
/*
if (!navigator.userAgent.includes('VeniceUnleashed')) {
    if (window.location.ancestorOrigins === undefined || window.location.ancestorOrigins[0] !== 'webui://main') {
        debugMode = true;
    }
}
*/

const App: React.FC = () => {
    const [mapName, setMapName] = useState<string | null>(null);
    const [customMapName, setCustomMapName] = useState<string | null>(null);
    const [gameMode, setGameMode] = useState<string | null>(null);
    const [serverName, setServerName] = useState<string | null>(null);
    const [customGameMode, setCustomGameMode] = useState<string | null>(null);
    const [serverDesc, setServerDesc] = useState<string | null>(null);
    const [serverRules, setServerRules] = useState<string[] | null>(null);
    const [customMapImages, setCustomMapImages] = useState<any>(null);
    const [tickRate, setTickRate] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    window.SetInfo = (p_DataJson: any) => {
        // console.log(p_DataJson);

        setMapName(p_DataJson.m_MapName);
        setGameMode(p_DataJson.m_GameMode);
        setServerName(p_DataJson.m_ServerName);
        setServerDesc(p_DataJson.m_ServerDesc);

        if (p_DataJson.m_MapCustom !== 'nil') {
            setCustomMapName(p_DataJson.m_MapCustom);
        }

        if (p_DataJson.m_GameModeCustom !== 'nil') {
            setCustomGameMode(p_DataJson.m_GameModeCustom);
        }

        if (p_DataJson.m_Rules !== undefined && p_DataJson.m_Rules !== 'nil') {
            setServerRules(p_DataJson.m_Rules);
        }

        if (
            p_DataJson.m_Maps !== undefined &&
            p_DataJson.m_Maps !== 'nil' &&
            Object.values(p_DataJson.m_Maps).length > 0
        ) {
            setCustomMapImages(p_DataJson.m_Maps);
        }

        setTickRate(p_DataJson.m_TickRate);

        setLoading(true);
    };

    window.HideLoading = () => {
        // console.log('HideLoading');

        setMapName(null);
        setCustomMapName(null);
        setGameMode(null);
        setCustomGameMode(null);
        setServerName(null);
        setServerDesc(null);
        setServerRules(null);
        setCustomMapImages(null);
        setTickRate(null);
        setLoading(false);
    };

    const SetRandomInfo = () => {
        var keys = Object.keys(DefaultGameModes);
        setGameMode(keys[(keys.length * Math.random()) << 0]);

        keys = Object.keys(DefaultMaps);
        setMapName(keys[(keys.length * Math.random()) << 0]);

        setServerName("KVN's Debug Server");
        setServerDesc(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum eget lectus vitae imperdiet. Cras ultricies justo nibh, nec scelerisque nisl molestie sit amet.'
        );

        setServerRules(['Rule number 1', 'Rule number 2', 'Rule number 3', 'Rule number 4', 'Rule number 5']);

        //setCustomMapName("KVN's test map")

        setCustomMapImages({
            MP_001: [
                'https://images.unsplash.com/photo-1622032494057-3bdc6f355e4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                'https://images.unsplash.com/photo-1621570274614-441323d10052?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
                'https://images.unsplash.com/photo-1622019448666-284a54cc7ed0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                'https://images.unsplash.com/photo-1622020619472-1ce723164183?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            ],
            "KVN's test map": [
                'https://images.unsplash.com/photo-1622032494057-3bdc6f355e4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                'https://images.unsplash.com/photo-1621570274614-441323d10052?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
                'https://images.unsplash.com/photo-1622019448666-284a54cc7ed0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                'https://images.unsplash.com/photo-1622020619472-1ce723164183?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            ],
        });
        setTickRate(120);
        setLoading(true);
    };

    const gameModeMemo = useMemo(() => handleGetGameModeName(customGameMode, gameMode), [customGameMode, gameMode]);
    const maoNameMemo = useMemo(() => handleGetMapName(customMapName, mapName), [customGameMode, mapName]);

    return (
        <>
            {debugMode ? (
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    #debug {
                        display: block !important;
                        opacity: 0.1;
                    }
                `,
                    }}
                />
            ) : null}
            <div id="debug">
                <button onClick={() => SetRandomInfo()}>Random</button>
            </div>

            {loading ? (
                <div className="VuLoading">
                    <Slideshow mapName={mapName} customMapName={customMapName} customMapImages={customMapImages} />
                    <div className="title">
                        <h2>{gameModeMemo}</h2>
                        <h1>{maoNameMemo}</h1>
                        <div className="serverInfo">
                            <h3>
                                {serverName ?? ''}
                                <div className="tickRate">{tickRate ?? '30'}Hz</div>
                            </h3>
                            {serverDesc ? <p>{serverDesc ?? ''}</p> : null}
                        </div>
                        {serverRules !== null && serverRules.length > 0 ? (
                            <div className="serverInfo">
                                {serverRules.map((val: string, index: number) => (
                                    <p key={`rule-${index}`}>{val ?? ''}</p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    <div className="loader" />
                </div>
            ) : null}
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
