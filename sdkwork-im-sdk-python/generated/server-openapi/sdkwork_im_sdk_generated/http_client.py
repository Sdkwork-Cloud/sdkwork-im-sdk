from sdkwork.common.core.types import SdkConfig as CommonSdkConfig
from sdkwork.common.http import BaseHttpClient

SdkConfig = CommonSdkConfig


class HttpClient(BaseHttpClient):
    """
    SDK HTTP client wrapper based on sdkwork-common.

    Auth headers:
    - auth_token -> Authorization: Bearer {auth_token}
    """

    def _update_auth_headers(self) -> None:
        if self._session is None:
            return

        self._session.headers.pop('Authorization', None)
        self._session.headers.pop('Access-Token', None)
        self._session.headers.pop('X-API-Key', None)

        if self._auth_token:
            self._session.headers['Authorization'] = f'Bearer {self._auth_token}'

    def set_auth_token(self, token: str) -> 'HttpClient':
        self._auth_token = token
        self._api_key = None
        self._access_token = None
        self._update_auth_headers()
        return self

    def set_header(self, key: str, value: str) -> 'HttpClient':
        self.headers[key] = value
        if self._session is not None:
            self._session.headers[key] = value
        return self
