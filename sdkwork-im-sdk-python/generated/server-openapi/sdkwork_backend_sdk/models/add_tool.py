from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AddTool:
    name: str
    description: str = None
    parameters: Dict[str, Any] = None
    config: Dict[str, Any] = None
