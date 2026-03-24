from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class GroupControllerTransferRequest:
    new_owner_id: str = None
