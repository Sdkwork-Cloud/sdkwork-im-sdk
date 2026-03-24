from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AgentConfig:
    model: str = None
    temperature: float = None
    max_tokens: float = None
    system_prompt: str = None
    welcome_message: str = None
    tools: List[str] = None
    skills: List[str] = None
    llm: Dict[str, Any] = None
