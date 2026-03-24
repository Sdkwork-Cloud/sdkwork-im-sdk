from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class VerifyVerificationCodeDto:
    email: str = None
    phone: str = None
    code: str
    type: str
