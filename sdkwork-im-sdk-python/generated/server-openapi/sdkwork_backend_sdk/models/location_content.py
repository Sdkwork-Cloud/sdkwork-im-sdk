from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class LocationContent:
    latitude: float
    longitude: float
    address: str = None
    name: str = None
    thumbnail_url: str = None
