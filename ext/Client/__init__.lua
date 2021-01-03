class "VuLoadingClient"

function VuLoadingClient:__init()
    -- Extension events
    self.m_ExtensionLoadedEvent = nil
    self.m_ExtensionUnloadedEvent = nil

    -- These are the specific events that are required to kick everything else off
    self.m_ExtensionLoadedEvent = Events:Subscribe("Extension:Loaded", self, self.OnExtensionLoaded)
    self.m_ExtensionUnloadedEvent = Events:Subscribe("Extension:Unloaded", self, self.OnExtensionUnloaded)

    self.m_MapName = nil
    self.m_GameMode = nil
    self.m_ServerName = nil
    self.m_ServerDesc = nil

    self.m_Loading = false
    self.m_LoadUpdateDeltaTime = 0.0
end

-- ==========
-- Extensions
-- ==========

function VuLoadingClient:OnExtensionLoaded()
    -- Register all of the events
    self:RegisterEvents()

    -- Initialize the WebUI
    WebUI:Init()

    -- Show the WebUI
    WebUI:Show()
end

function VuLoadingClient:OnExtensionUnloaded()
    self:UnregisterEvents()
end

-- ==========
-- Events
-- ==========
function VuLoadingClient:RegisterEvents()
    self.m_LevelLoadedEvent = Events:Subscribe('Level:Loaded', self, self.OnLevelLoaded)
    self.m_LevelDestroyEvent = Events:Subscribe('Level:Destroy', self, self.OnLevelDestroy)
    self.m_EngineUpdateEvent = Events:Subscribe('Engine:Update', self, self.OnEngineUpdate)

    NetEvents:Subscribe('VuLoadingInfo', self, self.OnVuLoadingInfo)
end

function VuLoadingClient:UnregisterEvents()

end

function VuLoadingClient:OnLevelDestroy()
	self.m_Loading = true
end

function VuLoadingClient:OnLevelLoaded()
    self.m_Loading = false
    WebUI:ExecuteJS("HideLoading();")
end

function VuLoadingClient:OnVuLoadingInfo(p_Args)
    if p_Args[1] ~= nil then
        self.m_MapName = p_Args[1]
    end

    if p_Args[2] ~= nil then
        self.m_GameMode = p_Args[2]
    end

    if p_Args[3] ~= nil then
        self.m_ServerName = p_Args[3]
    end

    if p_Args[4] ~= nil then
        self.m_ServerDesc = p_Args[4]
    end
end

function VuLoadingClient:OnEngineUpdate(p_DeltaTime)
    if self.m_Loading and
    self.m_LoadUpdateDeltaTime == 0.0 and
    self.m_MapName ~= nil and
    self.m_GameMode ~= nil and
    self.m_ServerName ~= nil then
        local s_Data = {
            m_MapName = tostring(self.m_MapName),
            m_GameMode = tostring(self.m_GameMode),
            m_ServerName = tostring(self.m_ServerName),
            m_ServerDesc = tostring(self.m_ServerDesc)
        }
        local s_DataJson = json.encode(s_Data)
        WebUI:ExecuteJS('SetInfo('.. s_DataJson ..');')
    end

    self.m_LoadUpdateDeltaTime = self.m_LoadUpdateDeltaTime + p_DeltaTime

    if self.m_LoadUpdateDeltaTime >= 1.5 then
        self.m_LoadUpdateDeltaTime = 0.0
    end
end

return VuLoadingClient()
