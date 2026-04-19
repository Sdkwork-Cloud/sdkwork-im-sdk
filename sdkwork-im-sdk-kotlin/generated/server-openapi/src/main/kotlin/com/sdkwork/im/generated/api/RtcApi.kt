package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class RtcApi(private val client: HttpClient) {

    /** Create an RTC session */
    suspend fun createRtcSession(body: CreateRtcSessionRequest): RtcSession? {
        val raw = client.post(ApiPaths.apiPath("/rtc/sessions"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RtcSession>() {})
    }

    /** Invite participants into an RTC session */
    suspend fun inviteRtcSession(rtcSessionId: String, body: InviteRtcSessionRequest): RtcSession? {
        val raw = client.post(ApiPaths.apiPath("/rtc/sessions/$rtcSessionId/invite"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RtcSession>() {})
    }

    /** Accept an RTC session */
    suspend fun acceptRtcSession(rtcSessionId: String, body: UpdateRtcSessionRequest): RtcSession? {
        val raw = client.post(ApiPaths.apiPath("/rtc/sessions/$rtcSessionId/accept"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RtcSession>() {})
    }

    /** Reject an RTC session */
    suspend fun rejectRtcSession(rtcSessionId: String, body: UpdateRtcSessionRequest): RtcSession? {
        val raw = client.post(ApiPaths.apiPath("/rtc/sessions/$rtcSessionId/reject"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RtcSession>() {})
    }

    /** End an RTC session */
    suspend fun endRtcSession(rtcSessionId: String, body: UpdateRtcSessionRequest): RtcSession? {
        val raw = client.post(ApiPaths.apiPath("/rtc/sessions/$rtcSessionId/end"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RtcSession>() {})
    }

    /** Post an RTC signaling event */
    suspend fun postRtcSignal(rtcSessionId: String, body: PostRtcSignalRequest): RtcSignalEvent? {
        val raw = client.post(ApiPaths.apiPath("/rtc/sessions/$rtcSessionId/signals"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RtcSignalEvent>() {})
    }

    /** Issue an RTC participant credential */
    suspend fun issueRtcParticipantCredential(rtcSessionId: String, body: IssueRtcParticipantCredentialRequest): RtcParticipantCredential? {
        val raw = client.post(ApiPaths.apiPath("/rtc/sessions/$rtcSessionId/credentials"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RtcParticipantCredential>() {})
    }

    /** Get the RTC recording artifact */
    suspend fun getRtcRecordingArtifact(rtcSessionId: String): RtcRecordingArtifact? {
        val raw = client.get(ApiPaths.apiPath("/rtc/sessions/$rtcSessionId/artifacts/recording"))
        return client.convertValue(raw, object : TypeReference<RtcRecordingArtifact>() {})
    }
}
