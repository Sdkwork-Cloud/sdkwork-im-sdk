from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AddKnowledgeDocumentDto:
    title: str
    content: str
    description: str = None
    source_path: str = None
    source_type: str = None
    metadata: Dict[str, Any] = None
