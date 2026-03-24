package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class ThirdPartyApi(private val client: HttpClient) {

    /** 发送第三方平台消息 */
    suspend fun controllerSendMessage(platform: String, body: String): ThirdPartyMessage? {
        return client.post(ApiPaths.backendPath("/third-party/$platform/messages"), body) as? ThirdPartyMessage
    }

    /** 获取第三方平台消息状态 */
    suspend fun controllerGetMessageStatus(platform: String, id: String): Unit {
        client.get(ApiPaths.backendPath("/third-party/$platform/messages/$id/status"))
    }

    /** 同步第三方平台联系人 */
    suspend fun controllerSyncContacts(platform: String): Unit {
        client.post(ApiPaths.backendPath("/third-party/$platform/contacts/sync"), null)
    }

    /** 获取第三方平台联系人 */
    suspend fun controllerGetContact(platform: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/third-party/$platform/contacts"), params)
    }
}
