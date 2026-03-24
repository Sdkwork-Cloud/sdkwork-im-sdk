from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SendMessage:
    version: float = None
    conversation: ConversationEnvelope = None
    message: MessageEnvelope = None
    event: EventContentTransport = None
    uuid: str = None
    type: str
    content: MessageContent
    from_user_id: str
    to_user_id: str = None
    group_id: str = None
    reply_to_id: str = None
    forward_from_id: str = None
    client_seq: float = None
    idempotency_key: str = None
    extra: Dict[str, Any] = None
    need_read_receipt: bool = None
