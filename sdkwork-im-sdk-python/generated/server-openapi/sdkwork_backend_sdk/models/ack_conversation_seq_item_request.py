from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AckConversationSeqItemRequest:
    target_id: str
    type: str
    ack_seq: float
