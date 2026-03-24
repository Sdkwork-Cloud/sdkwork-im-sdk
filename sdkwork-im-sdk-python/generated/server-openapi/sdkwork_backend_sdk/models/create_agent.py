from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CreateAgent:
    name: str
    description: str = None
    avatar: str = None
    type: str = None
    config: AgentConfig = None
    is_public: bool = None
