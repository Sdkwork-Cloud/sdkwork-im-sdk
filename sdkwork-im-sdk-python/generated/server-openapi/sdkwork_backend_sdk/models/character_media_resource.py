from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CharacterMediaResource:
    id: str = None
    uuid: str = None
    url: str = None
    bytes: List[str] = None
    local_file: Dict[str, Any] = None
    base64: str = None
    type: str = None
    mime_type: str = None
    size: float = None
    name: str = None
    extension: str = None
    tags: Dict[str, Any] = None
    metadata: Dict[str, Any] = None
    prompt: str = None
    created_at: str = None
    updated_at: str = None
    creator_id: str = None
    description: str = None
    character_type: str = None
    gender: str = None
    age_group: str = None
    avatar_image: ImageMediaResource = None
    avatar_video: VideoMediaResource = None
    speaker_id: str = None
    appearance_params: Dict[str, Any] = None
    animation_params: Dict[str, Any] = None
    actions: List[str] = None
    expressions: List[str] = None
    voice_features: Dict[str, Any] = None
