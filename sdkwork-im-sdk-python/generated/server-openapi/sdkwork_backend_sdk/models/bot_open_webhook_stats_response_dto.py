from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class BotOpenWebhookStatsResponseDto:
    configured: bool
    url: str = None
    events: List[str]
    pending_retries: float
