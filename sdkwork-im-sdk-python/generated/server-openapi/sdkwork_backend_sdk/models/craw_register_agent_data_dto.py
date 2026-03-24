from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawRegisterAgentDataDto:
    api_key: str
    claim_url: str
    verification_code: str
