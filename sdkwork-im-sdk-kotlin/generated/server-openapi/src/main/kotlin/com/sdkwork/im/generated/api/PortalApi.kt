package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class PortalApi(private val client: HttpClient) {

    /** Read the tenant portal home snapshot */
    suspend fun getHome(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/home"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }

    /** Read the tenant portal sign-in snapshot */
    suspend fun getAuth(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/auth"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }

    /** Read the current tenant workspace snapshot */
    suspend fun getWorkspace(): PortalWorkspaceView? {
        val raw = client.get(ApiPaths.apiPath("/portal/workspace"))
        return client.convertValue(raw, object : TypeReference<PortalWorkspaceView>() {})
    }

    /** Read the tenant dashboard snapshot */
    suspend fun getDashboard(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/dashboard"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }

    /** Read the tenant conversations snapshot */
    suspend fun getConversations(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/conversations"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }

    /** Read the tenant realtime snapshot */
    suspend fun getRealtime(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/realtime"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }

    /** Read the tenant media snapshot */
    suspend fun getMedia(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/media"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }

    /** Read the tenant automation snapshot */
    suspend fun getAutomation(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/automation"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }

    /** Read the tenant governance snapshot */
    suspend fun getGovernance(): Map<String, Any>? {
        val raw = client.get(ApiPaths.apiPath("/portal/governance"))
        return client.convertValue(raw, object : TypeReference<Map<String, Any>>() {})
    }
}
