class "VuLoadingServer"

function VuLoadingServer:__init()
    -- Extension events
    self.m_ExtensionLoadedEvent = nil
    self.m_ExtensionUnloadedEvent = nil

    -- These are the specific events that are required to kick everything else off
    self.m_ExtensionLoadedEvent = Events:Subscribe("Extension:Loaded", self, self.OnExtensionLoaded)
    self.m_ExtensionUnloadedEvent = Events:Subscribe("Extension:Unloaded", self, self.OnExtensionUnloaded)

    self.m_MapName = nil
    self.m_GameMode = nil
    self.m_ServerName = nil
end

function VuLoadingServer:OnExtensionLoaded()
    -- Register all of the events
    self:RegisterEvents()
end

function VuLoadingServer:OnExtensionUnloaded()
    self:UnregisterEvents()
end

function VuLoadingServer:RegisterEvents()
    self.m_LoadResourcesInfoEvent = Events:Subscribe('Level:LoadResources', self, self.OnLoadResources)
    self.m_PlayerAuthenticatedEvent = Events:Subscribe('Player:Authenticated', self, self.OnPlayerAuthenticated)
end

function VuLoadingServer:OnLoadResources(p_LevelName, p_GameMode)
    local s_Args = RCON:SendCommand('vars.serverName')
    self.m_ServerName = s_Args[2]
    self.m_MapName = self:FixLevelName(p_LevelName)
    self.m_GameMode = p_GameMode

    self:SendLoadingInformation()
end

function VuLoadingServer:OnPlayerAuthenticated(p_Player)
    self:SendLoadingInformation(p_Player)
end

function VuLoadingServer:SendLoadingInformation(p_Player)
    if p_Player ~= nil then
        NetEvents:SendTo('VuLoadingInfo', p_Player, { self.m_MapName, self.m_GameMode, self.m_ServerName })
    else
        NetEvents:Broadcast('VuLoadingInfo', { self.m_MapName, self.m_GameMode, self.m_ServerName })
    end
end

function VuLoadingServer:FixLevelName(p_LevelName)
    if p_LevelName == nil then
        return nil
    end

    local s_LevelName = p_LevelName

    for word in string.gmatch(p_LevelName, '([^/]+)') do
        s_LevelName = word
    end

    return s_LevelName
end

return VuLoadingServer()
