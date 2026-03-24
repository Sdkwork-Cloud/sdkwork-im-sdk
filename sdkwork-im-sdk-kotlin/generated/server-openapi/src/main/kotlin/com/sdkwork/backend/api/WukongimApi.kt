package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class WukongimApi(private val client: HttpClient) {

    /** Get WuKongIM connection config */
    suspend fun wukongImappControllerGetConfig(): Unit {
        client.get(ApiPaths.backendPath("/wukongim/config"))
    }

    /** Get WuKongIM user token */
    suspend fun wukongImappControllerGetToken(): Unit {
        client.post(ApiPaths.backendPath("/wukongim/token"), null)
    }
}
