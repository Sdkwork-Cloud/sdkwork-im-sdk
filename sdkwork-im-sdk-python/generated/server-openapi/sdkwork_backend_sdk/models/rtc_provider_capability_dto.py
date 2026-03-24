from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class RtcProviderCapabilityDto:
    provider: str
    configured: bool
    channel_id: str = None
    supports_recording: bool
    token_strategies: List[str]
    supports_control_plane_delegate: bool
