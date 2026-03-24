from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class GroupControllerSendInvitationRequest:
    group_id: str = None
    inviter_id: str = None
    invitee_id: str = None
    message: str = None
