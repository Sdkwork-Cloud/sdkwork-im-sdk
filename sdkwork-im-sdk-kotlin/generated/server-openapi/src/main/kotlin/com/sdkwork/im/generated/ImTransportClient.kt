package com.sdkwork.im.generated

import com.sdkwork.common.core.SdkConfig
import com.sdkwork.im.generated.http.HttpClient
import com.sdkwork.im.generated.api.AuthApi
import com.sdkwork.im.generated.api.PortalApi
import com.sdkwork.im.generated.api.SessionApi
import com.sdkwork.im.generated.api.PresenceApi
import com.sdkwork.im.generated.api.RealtimeApi
import com.sdkwork.im.generated.api.DeviceApi
import com.sdkwork.im.generated.api.InboxApi
import com.sdkwork.im.generated.api.ConversationApi
import com.sdkwork.im.generated.api.MessageApi
import com.sdkwork.im.generated.api.MediaApi
import com.sdkwork.im.generated.api.StreamApi
import com.sdkwork.im.generated.api.RtcApi

class ImTransportClient {
    private val httpClient: HttpClient

    lateinit var auth: AuthApi
    lateinit var portal: PortalApi
    lateinit var session: SessionApi
    lateinit var presence: PresenceApi
    lateinit var realtime: RealtimeApi
    lateinit var device: DeviceApi
    lateinit var inbox: InboxApi
    lateinit var conversation: ConversationApi
    lateinit var message: MessageApi
    lateinit var media: MediaApi
    lateinit var stream: StreamApi
    lateinit var rtc: RtcApi

    constructor(baseUrl: String) {
        this.httpClient = HttpClient(baseUrl)
        auth = AuthApi(httpClient)
        portal = PortalApi(httpClient)
        session = SessionApi(httpClient)
        presence = PresenceApi(httpClient)
        realtime = RealtimeApi(httpClient)
        device = DeviceApi(httpClient)
        inbox = InboxApi(httpClient)
        conversation = ConversationApi(httpClient)
        message = MessageApi(httpClient)
        media = MediaApi(httpClient)
        stream = StreamApi(httpClient)
        rtc = RtcApi(httpClient)
    }

    constructor(config: SdkConfig) {
        this.httpClient = HttpClient(config)
        auth = AuthApi(httpClient)
        portal = PortalApi(httpClient)
        session = SessionApi(httpClient)
        presence = PresenceApi(httpClient)
        realtime = RealtimeApi(httpClient)
        device = DeviceApi(httpClient)
        inbox = InboxApi(httpClient)
        conversation = ConversationApi(httpClient)
        message = MessageApi(httpClient)
        media = MediaApi(httpClient)
        stream = StreamApi(httpClient)
        rtc = RtcApi(httpClient)
    }

    fun setAuthToken(token: String): ImTransportClient {
        httpClient.setAuthToken(token)
        return this
    }

    fun setHeader(key: String, value: String): ImTransportClient {
        httpClient.setHeader(key, value)
        return this
    }
}
