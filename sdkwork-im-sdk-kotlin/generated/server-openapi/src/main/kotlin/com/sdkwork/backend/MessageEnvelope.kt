package com.sdkwork.backend

data class MessageEnvelope(
    val type: String? = null,
    val text: TextMediaResource? = null,
    val image: ImageMediaResource? = null,
    val audio: AudioMediaResource? = null,
    val video: VideoMediaResource? = null,
    val file: FileMediaResource? = null,
    val location: LocationMediaResource? = null,
    val card: CardMediaResource? = null,
    val system: SystemContent? = null,
    val custom: CustomContent? = null,
    val music: MusicMediaResource? = null,
    val document: DocumentMediaResource? = null,
    val code: CodeMediaResource? = null,
    val ppt: PptMediaResource? = null,
    val character: CharacterMediaResource? = null,
    val model3d: Model3DMediaResource? = null
)
