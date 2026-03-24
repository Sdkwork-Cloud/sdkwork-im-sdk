from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CardMediaResource:
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
    card_type: str
    title: str
    thumbnail_url: str = None
    source_name: str = None
    source_icon: str = None
    target_url: str = None
    app_id: str = None
    app_path: str = None
    app_original_id: str = None
    app_version: str = None
    package_name: str = None
    app_download_url: str = None
    main_action: CardAction = None
    buttons: List[CardButton] = None
    extra_data: Dict[str, Any] = None
    tag: str = None
    status: str = None
    expire_time: str = None
    show_source: bool = None
