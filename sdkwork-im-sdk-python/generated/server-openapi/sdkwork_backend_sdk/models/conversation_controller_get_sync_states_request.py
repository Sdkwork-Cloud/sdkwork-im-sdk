from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class ConversationControllerGetSyncStatesRequest:
    conversations: List[Dict[str, Any]]
    device_id: str = None
