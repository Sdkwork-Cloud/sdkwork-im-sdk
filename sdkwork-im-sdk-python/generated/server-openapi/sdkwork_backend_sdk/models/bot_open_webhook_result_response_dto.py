from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class BotOpenWebhookResultResponseDto:
    success: bool
    status_code: float = None
    error: str = None
    retry_count: float
    latency: float
