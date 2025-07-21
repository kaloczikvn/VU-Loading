export interface IMap {
    [key: string]: string;
}

export const DefaultMaps: IMap = {
    MP_001: 'Grand Bazaar',
    MP_003: 'Teheran Highway',
    MP_007: 'Caspian Border',
    MP_011: 'Seine Crossing',
    MP_012: 'Operation Firestorm',
    MP_013: 'Damavand Peak',
    MP_017: 'Noshahr Canals',
    MP_018: 'Kharg Island',
    MP_Subway: 'Operation Métro',
    XP1_001: 'Strike at Karkand',
    XP1_002: 'Gulf of Oman',
    XP1_003: 'Sharqi Peninsula',
    XP1_004: 'Wake Island',
    XP2_Palace: 'Donya Fortress',
    XP2_Office: 'Operation 925',
    XP2_Factory: 'Scrapmetal',
    XP2_Skybar: 'Ziba Tower',
    XP3_Alborz: 'Alborz Mountains',
    XP3_Shield: 'Armored Shield',
    XP3_Desert: 'Bandar Desert',
    XP3_Valley: 'Death Valley',
    XP4_Parl: 'Azadi Palace',
    XP4_Quake: 'Epicenter',
    XP4_FD: 'Markaz Monolith',
    XP4_Rubble: 'Talah Market',
    XP5_001: 'Operation Riverside',
    XP5_002: 'Nebandan Flats',
    XP5_003: 'Kiasar Railroad',
    XP5_004: 'Sabalan Pipeline',
    COOP_002: 'Hit and Run',
    COOP_003: "Drop 'Em Like Liquid",
    COOP_006: 'Fire from the Sky',
    COOP_007: 'Operation Exodus',
    COOP_009: 'Exfiltration',
    COOP_010: 'The Eleventh Hour',
    SP_Bank: 'Operation Guillotine',
    SP_Earthquake: 'Operation Swordbreaker',
    SP_Earthquake2: 'Uprising',
    SP_Finale: 'The Great Destroyer',
    SP_Interrogation: 'Intro',
    SP_Jet: 'Going Hunting',
    SP_New_York: 'Semper Fidelis',
    SP_Paris: 'Comrades',
    SP_Sniper: 'Night Shift',
    SP_Tank: 'Thunder Run',
    SP_Tank_b: 'Fear No Evil',
    SP_Valley: 'Rock and a Hard Place',
    SP_Villa: "Kaffarov's Villa",
};

export const handleGetMapName = (customMapName: string | null, mapName: string | null) => {
    if (customMapName !== null) {
        return customMapName;
    }

    if (mapName !== null) {
        const find = DefaultMaps[mapName] ?? null;

        if (find) {
            return find;
        }

        return mapName;
    }

    return 'Unknown';
};
