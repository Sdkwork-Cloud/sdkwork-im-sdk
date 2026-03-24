from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class RtcProviderOperationErrorDto:
    status_code: float
    message: str
    provider: str
    operation: str
    provider_status_code: float
    provider_error_code: str
    retryable: bool
    provider_message: str
