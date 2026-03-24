from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class UpdatePasswordDto:
    old_password: str
    new_password: str
