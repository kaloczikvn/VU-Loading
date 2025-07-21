interface IGameMode {
    [key: string]: string;
}

export const DefaultGameModes: IGameMode = {
    ConquestLarge0: 'Conquest 64',
    ConquestSmall0: 'Conquest',
    ConquestAssaultLarge0: 'Conquest Assault 64',
    ConquestAssaultSmall0: 'Conquest Assault',
    ConquestAssaultSmall1: 'Conquest Assault: Day 2',
    RushLarge0: 'Rush',
    SquadRush0: 'Squad Rush',
    SquadDeathMatch0: 'Squad Deathmatch',
    TeamDeathMatch0: 'Team Deathmatch',
    TeamDeathMatchC0: 'Team DM Close Quarters',
    Domination0: 'Conquest Domination',
    GunMaster0: 'Gun Master',
    TankSuperiority0: 'Tank Superiority',
    Scavenger0: 'Scavenger',
    CaptureTheFlag0: 'Capture the Flag',
    AirSuperiority0: 'Air Superiority',
};

export const handleGetGameModeName = (customGameMode: string | null, gameMode: string | null) => {
    if (customGameMode !== null) {
        return customGameMode;
    }

    if (gameMode !== null) {
        const find = DefaultGameModes[gameMode] ?? null;

        if (find) {
            return find;
        }

        return gameMode
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add a space before capital letters following a lowercase letter
            .replace(/0$/, '') // Remove trailing 0
            .replace(/([1-9]\d*)$/, ' #$1'); // Parse 1 and greater numbers to "#n" format
    }

    return 'Unknown';
};
