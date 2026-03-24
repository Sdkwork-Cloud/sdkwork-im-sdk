package com.sdkwork.backend

data class MessageContent(
    val text: TextContent? = null,
    val image: ImageMediaResource? = null,
    val video: VideoMediaResource? = null,
    val audio: AudioMediaResource? = null,
    val music: MusicMediaResource? = null,
    val file: FileMediaResource? = null,
    val document: DocumentMediaResource? = null,
    val code: CodeMediaResource? = null,
    val ppt: PptMediaResource? = null,
    val character: CharacterMediaResource? = null,
    val model3d: Model3DMediaResource? = null,
    val location: LocationContent? = null,
    val card: CardContent? = null,
    val cardResource: CardMediaResource? = null,
    val system: SystemContent? = null,
    val custom: CustomContent? = null,
    val event: EventContent? = null
)
