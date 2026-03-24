from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AddSkill:
    skill_id: str
    name: str
    description: str = None
    version: str = None
    config: Dict[str, Any] = None
