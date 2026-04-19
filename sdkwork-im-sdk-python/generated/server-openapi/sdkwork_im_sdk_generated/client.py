from .http_client import HttpClient, SdkConfig
from .api.auth import AuthApi
from .api.portal import PortalApi
from .api.session import SessionApi
from .api.presence import PresenceApi
from .api.realtime import RealtimeApi
from .api.device import DeviceApi
from .api.inbox import InboxApi
from .api.conversation import ConversationApi
from .api.message import MessageApi
from .api.media import MediaApi
from .api.stream import StreamApi
from .api.rtc import RtcApi


class ImTransportClient:
    """Generated transport client for the Craw Chat app API."""

    def __init__(self, config: SdkConfig):
        self._client = HttpClient(config)
        self.auth: AuthApi
        self.portal: PortalApi
        self.session: SessionApi
        self.presence: PresenceApi
        self.realtime: RealtimeApi
        self.device: DeviceApi
        self.inbox: InboxApi
        self.conversation: ConversationApi
        self.message: MessageApi
        self.media: MediaApi
        self.stream: StreamApi
        self.rtc: RtcApi

        self.auth = AuthApi(self._client)
        self.portal = PortalApi(self._client)
        self.session = SessionApi(self._client)
        self.presence = PresenceApi(self._client)
        self.realtime = RealtimeApi(self._client)
        self.device = DeviceApi(self._client)
        self.inbox = InboxApi(self._client)
        self.conversation = ConversationApi(self._client)
        self.message = MessageApi(self._client)
        self.media = MediaApi(self._client)
        self.stream = StreamApi(self._client)
        self.rtc = RtcApi(self._client)

    def set_auth_token(self, token: str) -> 'ImTransportClient':
        self._client.set_auth_token(token)
        return self

    def set_header(self, key: str, value: str) -> 'ImTransportClient':
        self._client.set_header(key, value)
        return self

    @property
    def http(self) -> HttpClient:
        return self._client


def create_transport_client(config: SdkConfig) -> ImTransportClient:
    return ImTransportClient(config)
