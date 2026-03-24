from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class UpdateAgent:
    name: str = None
    description: str = None
    avatar: str = None
    type: str = None
    config: AgentConfig = None
    is_public: bool = None
    status: str = None
