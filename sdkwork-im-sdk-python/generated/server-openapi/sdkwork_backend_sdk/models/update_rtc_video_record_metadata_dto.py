from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class UpdateRtcVideoRecordMetadataDto:
    metadata: Dict[str, Any]
