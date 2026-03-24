from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class MessageEnvelope:
    type: str = None
    text: TextMediaResource = None
    image: ImageMediaResource = None
    audio: AudioMediaResource = None
    video: VideoMediaResource = None
    file: FileMediaResource = None
    location: LocationMediaResource = None
    card: CardMediaResource = None
    system: SystemContent = None
    custom: CustomContent = None
    music: MusicMediaResource = None
    document: DocumentMediaResource = None
    code: CodeMediaResource = None
    ppt: PptMediaResource = None
    character: CharacterMediaResource = None
    model3d: Model3DMediaResource = None
