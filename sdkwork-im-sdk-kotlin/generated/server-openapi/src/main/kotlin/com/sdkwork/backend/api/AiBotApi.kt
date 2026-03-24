package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class AiBotApi(private val client: HttpClient) {

    /** Create a new AI Bot */
    suspend fun aibotControllerCreateBot(body: AibotControllerCreateBotRequest): Unit {
        client.post(ApiPaths.backendPath("/ai-bots"), body)
    }

    /** Get all AI Bots */
    suspend fun aibotControllerGetBots(): Unit {
        client.get(ApiPaths.backendPath("/ai-bots"))
    }

    /** Get an AI Bot by ID */
    suspend fun aibotControllerGetBot(id: String): Unit {
        client.get(ApiPaths.backendPath("/ai-bots/$id"))
    }

    /** Update an AI Bot */
    suspend fun aibotControllerUpdateBot(id: String, body: AibotControllerUpdateBotRequest): Unit {
        client.put(ApiPaths.backendPath("/ai-bots/$id"), body)
    }

    /** Delete an AI Bot */
    suspend fun aibotControllerDeleteBot(id: String): Unit {
        client.delete(ApiPaths.backendPath("/ai-bots/$id"))
    }

    /** Activate an AI Bot */
    suspend fun aibotControllerActivateBot(id: String): Unit {
        client.post(ApiPaths.backendPath("/ai-bots/$id/activate"), null)
    }

    /** Deactivate an AI Bot */
    suspend fun aibotControllerDeactivateBot(id: String): Unit {
        client.post(ApiPaths.backendPath("/ai-bots/$id/deactivate"), null)
    }

    /** Process a message with AI Bot */
    suspend fun aibotControllerProcessMessage(id: String, body: AibotControllerProcessMessageRequest): Unit {
        client.post(ApiPaths.backendPath("/ai-bots/$id/messages"), body)
    }
}
