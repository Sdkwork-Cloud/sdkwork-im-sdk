package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type AgentApi struct {
    client *sdkhttp.Client
}

func NewAgentApi(client *sdkhttp.Client) *AgentApi {
    return &AgentApi{client: client}
}

// Create a new agent
func (a *AgentApi) ControllerCreate(body sdktypes.CreateAgent) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/agents"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get all agents for current user
func (a *AgentApi) GetControllerGet(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/agents"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get agent by ID
func (a *AgentApi) GetControllerGetAgents(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Update agent
func (a *AgentApi) ControllerUpdate(id string, body sdktypes.UpdateAgent) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/agents/%s", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Delete agent
func (a *AgentApi) ControllerDelete(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/agents/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Create a new chat session
func (a *AgentApi) ControllerCreateSession(id string, body sdktypes.CreateSession) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/sessions", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get sessions for agent
func (a *AgentApi) ControllerGetSessions(id string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/sessions", id)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get session by ID
func (a *AgentApi) ControllerGetSession(sessionId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/sessions/%s", sessionId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Delete session
func (a *AgentApi) ControllerDeleteSession(sessionId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/agents/sessions/%s", sessionId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get messages for session
func (a *AgentApi) ControllerGetMessages(sessionId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/sessions/%s/messages", sessionId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Send a message to agent
func (a *AgentApi) ControllerSendMessage(sessionId string, body sdktypes.SendAgentMessage) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/sessions/%s/messages", sessionId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Stream message from agent
func (a *AgentApi) ControllerStreamMessage(sessionId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/sessions/%s/stream", sessionId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get tools for agent
func (a *AgentApi) ControllerGetTools(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/tools", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Add tool to agent
func (a *AgentApi) ControllerAddToolTo(id string, body sdktypes.AddTool) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/tools", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get skills for agent
func (a *AgentApi) ControllerGetSkills(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/skills", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Add skill to agent
func (a *AgentApi) ControllerAddSkillTo(id string, body sdktypes.AddSkill) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/skills", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get all available tools
func (a *AgentApi) ControllerGetAvailableTools() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/agents/tools/available"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get all available skills
func (a *AgentApi) ControllerGetAvailableSkills() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/agents/skills/available"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Start agent runtime
func (a *AgentApi) ControllerStart(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/start", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Stop agent runtime
func (a *AgentApi) ControllerStop(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/stop", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Reset agent
func (a *AgentApi) ControllerReset(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/reset", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
