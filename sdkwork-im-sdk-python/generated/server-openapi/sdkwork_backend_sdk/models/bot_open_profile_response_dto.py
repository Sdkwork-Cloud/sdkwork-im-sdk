from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class BotOpenProfileResponseDto:
    id: str
    name: str
    username: str
    app_id: str
    description: str = None
    avatar: str = None
    homepage: str = None
    developer_name: str = None
    developer_email: str = None
    intents: float
    scopes: List[str]
    status: str
    stats: BotOpenStatsDto = None
    created_at: str
    updated_at: str
