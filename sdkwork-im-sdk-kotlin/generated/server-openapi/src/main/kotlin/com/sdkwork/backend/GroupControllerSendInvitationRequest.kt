package com.sdkwork.backend

data class GroupControllerSendInvitationRequest(
    val groupId: String? = null,
    val inviterId: String? = null,
    val inviteeId: String? = null,
    val message: String? = null
)
