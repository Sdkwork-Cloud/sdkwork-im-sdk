from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class RtcProviderCapabilitiesResponseDto:
    default_provider: str
    recommended_primary: str = None
    fallback_order: List[str]
    active_providers: List[str]
    providers: List[RtcProviderCapabilityDto]
