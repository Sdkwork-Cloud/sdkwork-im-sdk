package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class ContactsApi(private val client: HttpClient) {

    /** 创建联系人 */
    suspend fun contactControllerCreate(body: ContactControllerCreateRequest): Contact? {
        return client.post(ApiPaths.backendPath("/contacts"), body) as? Contact
    }

    /** 获取用户的联系人列表 */
    suspend fun contactControllerGetByUserId(params: Map<String, Any>? = null): ContactControllerGetByUserIdResponse? {
        return client.get(ApiPaths.backendPath("/contacts"), params) as? ContactControllerGetByUserIdResponse
    }

    /** 获取联系人详情 */
    suspend fun contactControllerGetById(id: String): Contact? {
        return client.get(ApiPaths.backendPath("/contacts/$id")) as? Contact
    }

    /** 更新联系人 */
    suspend fun contactControllerUpdate(id: String, body: ContactControllerUpdateRequest): Contact? {
        return client.put(ApiPaths.backendPath("/contacts/$id"), body) as? Contact
    }

    /** 删除联系人 */
    suspend fun contactControllerDelete(id: String): Unit {
        client.delete(ApiPaths.backendPath("/contacts/$id"))
    }

    /** 批量删除联系人 */
    suspend fun contactControllerBatchDelete(): Unit {
        client.delete(ApiPaths.backendPath("/contacts/batch"))
    }

    /** 设置/取消收藏 */
    suspend fun contactControllerSetFavorite(id: String, body: ContactControllerSetFavoriteRequest): Unit {
        client.put(ApiPaths.backendPath("/contacts/$id/favorite"), body)
    }

    /** 设置备注 */
    suspend fun contactControllerSetRemark(id: String, body: ContactControllerSetRemarkRequest): Unit {
        client.put(ApiPaths.backendPath("/contacts/$id/remark"), body)
    }

    /** 添加标签 */
    suspend fun contactControllerAddTag(id: String, body: ContactControllerAddTagRequest): Unit {
        client.post(ApiPaths.backendPath("/contacts/$id/tags"), body)
    }

    /** 移除标签 */
    suspend fun contactControllerRemoveTag(id: String, tag: String): Unit {
        client.delete(ApiPaths.backendPath("/contacts/$id/tags/$tag"))
    }

    /** 搜索联系人 */
    suspend fun contactControllerSearch(userId: String, params: Map<String, Any>? = null): ContactControllerSearchResponse? {
        return client.get(ApiPaths.backendPath("/contacts/search/$userId"), params) as? ContactControllerSearchResponse
    }

    /** 获取联系人统计 */
    suspend fun contactControllerGetStats(userId: String): Unit {
        client.get(ApiPaths.backendPath("/contacts/stats/$userId"))
    }
}
