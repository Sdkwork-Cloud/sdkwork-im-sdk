from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AckConversationSeqBatchRequest:
    items: List[AckConversationSeqItemRequest]
    device_id: str = None
