package com.sdkwork.im.generated;

import com.sdkwork.common.core.Types;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.api.AuthApi;
import com.sdkwork.im.generated.api.PortalApi;
import com.sdkwork.im.generated.api.SessionApi;
import com.sdkwork.im.generated.api.PresenceApi;
import com.sdkwork.im.generated.api.RealtimeApi;
import com.sdkwork.im.generated.api.DeviceApi;
import com.sdkwork.im.generated.api.InboxApi;
import com.sdkwork.im.generated.api.ConversationApi;
import com.sdkwork.im.generated.api.MessageApi;
import com.sdkwork.im.generated.api.MediaApi;
import com.sdkwork.im.generated.api.StreamApi;
import com.sdkwork.im.generated.api.RtcApi;

public class ImTransportClient {
    private final HttpClient httpClient;
    private AuthApi auth;
    private PortalApi portal;
    private SessionApi session;
    private PresenceApi presence;
    private RealtimeApi realtime;
    private DeviceApi device;
    private InboxApi inbox;
    private ConversationApi conversation;
    private MessageApi message;
    private MediaApi media;
    private StreamApi stream;
    private RtcApi rtc;

    public ImTransportClient(String baseUrl) {
        this.httpClient = new HttpClient(baseUrl);
        this.auth = new AuthApi(httpClient);
        this.portal = new PortalApi(httpClient);
        this.session = new SessionApi(httpClient);
        this.presence = new PresenceApi(httpClient);
        this.realtime = new RealtimeApi(httpClient);
        this.device = new DeviceApi(httpClient);
        this.inbox = new InboxApi(httpClient);
        this.conversation = new ConversationApi(httpClient);
        this.message = new MessageApi(httpClient);
        this.media = new MediaApi(httpClient);
        this.stream = new StreamApi(httpClient);
        this.rtc = new RtcApi(httpClient);
    }

    public ImTransportClient(Types.SdkConfig config) {
        this.httpClient = new HttpClient(config);
        this.auth = new AuthApi(httpClient);
        this.portal = new PortalApi(httpClient);
        this.session = new SessionApi(httpClient);
        this.presence = new PresenceApi(httpClient);
        this.realtime = new RealtimeApi(httpClient);
        this.device = new DeviceApi(httpClient);
        this.inbox = new InboxApi(httpClient);
        this.conversation = new ConversationApi(httpClient);
        this.message = new MessageApi(httpClient);
        this.media = new MediaApi(httpClient);
        this.stream = new StreamApi(httpClient);
        this.rtc = new RtcApi(httpClient);
    }

    public AuthApi getAuth() {
        return this.auth;
    }

    public PortalApi getPortal() {
        return this.portal;
    }

    public SessionApi getSession() {
        return this.session;
    }

    public PresenceApi getPresence() {
        return this.presence;
    }

    public RealtimeApi getRealtime() {
        return this.realtime;
    }

    public DeviceApi getDevice() {
        return this.device;
    }

    public InboxApi getInbox() {
        return this.inbox;
    }

    public ConversationApi getConversation() {
        return this.conversation;
    }

    public MessageApi getMessage() {
        return this.message;
    }

    public MediaApi getMedia() {
        return this.media;
    }

    public StreamApi getStream() {
        return this.stream;
    }

    public RtcApi getRtc() {
        return this.rtc;
    }

    public ImTransportClient setAuthToken(String token) {
        httpClient.setAuthToken(token);
        return this;
    }

    public ImTransportClient setHeader(String key, String value) {
        httpClient.setHeader(key, value);
        return this;
    }

    public HttpClient getHttpClient() {
        return httpClient;
    }
}
