from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AckConversationSeqRequest:
    target_id: str
    type: str
    ack_seq: float
    device_id: str = None
