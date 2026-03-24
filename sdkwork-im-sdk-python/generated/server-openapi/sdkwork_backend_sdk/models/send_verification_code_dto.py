from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SendVerificationCodeDto:
    email: str = None
    phone: str = None
    type: str
