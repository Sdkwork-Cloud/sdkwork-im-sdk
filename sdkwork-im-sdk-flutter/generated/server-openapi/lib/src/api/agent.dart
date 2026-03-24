import '../http/client.dart';
import '../models.dart';
import 'paths.dart';

class AgentApi {
  final HttpClient _client;
  
  AgentApi(this._client);

  /// Create a new agent
  Future<dynamic> controllerCreate(CreateAgent body) async {
    return await _client.post(ApiPaths.backendPath('/agents'), body: body, contentType: 'application/json');
  }

  /// Get all agents for current user
  Future<dynamic> getControllerGet(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents'), params: params);
  }

  /// Get agent by ID
  Future<dynamic> getControllerGetAgents(String id) async {
    return await _client.get(ApiPaths.backendPath('/agents/${id}'));
  }

  /// Update agent
  Future<dynamic> controllerUpdate(String id, UpdateAgent body) async {
    return await _client.put(ApiPaths.backendPath('/agents/${id}'), body: body, contentType: 'application/json');
  }

  /// Delete agent
  Future<dynamic> controllerDelete(String id) async {
    return await _client.delete(ApiPaths.backendPath('/agents/${id}'));
  }

  /// Create a new chat session
  Future<dynamic> controllerCreateSession(String id, CreateSession body) async {
    return await _client.post(ApiPaths.backendPath('/agents/${id}/sessions'), body: body, contentType: 'application/json');
  }

  /// Get sessions for agent
  Future<dynamic> controllerGetSessions(String id, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents/${id}/sessions'), params: params);
  }

  /// Get session by ID
  Future<dynamic> controllerGetSession(String sessionId) async {
    return await _client.get(ApiPaths.backendPath('/agents/sessions/${sessionId}'));
  }

  /// Delete session
  Future<dynamic> controllerDeleteSession(String sessionId) async {
    return await _client.delete(ApiPaths.backendPath('/agents/sessions/${sessionId}'));
  }

  /// Get messages for session
  Future<dynamic> controllerGetMessages(String sessionId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents/sessions/${sessionId}/messages'), params: params);
  }

  /// Send a message to agent
  Future<dynamic> controllerSendMessage(String sessionId, SendAgentMessage body) async {
    return await _client.post(ApiPaths.backendPath('/agents/sessions/${sessionId}/messages'), body: body, contentType: 'application/json');
  }

  /// Stream message from agent
  Future<dynamic> controllerStreamMessage(String sessionId) async {
    return await _client.get(ApiPaths.backendPath('/agents/sessions/${sessionId}/stream'));
  }

  /// Get tools for agent
  Future<dynamic> controllerGetTools(String id) async {
    return await _client.get(ApiPaths.backendPath('/agents/${id}/tools'));
  }

  /// Add tool to agent
  Future<dynamic> controllerAddToolTo(String id, AddTool body) async {
    return await _client.post(ApiPaths.backendPath('/agents/${id}/tools'), body: body, contentType: 'application/json');
  }

  /// Get skills for agent
  Future<dynamic> controllerGetSkills(String id) async {
    return await _client.get(ApiPaths.backendPath('/agents/${id}/skills'));
  }

  /// Add skill to agent
  Future<dynamic> controllerAddSkillTo(String id, AddSkill body) async {
    return await _client.post(ApiPaths.backendPath('/agents/${id}/skills'), body: body, contentType: 'application/json');
  }

  /// Get all available tools
  Future<dynamic> controllerGetAvailableTools() async {
    return await _client.get(ApiPaths.backendPath('/agents/tools/available'));
  }

  /// Get all available skills
  Future<dynamic> controllerGetAvailableSkills() async {
    return await _client.get(ApiPaths.backendPath('/agents/skills/available'));
  }

  /// Start agent runtime
  Future<dynamic> controllerStart(String id) async {
    return await _client.post(ApiPaths.backendPath('/agents/${id}/start'));
  }

  /// Stop agent runtime
  Future<dynamic> controllerStop(String id) async {
    return await _client.post(ApiPaths.backendPath('/agents/${id}/stop'));
  }

  /// Reset agent
  Future<dynamic> controllerReset(String id) async {
    return await _client.post(ApiPaths.backendPath('/agents/${id}/reset'));
  }
}
