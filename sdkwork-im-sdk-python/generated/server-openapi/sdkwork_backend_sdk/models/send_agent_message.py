from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SendAgentMessage:
    content: str
    stream: bool = None
