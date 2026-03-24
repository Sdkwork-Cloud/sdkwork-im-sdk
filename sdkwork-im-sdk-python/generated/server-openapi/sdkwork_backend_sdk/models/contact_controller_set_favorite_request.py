from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class ContactControllerSetFavoriteRequest:
    is_favorite: bool
