from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class MessageContent:
    text: TextContent = None
    image: ImageMediaResource = None
    video: VideoMediaResource = None
    audio: AudioMediaResource = None
    music: MusicMediaResource = None
    file: FileMediaResource = None
    document: DocumentMediaResource = None
    code: CodeMediaResource = None
    ppt: PptMediaResource = None
    character: CharacterMediaResource = None
    model3d: Model3DMediaResource = None
    location: LocationContent = None
    card: CardContent = None
    card_resource: CardMediaResource = None
    system: SystemContent = None
    custom: CustomContent = None
    event: EventContent = None
