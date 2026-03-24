from typing import Any, Dict, List, Optional
from ..http_client import HttpClient

class IotApi:
    """iot API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def io_tcontroller_register_device(self) -> None:
        """注册设备"""
        return self._client.post(f"/im/v3/iot/devices")

    def io_tcontroller_get_devices(self, params: Optional[Dict[str, Any]] = None) -> None:
        """获取设备列表"""
        return self._client.get(f"/im/v3/iot/devices", params=params)

    def io_tcontroller_get_device(self, deviceId: str) -> None:
        """获取设备详情"""
        return self._client.get(f"/im/v3/iot/devices/{deviceId}")

    def io_tcontroller_delete_device(self, deviceId: str) -> None:
        """删除设备"""
        return self._client.delete(f"/im/v3/iot/devices/{deviceId}")

    def io_tcontroller_update_device_status(self, deviceId: str) -> None:
        """更新设备状态"""
        return self._client.put(f"/im/v3/iot/devices/{deviceId}/status")

    def io_tcontroller_send_message_to_device(self, deviceId: str) -> None:
        """发送消息到设备"""
        return self._client.post(f"/im/v3/iot/devices/{deviceId}/messages")

    def io_tcontroller_get_device_messages(self, deviceId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """获取设备消息历史"""
        return self._client.get(f"/im/v3/iot/devices/{deviceId}/messages", params=params)

    def io_tcontroller_control_device(self, deviceId: str) -> None:
        """控制设备"""
        return self._client.post(f"/im/v3/iot/devices/{deviceId}/control")
