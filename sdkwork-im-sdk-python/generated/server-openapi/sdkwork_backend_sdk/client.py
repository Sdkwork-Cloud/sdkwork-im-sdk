from .http_client import HttpClient, SdkConfig
from .api.auth import AuthApi
from .api.users import UsersApi
from .api.friends import FriendsApi
from .api.contacts import ContactsApi
from .api.messages import MessagesApi
from .api.message_search import MessageSearchApi
from .api.groups import GroupsApi
from .api.conversations import ConversationsApi
from .api.rtc import RtcApi
from .api.wukongim import WukongimApi
from .api.ai_bot import AiBotApi
from .api.agent import AgentApi
from .api.agent_memory import AgentMemoryApi
from .api.bots import BotsApi
from .api.bots_open import BotsOpenApi
from .api.third_party import ThirdPartyApi
from .api.iot import IotApi
from .api.craw import CrawApi
from .api.timeline import TimelineApi


class SdkworkBackendClient:
    """sdkwork-im-sdk SDK Client."""

    def __init__(self, config: SdkConfig):
        self._client = HttpClient(config)
        self.auth: AuthApi
        self.users: UsersApi
        self.friends: FriendsApi
        self.contacts: ContactsApi
        self.messages: MessagesApi
        self.message_search: MessageSearchApi
        self.groups: GroupsApi
        self.conversations: ConversationsApi
        self.rtc: RtcApi
        self.wukongim: WukongimApi
        self.ai_bot: AiBotApi
        self.agent: AgentApi
        self.agent_memory: AgentMemoryApi
        self.bots: BotsApi
        self.bots_open: BotsOpenApi
        self.third_party: ThirdPartyApi
        self.iot: IotApi
        self.craw: CrawApi
        self.timeline: TimelineApi

        # Initialize API modules
        self.auth = AuthApi(self._client)
        self.users = UsersApi(self._client)
        self.friends = FriendsApi(self._client)
        self.contacts = ContactsApi(self._client)
        self.messages = MessagesApi(self._client)
        self.message_search = MessageSearchApi(self._client)
        self.groups = GroupsApi(self._client)
        self.conversations = ConversationsApi(self._client)
        self.rtc = RtcApi(self._client)
        self.wukongim = WukongimApi(self._client)
        self.ai_bot = AiBotApi(self._client)
        self.agent = AgentApi(self._client)
        self.agent_memory = AgentMemoryApi(self._client)
        self.bots = BotsApi(self._client)
        self.bots_open = BotsOpenApi(self._client)
        self.third_party = ThirdPartyApi(self._client)
        self.iot = IotApi(self._client)
        self.craw = CrawApi(self._client)
        self.timeline = TimelineApi(self._client)

    def set_api_key(self, api_key: str) -> 'SdkworkBackendClient':
        """Set API key for authentication."""
        self._client.set_api_key(api_key)
        return self

    def set_auth_token(self, token: str) -> 'SdkworkBackendClient':
        """Set auth token for authentication."""
        self._client.set_auth_token(token)
        return self

    def set_access_token(self, token: str) -> 'SdkworkBackendClient':
        """Set access token for authentication."""
        self._client.set_access_token(token)
        return self

    def set_header(self, key: str, value: str) -> 'SdkworkBackendClient':
        """Set custom header."""
        self._client.set_header(key, value)
        return self

    @property
    def http(self) -> HttpClient:
        """Get the underlying HTTP client."""
        return self._client


def create_client(config: SdkConfig) -> SdkworkBackendClient:
    """Create a new SDK client instance."""
    return SdkworkBackendClient(config)
