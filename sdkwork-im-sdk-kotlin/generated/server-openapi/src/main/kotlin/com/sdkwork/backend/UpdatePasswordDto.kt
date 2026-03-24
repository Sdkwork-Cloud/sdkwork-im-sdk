package com.sdkwork.backend

data class UpdatePasswordDto(
    val oldPassword: String? = null,
    val newPassword: String? = null
)
