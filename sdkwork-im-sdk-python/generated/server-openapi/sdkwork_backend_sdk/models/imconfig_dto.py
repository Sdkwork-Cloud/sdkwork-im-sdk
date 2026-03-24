from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class IMConfigDto:
    ws_url: str
    uid: str
    token: str
