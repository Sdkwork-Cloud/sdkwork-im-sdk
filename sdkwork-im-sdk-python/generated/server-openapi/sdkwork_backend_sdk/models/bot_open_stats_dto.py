from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class BotOpenStatsDto:
    total_messages_sent: float
    total_messages_received: float
    total_users_interacted: float
    total_groups_joined: float
    total_commands_executed: float
    total_interactions: float
    last_activity_at: str = None
