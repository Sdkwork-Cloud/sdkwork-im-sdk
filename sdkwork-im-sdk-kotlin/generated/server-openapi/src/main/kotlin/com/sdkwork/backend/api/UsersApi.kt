package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class UsersApi(private val client: HttpClient) {

    /** 获取当前用户信息 */
    suspend fun userControllerGetCurrent(): Unit {
        client.get(ApiPaths.backendPath("/users/me"))
    }

    /** 获取用户详情 */
    suspend fun userControllerGetById(id: String): Unit {
        client.get(ApiPaths.backendPath("/users/$id"))
    }

    /** 更新用户资料 */
    suspend fun userControllerUpdate(id: String, body: UpdateProfileDto): Unit {
        client.put(ApiPaths.backendPath("/users/$id"), body)
    }

    /** 搜索用户 */
    suspend fun userControllerSearch(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/users"), params)
    }
}
