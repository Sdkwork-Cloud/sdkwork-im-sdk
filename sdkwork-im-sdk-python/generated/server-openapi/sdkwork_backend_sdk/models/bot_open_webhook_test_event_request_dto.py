from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class BotOpenWebhookTestEventRequestDto:
    event_type: str = None
    data: Dict[str, Any] = None
