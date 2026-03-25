// ignore_for_file: unused_element

Map<String, dynamic>? _asMap(dynamic value) {
  if (value is Map<String, dynamic>) {
    return value;
  }
  if (value is Map) {
    return value.map(
      (key, fieldValue) => MapEntry(key.toString(), fieldValue),
    );
  }
  return null;
}

double? _asDouble(dynamic value) {
  if (value is num) {
    return value.toDouble();
  }
  if (value is String) {
    return double.tryParse(value);
  }
  return null;
}

int? _asInt(dynamic value) {
  if (value is int) {
    return value;
  }
  if (value is num) {
    return value.toInt();
  }
  if (value is String) {
    return int.tryParse(value);
  }
  return null;
}

bool? _asBool(dynamic value) {
  if (value is bool) {
    return value;
  }
  if (value is String) {
    final normalized = value.trim().toLowerCase();
    if (normalized == 'true' || normalized == '1') {
      return true;
    }
    if (normalized == 'false' || normalized == '0') {
      return false;
    }
  }
  return null;
}

List<String>? _asListOfString(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map((item) => item?.toString() ?? '').toList();
}

List<int>? _asListOfInt(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map(_asInt).whereType<int>().toList();
}

List<double>? _asListOfDouble(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map(_asDouble).whereType<double>().toList();
}

List<bool>? _asListOfBool(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map(_asBool).whereType<bool>().toList();
}

List<Map<String, dynamic>>? _asListOfMap(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value
      .map(_asMap)
      .whereType<Map<String, dynamic>>()
      .toList();
}

T? _asObject<T>(
  dynamic value,
  T Function(Map<String, dynamic> json) fromJson,
) {
  final map = _asMap(value);
  if (map == null) {
    return null;
  }
  return fromJson(map);
}

List<T>? _asListOfObject<T>(
  dynamic value,
  T Function(Map<String, dynamic> json) fromJson,
) {
  if (value is! List) {
    return null;
  }
  return value
      .map((item) => _asObject(item, fromJson))
      .whereType<T>()
      .toList();
}

dynamic _encodeValue(dynamic value) {
  if (value == null) {
    return null;
  }
  if (value is List) {
    return value.map(_encodeValue).toList();
  }
  if (value is Map) {
    return value.map(
      (key, fieldValue) => MapEntry(key.toString(), _encodeValue(fieldValue)),
    );
  }
  final candidate = value as dynamic;
  try {
    return candidate.toJson();
  } catch (_) {
    return value;
  }
}


class LoginDto {
  final String? username;
  final String? password;
  final String? deviceId;

  LoginDto({
    this.username,
    this.password,
    this.deviceId,
  });

  factory LoginDto.fromJson(Map<String, dynamic> json) {
    return LoginDto(
      username: json['username']?.toString(),
      password: json['password']?.toString(),
      deviceId: json['deviceId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'username': _encodeValue(username),
      'password': _encodeValue(password),
      'deviceId': _encodeValue(deviceId),
    };
  }
}

class IMConfigDto {
  final String? wsUrl;
  final String? uid;
  final String? token;

  IMConfigDto({
    this.wsUrl,
    this.uid,
    this.token,
  });

  factory IMConfigDto.fromJson(Map<String, dynamic> json) {
    return IMConfigDto(
      wsUrl: json['wsUrl']?.toString(),
      uid: json['uid']?.toString(),
      token: json['token']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'wsUrl': _encodeValue(wsUrl),
      'uid': _encodeValue(uid),
      'token': _encodeValue(token),
    };
  }
}

class AuthResponseDto {
  final Map<String, dynamic>? user;
  final String? token;
  final String? refreshToken;
  final double? expiresIn;
  final IMConfigDto? imConfig;

  AuthResponseDto({
    this.user,
    this.token,
    this.refreshToken,
    this.expiresIn,
    this.imConfig,
  });

  factory AuthResponseDto.fromJson(Map<String, dynamic> json) {
    return AuthResponseDto(
      user: _asMap(json['user']),
      token: json['token']?.toString(),
      refreshToken: json['refreshToken']?.toString(),
      expiresIn: _asDouble(json['expiresIn']),
      imConfig: _asObject(json['imConfig'], IMConfigDto.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user': _encodeValue(user),
      'token': _encodeValue(token),
      'refreshToken': _encodeValue(refreshToken),
      'expiresIn': _encodeValue(expiresIn),
      'imConfig': _encodeValue(imConfig),
    };
  }
}

class LogoutDto {
  final String? token;
  final String? refreshToken;
  final String? deviceId;

  LogoutDto({
    this.token,
    this.refreshToken,
    this.deviceId,
  });

  factory LogoutDto.fromJson(Map<String, dynamic> json) {
    return LogoutDto(
      token: json['token']?.toString(),
      refreshToken: json['refreshToken']?.toString(),
      deviceId: json['deviceId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'token': _encodeValue(token),
      'refreshToken': _encodeValue(refreshToken),
      'deviceId': _encodeValue(deviceId),
    };
  }
}

class RefreshTokenDto {
  final String? refreshToken;

  RefreshTokenDto({
    this.refreshToken,
  });

  factory RefreshTokenDto.fromJson(Map<String, dynamic> json) {
    return RefreshTokenDto(
      refreshToken: json['refreshToken']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'refreshToken': _encodeValue(refreshToken),
    };
  }
}

class UpdatePasswordDto {
  final String? oldPassword;
  final String? newPassword;

  UpdatePasswordDto({
    this.oldPassword,
    this.newPassword,
  });

  factory UpdatePasswordDto.fromJson(Map<String, dynamic> json) {
    return UpdatePasswordDto(
      oldPassword: json['oldPassword']?.toString(),
      newPassword: json['newPassword']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'oldPassword': _encodeValue(oldPassword),
      'newPassword': _encodeValue(newPassword),
    };
  }
}

class ForgotPasswordDto {
  final String? email;
  final String? phone;

  ForgotPasswordDto({
    this.email,
    this.phone,
  });

  factory ForgotPasswordDto.fromJson(Map<String, dynamic> json) {
    return ForgotPasswordDto(
      email: json['email']?.toString(),
      phone: json['phone']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'email': _encodeValue(email),
      'phone': _encodeValue(phone),
    };
  }
}

class ForgotPasswordResponseDto {
  final bool? success;
  final String? message;
  final String? error;

  ForgotPasswordResponseDto({
    this.success,
    this.message,
    this.error,
  });

  factory ForgotPasswordResponseDto.fromJson(Map<String, dynamic> json) {
    return ForgotPasswordResponseDto(
      success: _asBool(json['success']),
      message: json['message']?.toString(),
      error: json['error']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': _encodeValue(success),
      'message': _encodeValue(message),
      'error': _encodeValue(error),
    };
  }
}

class SendVerificationCodeDto {
  final String? email;
  final String? phone;
  final String? type;

  SendVerificationCodeDto({
    this.email,
    this.phone,
    this.type,
  });

  factory SendVerificationCodeDto.fromJson(Map<String, dynamic> json) {
    return SendVerificationCodeDto(
      email: json['email']?.toString(),
      phone: json['phone']?.toString(),
      type: json['type']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'email': _encodeValue(email),
      'phone': _encodeValue(phone),
      'type': _encodeValue(type),
    };
  }
}

class VerifyVerificationCodeDto {
  final String? email;
  final String? phone;
  final String? code;
  final String? type;

  VerifyVerificationCodeDto({
    this.email,
    this.phone,
    this.code,
    this.type,
  });

  factory VerifyVerificationCodeDto.fromJson(Map<String, dynamic> json) {
    return VerifyVerificationCodeDto(
      email: json['email']?.toString(),
      phone: json['phone']?.toString(),
      code: json['code']?.toString(),
      type: json['type']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'email': _encodeValue(email),
      'phone': _encodeValue(phone),
      'code': _encodeValue(code),
      'type': _encodeValue(type),
    };
  }
}

class RegisterDto {
  final String? username;
  final String? password;
  final String? nickname;
  final String? email;
  final String? phone;
  final String? code;

  RegisterDto({
    this.username,
    this.password,
    this.nickname,
    this.email,
    this.phone,
    this.code,
  });

  factory RegisterDto.fromJson(Map<String, dynamic> json) {
    return RegisterDto(
      username: json['username']?.toString(),
      password: json['password']?.toString(),
      nickname: json['nickname']?.toString(),
      email: json['email']?.toString(),
      phone: json['phone']?.toString(),
      code: json['code']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'username': _encodeValue(username),
      'password': _encodeValue(password),
      'nickname': _encodeValue(nickname),
      'email': _encodeValue(email),
      'phone': _encodeValue(phone),
      'code': _encodeValue(code),
    };
  }
}

class UpdateProfileDto {

  UpdateProfileDto();

  factory UpdateProfileDto.fromJson(Map<String, dynamic> json) {
    return UpdateProfileDto();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class SendFriendRequestDto {
  final String? toUserId;
  final String? message;

  SendFriendRequestDto({
    this.toUserId,
    this.message,
  });

  factory SendFriendRequestDto.fromJson(Map<String, dynamic> json) {
    return SendFriendRequestDto(
      toUserId: json['toUserId']?.toString(),
      message: json['message']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'toUserId': _encodeValue(toUserId),
      'message': _encodeValue(message),
    };
  }
}

class Contact {

  Contact();

  factory Contact.fromJson(Map<String, dynamic> json) {
    return Contact();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class ConversationEnvelope {
  final String? type;
  final String? targetId;

  ConversationEnvelope({
    this.type,
    this.targetId,
  });

  factory ConversationEnvelope.fromJson(Map<String, dynamic> json) {
    return ConversationEnvelope(
      type: json['type']?.toString(),
      targetId: json['targetId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'targetId': _encodeValue(targetId),
    };
  }
}

class TextMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? text;
  final String? format;
  final List<String>? mentions;
  final Map<String, dynamic>? annotations;

  TextMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.text,
    this.format,
    this.mentions,
    this.annotations,
  });

  factory TextMediaResource.fromJson(Map<String, dynamic> json) {
    return TextMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      text: json['text']?.toString(),
      format: json['format']?.toString(),
      mentions: _asListOfString(json['mentions']),
      annotations: _asMap(json['annotations']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'text': _encodeValue(text),
      'format': _encodeValue(format),
      'mentions': _encodeValue(mentions),
      'annotations': _encodeValue(annotations),
    };
  }
}

class ImageMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? format;
  final double? width;
  final double? height;
  final List<ImageMediaResource>? splitImages;
  final String? aspectRatio;
  final String? colorMode;
  final double? dpi;
  final String? thumbnailUrl;

  ImageMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.format,
    this.width,
    this.height,
    this.splitImages,
    this.aspectRatio,
    this.colorMode,
    this.dpi,
    this.thumbnailUrl,
  });

  factory ImageMediaResource.fromJson(Map<String, dynamic> json) {
    return ImageMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      format: json['format']?.toString(),
      width: _asDouble(json['width']),
      height: _asDouble(json['height']),
      splitImages: _asListOfObject(json['splitImages'], ImageMediaResource.fromJson),
      aspectRatio: json['aspectRatio']?.toString(),
      colorMode: json['colorMode']?.toString(),
      dpi: _asDouble(json['dpi']),
      thumbnailUrl: json['thumbnailUrl']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'format': _encodeValue(format),
      'width': _encodeValue(width),
      'height': _encodeValue(height),
      'splitImages': _encodeValue(splitImages),
      'aspectRatio': _encodeValue(aspectRatio),
      'colorMode': _encodeValue(colorMode),
      'dpi': _encodeValue(dpi),
      'thumbnailUrl': _encodeValue(thumbnailUrl),
    };
  }
}

class AudioMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? format;
  final double? duration;
  final String? bitRate;
  final String? sampleRate;
  final double? channels;
  final String? codec;

  AudioMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.format,
    this.duration,
    this.bitRate,
    this.sampleRate,
    this.channels,
    this.codec,
  });

  factory AudioMediaResource.fromJson(Map<String, dynamic> json) {
    return AudioMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      format: json['format']?.toString(),
      duration: _asDouble(json['duration']),
      bitRate: json['bitRate']?.toString(),
      sampleRate: json['sampleRate']?.toString(),
      channels: _asDouble(json['channels']),
      codec: json['codec']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'format': _encodeValue(format),
      'duration': _encodeValue(duration),
      'bitRate': _encodeValue(bitRate),
      'sampleRate': _encodeValue(sampleRate),
      'channels': _encodeValue(channels),
      'codec': _encodeValue(codec),
    };
  }
}

class VideoMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? format;
  final double? duration;
  final double? width;
  final double? height;
  final double? frameRate;
  final String? bitRate;
  final String? codec;
  final String? thumbnailUrl;
  final String? coverUrl;

  VideoMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.format,
    this.duration,
    this.width,
    this.height,
    this.frameRate,
    this.bitRate,
    this.codec,
    this.thumbnailUrl,
    this.coverUrl,
  });

  factory VideoMediaResource.fromJson(Map<String, dynamic> json) {
    return VideoMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      format: json['format']?.toString(),
      duration: _asDouble(json['duration']),
      width: _asDouble(json['width']),
      height: _asDouble(json['height']),
      frameRate: _asDouble(json['frameRate']),
      bitRate: json['bitRate']?.toString(),
      codec: json['codec']?.toString(),
      thumbnailUrl: json['thumbnailUrl']?.toString(),
      coverUrl: json['coverUrl']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'format': _encodeValue(format),
      'duration': _encodeValue(duration),
      'width': _encodeValue(width),
      'height': _encodeValue(height),
      'frameRate': _encodeValue(frameRate),
      'bitRate': _encodeValue(bitRate),
      'codec': _encodeValue(codec),
      'thumbnailUrl': _encodeValue(thumbnailUrl),
      'coverUrl': _encodeValue(coverUrl),
    };
  }
}

class FileMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? hash;
  final String? path;

  FileMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.hash,
    this.path,
  });

  factory FileMediaResource.fromJson(Map<String, dynamic> json) {
    return FileMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      hash: json['hash']?.toString(),
      path: json['path']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'hash': _encodeValue(hash),
      'path': _encodeValue(path),
    };
  }
}

class LocationMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final double? latitude;
  final double? longitude;
  final String? address;
  final String? thumbnailUrl;
  final String? mapUrl;

  LocationMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.latitude,
    this.longitude,
    this.address,
    this.thumbnailUrl,
    this.mapUrl,
  });

  factory LocationMediaResource.fromJson(Map<String, dynamic> json) {
    return LocationMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      latitude: _asDouble(json['latitude']),
      longitude: _asDouble(json['longitude']),
      address: json['address']?.toString(),
      thumbnailUrl: json['thumbnailUrl']?.toString(),
      mapUrl: json['mapUrl']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'latitude': _encodeValue(latitude),
      'longitude': _encodeValue(longitude),
      'address': _encodeValue(address),
      'thumbnailUrl': _encodeValue(thumbnailUrl),
      'mapUrl': _encodeValue(mapUrl),
    };
  }
}

class CardAction {
  final String? type;
  final String? url;
  final Map<String, dynamic>? params;
  final String? appId;
  final String? appPath;

  CardAction({
    this.type,
    this.url,
    this.params,
    this.appId,
    this.appPath,
  });

  factory CardAction.fromJson(Map<String, dynamic> json) {
    return CardAction(
      type: json['type']?.toString(),
      url: json['url']?.toString(),
      params: _asMap(json['params']),
      appId: json['appId']?.toString(),
      appPath: json['appPath']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'url': _encodeValue(url),
      'params': _encodeValue(params),
      'appId': _encodeValue(appId),
      'appPath': _encodeValue(appPath),
    };
  }
}

class CardButton {
  final String? text;
  final CardAction? action;
  final String? style;
  final String? color;

  CardButton({
    this.text,
    this.action,
    this.style,
    this.color,
  });

  factory CardButton.fromJson(Map<String, dynamic> json) {
    return CardButton(
      text: json['text']?.toString(),
      action: _asObject(json['action'], CardAction.fromJson),
      style: json['style']?.toString(),
      color: json['color']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'text': _encodeValue(text),
      'action': _encodeValue(action),
      'style': _encodeValue(style),
      'color': _encodeValue(color),
    };
  }
}

class CardMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? cardType;
  final String? title;
  final String? thumbnailUrl;
  final String? sourceName;
  final String? sourceIcon;
  final String? targetUrl;
  final String? appId;
  final String? appPath;
  final String? appOriginalId;
  final String? appVersion;
  final String? packageName;
  final String? appDownloadUrl;
  final CardAction? mainAction;
  final List<CardButton>? buttons;
  final Map<String, dynamic>? extraData;
  final String? tag;
  final String? status;
  final String? expireTime;
  final bool? showSource;

  CardMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.cardType,
    this.title,
    this.thumbnailUrl,
    this.sourceName,
    this.sourceIcon,
    this.targetUrl,
    this.appId,
    this.appPath,
    this.appOriginalId,
    this.appVersion,
    this.packageName,
    this.appDownloadUrl,
    this.mainAction,
    this.buttons,
    this.extraData,
    this.tag,
    this.status,
    this.expireTime,
    this.showSource,
  });

  factory CardMediaResource.fromJson(Map<String, dynamic> json) {
    return CardMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      cardType: json['cardType']?.toString(),
      title: json['title']?.toString(),
      thumbnailUrl: json['thumbnailUrl']?.toString(),
      sourceName: json['sourceName']?.toString(),
      sourceIcon: json['sourceIcon']?.toString(),
      targetUrl: json['targetUrl']?.toString(),
      appId: json['appId']?.toString(),
      appPath: json['appPath']?.toString(),
      appOriginalId: json['appOriginalId']?.toString(),
      appVersion: json['appVersion']?.toString(),
      packageName: json['packageName']?.toString(),
      appDownloadUrl: json['appDownloadUrl']?.toString(),
      mainAction: _asObject(json['mainAction'], CardAction.fromJson),
      buttons: _asListOfObject(json['buttons'], CardButton.fromJson),
      extraData: _asMap(json['extraData']),
      tag: json['tag']?.toString(),
      status: json['status']?.toString(),
      expireTime: json['expireTime']?.toString(),
      showSource: _asBool(json['showSource']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'cardType': _encodeValue(cardType),
      'title': _encodeValue(title),
      'thumbnailUrl': _encodeValue(thumbnailUrl),
      'sourceName': _encodeValue(sourceName),
      'sourceIcon': _encodeValue(sourceIcon),
      'targetUrl': _encodeValue(targetUrl),
      'appId': _encodeValue(appId),
      'appPath': _encodeValue(appPath),
      'appOriginalId': _encodeValue(appOriginalId),
      'appVersion': _encodeValue(appVersion),
      'packageName': _encodeValue(packageName),
      'appDownloadUrl': _encodeValue(appDownloadUrl),
      'mainAction': _encodeValue(mainAction),
      'buttons': _encodeValue(buttons),
      'extraData': _encodeValue(extraData),
      'tag': _encodeValue(tag),
      'status': _encodeValue(status),
      'expireTime': _encodeValue(expireTime),
      'showSource': _encodeValue(showSource),
    };
  }
}

class SystemContent {
  final String? type;
  final Map<String, dynamic>? data;

  SystemContent({
    this.type,
    this.data,
  });

  factory SystemContent.fromJson(Map<String, dynamic> json) {
    return SystemContent(
      type: json['type']?.toString(),
      data: _asMap(json['data']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'data': _encodeValue(data),
    };
  }
}

class CustomContent {
  final String? customType;
  final Map<String, dynamic>? data;

  CustomContent({
    this.customType,
    this.data,
  });

  factory CustomContent.fromJson(Map<String, dynamic> json) {
    return CustomContent(
      customType: json['customType']?.toString(),
      data: _asMap(json['data']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'customType': _encodeValue(customType),
      'data': _encodeValue(data),
    };
  }
}

class MusicMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? format;
  final double? duration;
  final String? title;
  final String? artist;
  final String? album;
  final String? genre;
  final String? lyrics;
  final String? coverUrl;
  final double? year;

  MusicMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.format,
    this.duration,
    this.title,
    this.artist,
    this.album,
    this.genre,
    this.lyrics,
    this.coverUrl,
    this.year,
  });

  factory MusicMediaResource.fromJson(Map<String, dynamic> json) {
    return MusicMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      format: json['format']?.toString(),
      duration: _asDouble(json['duration']),
      title: json['title']?.toString(),
      artist: json['artist']?.toString(),
      album: json['album']?.toString(),
      genre: json['genre']?.toString(),
      lyrics: json['lyrics']?.toString(),
      coverUrl: json['coverUrl']?.toString(),
      year: _asDouble(json['year']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'format': _encodeValue(format),
      'duration': _encodeValue(duration),
      'title': _encodeValue(title),
      'artist': _encodeValue(artist),
      'album': _encodeValue(album),
      'genre': _encodeValue(genre),
      'lyrics': _encodeValue(lyrics),
      'coverUrl': _encodeValue(coverUrl),
      'year': _encodeValue(year),
    };
  }
}

class DocumentMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? format;
  final double? pageCount;
  final String? author;
  final String? title;
  final String? summary;
  final List<String>? keywords;
  final String? contentText;
  final String? coverUrl;
  final String? version;

  DocumentMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.format,
    this.pageCount,
    this.author,
    this.title,
    this.summary,
    this.keywords,
    this.contentText,
    this.coverUrl,
    this.version,
  });

  factory DocumentMediaResource.fromJson(Map<String, dynamic> json) {
    return DocumentMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      format: json['format']?.toString(),
      pageCount: _asDouble(json['pageCount']),
      author: json['author']?.toString(),
      title: json['title']?.toString(),
      summary: json['summary']?.toString(),
      keywords: _asListOfString(json['keywords']),
      contentText: json['contentText']?.toString(),
      coverUrl: json['coverUrl']?.toString(),
      version: json['version']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'format': _encodeValue(format),
      'pageCount': _encodeValue(pageCount),
      'author': _encodeValue(author),
      'title': _encodeValue(title),
      'summary': _encodeValue(summary),
      'keywords': _encodeValue(keywords),
      'contentText': _encodeValue(contentText),
      'coverUrl': _encodeValue(coverUrl),
      'version': _encodeValue(version),
    };
  }
}

class CodeMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? language;
  final String? code;
  final double? lineCount;
  final String? comments;
  final List<String>? dependencies;
  final String? license;
  final String? version;
  final String? author;

  CodeMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.language,
    this.code,
    this.lineCount,
    this.comments,
    this.dependencies,
    this.license,
    this.version,
    this.author,
  });

  factory CodeMediaResource.fromJson(Map<String, dynamic> json) {
    return CodeMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      language: json['language']?.toString(),
      code: json['code']?.toString(),
      lineCount: _asDouble(json['lineCount']),
      comments: json['comments']?.toString(),
      dependencies: _asListOfString(json['dependencies']),
      license: json['license']?.toString(),
      version: json['version']?.toString(),
      author: json['author']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'language': _encodeValue(language),
      'code': _encodeValue(code),
      'lineCount': _encodeValue(lineCount),
      'comments': _encodeValue(comments),
      'dependencies': _encodeValue(dependencies),
      'license': _encodeValue(license),
      'version': _encodeValue(version),
      'author': _encodeValue(author),
    };
  }
}

class PptMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? format;
  final double? slideCount;
  final String? theme;
  final String? author;
  final String? title;
  final String? notes;
  final List<String>? slideThumbnails;

  PptMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.format,
    this.slideCount,
    this.theme,
    this.author,
    this.title,
    this.notes,
    this.slideThumbnails,
  });

  factory PptMediaResource.fromJson(Map<String, dynamic> json) {
    return PptMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      format: json['format']?.toString(),
      slideCount: _asDouble(json['slideCount']),
      theme: json['theme']?.toString(),
      author: json['author']?.toString(),
      title: json['title']?.toString(),
      notes: json['notes']?.toString(),
      slideThumbnails: _asListOfString(json['slideThumbnails']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'format': _encodeValue(format),
      'slideCount': _encodeValue(slideCount),
      'theme': _encodeValue(theme),
      'author': _encodeValue(author),
      'title': _encodeValue(title),
      'notes': _encodeValue(notes),
      'slideThumbnails': _encodeValue(slideThumbnails),
    };
  }
}

class CharacterMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? characterType;
  final String? gender;
  final String? ageGroup;
  final ImageMediaResource? avatarImage;
  final VideoMediaResource? avatarVideo;
  final String? speakerId;
  final Map<String, dynamic>? appearanceParams;
  final Map<String, dynamic>? animationParams;
  final List<String>? actions;
  final List<String>? expressions;
  final Map<String, dynamic>? voiceFeatures;

  CharacterMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.characterType,
    this.gender,
    this.ageGroup,
    this.avatarImage,
    this.avatarVideo,
    this.speakerId,
    this.appearanceParams,
    this.animationParams,
    this.actions,
    this.expressions,
    this.voiceFeatures,
  });

  factory CharacterMediaResource.fromJson(Map<String, dynamic> json) {
    return CharacterMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      characterType: json['characterType']?.toString(),
      gender: json['gender']?.toString(),
      ageGroup: json['ageGroup']?.toString(),
      avatarImage: _asObject(json['avatarImage'], ImageMediaResource.fromJson),
      avatarVideo: _asObject(json['avatarVideo'], VideoMediaResource.fromJson),
      speakerId: json['speakerId']?.toString(),
      appearanceParams: _asMap(json['appearanceParams']),
      animationParams: _asMap(json['animationParams']),
      actions: _asListOfString(json['actions']),
      expressions: _asListOfString(json['expressions']),
      voiceFeatures: _asMap(json['voiceFeatures']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'characterType': _encodeValue(characterType),
      'gender': _encodeValue(gender),
      'ageGroup': _encodeValue(ageGroup),
      'avatarImage': _encodeValue(avatarImage),
      'avatarVideo': _encodeValue(avatarVideo),
      'speakerId': _encodeValue(speakerId),
      'appearanceParams': _encodeValue(appearanceParams),
      'animationParams': _encodeValue(animationParams),
      'actions': _encodeValue(actions),
      'expressions': _encodeValue(expressions),
      'voiceFeatures': _encodeValue(voiceFeatures),
    };
  }
}

class Model3DMediaResource {
  final String? id;
  final String? uuid;
  final String? url;
  final List<String>? bytes;
  final Map<String, dynamic>? localFile;
  final String? base64;
  final String? type;
  final String? mimeType;
  final double? size;
  final String? name;
  final String? extension;
  final Map<String, dynamic>? tags;
  final Map<String, dynamic>? metadata;
  final String? prompt;
  final String? createdAt;
  final String? updatedAt;
  final String? creatorId;
  final String? description;
  final String? format;
  final double? vertexCount;
  final double? faceCount;
  final double? materialCount;
  final double? boneCount;
  final double? animationCount;
  final Map<String, dynamic>? boundingBox;
  final String? previewUrl;
  final List<String>? textureUrls;

  Model3DMediaResource({
    this.id,
    this.uuid,
    this.url,
    this.bytes,
    this.localFile,
    this.base64,
    this.type,
    this.mimeType,
    this.size,
    this.name,
    this.extension,
    this.tags,
    this.metadata,
    this.prompt,
    this.createdAt,
    this.updatedAt,
    this.creatorId,
    this.description,
    this.format,
    this.vertexCount,
    this.faceCount,
    this.materialCount,
    this.boneCount,
    this.animationCount,
    this.boundingBox,
    this.previewUrl,
    this.textureUrls,
  });

  factory Model3DMediaResource.fromJson(Map<String, dynamic> json) {
    return Model3DMediaResource(
      id: json['id']?.toString(),
      uuid: json['uuid']?.toString(),
      url: json['url']?.toString(),
      bytes: _asListOfString(json['bytes']),
      localFile: _asMap(json['localFile']),
      base64: json['base64']?.toString(),
      type: json['type']?.toString(),
      mimeType: json['mimeType']?.toString(),
      size: _asDouble(json['size']),
      name: json['name']?.toString(),
      extension: json['extension']?.toString(),
      tags: _asMap(json['tags']),
      metadata: _asMap(json['metadata']),
      prompt: json['prompt']?.toString(),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
      creatorId: json['creatorId']?.toString(),
      description: json['description']?.toString(),
      format: json['format']?.toString(),
      vertexCount: _asDouble(json['vertexCount']),
      faceCount: _asDouble(json['faceCount']),
      materialCount: _asDouble(json['materialCount']),
      boneCount: _asDouble(json['boneCount']),
      animationCount: _asDouble(json['animationCount']),
      boundingBox: _asMap(json['boundingBox']),
      previewUrl: json['previewUrl']?.toString(),
      textureUrls: _asListOfString(json['textureUrls']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'uuid': _encodeValue(uuid),
      'url': _encodeValue(url),
      'bytes': _encodeValue(bytes),
      'localFile': _encodeValue(localFile),
      'base64': _encodeValue(base64),
      'type': _encodeValue(type),
      'mimeType': _encodeValue(mimeType),
      'size': _encodeValue(size),
      'name': _encodeValue(name),
      'extension': _encodeValue(extension),
      'tags': _encodeValue(tags),
      'metadata': _encodeValue(metadata),
      'prompt': _encodeValue(prompt),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
      'creatorId': _encodeValue(creatorId),
      'description': _encodeValue(description),
      'format': _encodeValue(format),
      'vertexCount': _encodeValue(vertexCount),
      'faceCount': _encodeValue(faceCount),
      'materialCount': _encodeValue(materialCount),
      'boneCount': _encodeValue(boneCount),
      'animationCount': _encodeValue(animationCount),
      'boundingBox': _encodeValue(boundingBox),
      'previewUrl': _encodeValue(previewUrl),
      'textureUrls': _encodeValue(textureUrls),
    };
  }
}

class MessageEnvelope {
  final String? type;
  final TextMediaResource? text;
  final ImageMediaResource? image;
  final AudioMediaResource? audio;
  final VideoMediaResource? video;
  final FileMediaResource? file;
  final LocationMediaResource? location;
  final CardMediaResource? card;
  final SystemContent? system;
  final CustomContent? custom;
  final MusicMediaResource? music;
  final DocumentMediaResource? document;
  final CodeMediaResource? code;
  final PptMediaResource? ppt;
  final CharacterMediaResource? character;
  final Model3DMediaResource? model3d;

  MessageEnvelope({
    this.type,
    this.text,
    this.image,
    this.audio,
    this.video,
    this.file,
    this.location,
    this.card,
    this.system,
    this.custom,
    this.music,
    this.document,
    this.code,
    this.ppt,
    this.character,
    this.model3d,
  });

  factory MessageEnvelope.fromJson(Map<String, dynamic> json) {
    return MessageEnvelope(
      type: json['type']?.toString(),
      text: _asObject(json['text'], TextMediaResource.fromJson),
      image: _asObject(json['image'], ImageMediaResource.fromJson),
      audio: _asObject(json['audio'], AudioMediaResource.fromJson),
      video: _asObject(json['video'], VideoMediaResource.fromJson),
      file: _asObject(json['file'], FileMediaResource.fromJson),
      location: _asObject(json['location'], LocationMediaResource.fromJson),
      card: _asObject(json['card'], CardMediaResource.fromJson),
      system: _asObject(json['system'], SystemContent.fromJson),
      custom: _asObject(json['custom'], CustomContent.fromJson),
      music: _asObject(json['music'], MusicMediaResource.fromJson),
      document: _asObject(json['document'], DocumentMediaResource.fromJson),
      code: _asObject(json['code'], CodeMediaResource.fromJson),
      ppt: _asObject(json['ppt'], PptMediaResource.fromJson),
      character: _asObject(json['character'], CharacterMediaResource.fromJson),
      model3d: _asObject(json['model3d'], Model3DMediaResource.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'text': _encodeValue(text),
      'image': _encodeValue(image),
      'audio': _encodeValue(audio),
      'video': _encodeValue(video),
      'file': _encodeValue(file),
      'location': _encodeValue(location),
      'card': _encodeValue(card),
      'system': _encodeValue(system),
      'custom': _encodeValue(custom),
      'music': _encodeValue(music),
      'document': _encodeValue(document),
      'code': _encodeValue(code),
      'ppt': _encodeValue(ppt),
      'character': _encodeValue(character),
      'model3d': _encodeValue(model3d),
    };
  }
}

class EventContentTransport {
  final String? type;
  final String? name;
  final Map<String, dynamic>? data;
  final Map<String, dynamic>? metadata;

  EventContentTransport({
    this.type,
    this.name,
    this.data,
    this.metadata,
  });

  factory EventContentTransport.fromJson(Map<String, dynamic> json) {
    return EventContentTransport(
      type: json['type']?.toString(),
      name: json['name']?.toString(),
      data: _asMap(json['data']),
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'name': _encodeValue(name),
      'data': _encodeValue(data),
      'metadata': _encodeValue(metadata),
    };
  }
}

class TextContent {
  final String? text;
  final List<String>? mentions;

  TextContent({
    this.text,
    this.mentions,
  });

  factory TextContent.fromJson(Map<String, dynamic> json) {
    return TextContent(
      text: json['text']?.toString(),
      mentions: _asListOfString(json['mentions']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'text': _encodeValue(text),
      'mentions': _encodeValue(mentions),
    };
  }
}

class LocationContent {
  final double? latitude;
  final double? longitude;
  final String? address;
  final String? name;
  final String? thumbnailUrl;

  LocationContent({
    this.latitude,
    this.longitude,
    this.address,
    this.name,
    this.thumbnailUrl,
  });

  factory LocationContent.fromJson(Map<String, dynamic> json) {
    return LocationContent(
      latitude: _asDouble(json['latitude']),
      longitude: _asDouble(json['longitude']),
      address: json['address']?.toString(),
      name: json['name']?.toString(),
      thumbnailUrl: json['thumbnailUrl']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'latitude': _encodeValue(latitude),
      'longitude': _encodeValue(longitude),
      'address': _encodeValue(address),
      'name': _encodeValue(name),
      'thumbnailUrl': _encodeValue(thumbnailUrl),
    };
  }
}

class CardContent {
  final String? userId;
  final String? nickname;
  final String? avatar;
  final String? signature;

  CardContent({
    this.userId,
    this.nickname,
    this.avatar,
    this.signature,
  });

  factory CardContent.fromJson(Map<String, dynamic> json) {
    return CardContent(
      userId: json['userId']?.toString(),
      nickname: json['nickname']?.toString(),
      avatar: json['avatar']?.toString(),
      signature: json['signature']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
      'nickname': _encodeValue(nickname),
      'avatar': _encodeValue(avatar),
      'signature': _encodeValue(signature),
    };
  }
}

class EventContent {
  final String? type;
  final String? name;
  final Map<String, dynamic>? data;
  final Map<String, dynamic>? metadata;

  EventContent({
    this.type,
    this.name,
    this.data,
    this.metadata,
  });

  factory EventContent.fromJson(Map<String, dynamic> json) {
    return EventContent(
      type: json['type']?.toString(),
      name: json['name']?.toString(),
      data: _asMap(json['data']),
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'name': _encodeValue(name),
      'data': _encodeValue(data),
      'metadata': _encodeValue(metadata),
    };
  }
}

class MessageContent {
  final TextContent? text;
  final ImageMediaResource? image;
  final VideoMediaResource? video;
  final AudioMediaResource? audio;
  final MusicMediaResource? music;
  final FileMediaResource? file;
  final DocumentMediaResource? document;
  final CodeMediaResource? code;
  final PptMediaResource? ppt;
  final CharacterMediaResource? character;
  final Model3DMediaResource? model3d;
  final LocationContent? location;
  final CardContent? card;
  final CardMediaResource? cardResource;
  final SystemContent? system;
  final CustomContent? custom;
  final EventContent? event;

  MessageContent({
    this.text,
    this.image,
    this.video,
    this.audio,
    this.music,
    this.file,
    this.document,
    this.code,
    this.ppt,
    this.character,
    this.model3d,
    this.location,
    this.card,
    this.cardResource,
    this.system,
    this.custom,
    this.event,
  });

  factory MessageContent.fromJson(Map<String, dynamic> json) {
    return MessageContent(
      text: _asObject(json['text'], TextContent.fromJson),
      image: _asObject(json['image'], ImageMediaResource.fromJson),
      video: _asObject(json['video'], VideoMediaResource.fromJson),
      audio: _asObject(json['audio'], AudioMediaResource.fromJson),
      music: _asObject(json['music'], MusicMediaResource.fromJson),
      file: _asObject(json['file'], FileMediaResource.fromJson),
      document: _asObject(json['document'], DocumentMediaResource.fromJson),
      code: _asObject(json['code'], CodeMediaResource.fromJson),
      ppt: _asObject(json['ppt'], PptMediaResource.fromJson),
      character: _asObject(json['character'], CharacterMediaResource.fromJson),
      model3d: _asObject(json['model3d'], Model3DMediaResource.fromJson),
      location: _asObject(json['location'], LocationContent.fromJson),
      card: _asObject(json['card'], CardContent.fromJson),
      cardResource: _asObject(json['cardResource'], CardMediaResource.fromJson),
      system: _asObject(json['system'], SystemContent.fromJson),
      custom: _asObject(json['custom'], CustomContent.fromJson),
      event: _asObject(json['event'], EventContent.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'text': _encodeValue(text),
      'image': _encodeValue(image),
      'video': _encodeValue(video),
      'audio': _encodeValue(audio),
      'music': _encodeValue(music),
      'file': _encodeValue(file),
      'document': _encodeValue(document),
      'code': _encodeValue(code),
      'ppt': _encodeValue(ppt),
      'character': _encodeValue(character),
      'model3d': _encodeValue(model3d),
      'location': _encodeValue(location),
      'card': _encodeValue(card),
      'cardResource': _encodeValue(cardResource),
      'system': _encodeValue(system),
      'custom': _encodeValue(custom),
      'event': _encodeValue(event),
    };
  }
}

class SendMessage {
  final double? version;
  final ConversationEnvelope? conversation;
  final MessageEnvelope? message;
  final EventContentTransport? event;
  final String? uuid;
  final String? type;
  final MessageContent? content;
  final String? fromUserId;
  final String? toUserId;
  final String? groupId;
  final String? replyToId;
  final String? forwardFromId;
  final double? clientSeq;
  final String? idempotencyKey;
  final Map<String, dynamic>? extra;
  final bool? needReadReceipt;

  SendMessage({
    this.version,
    this.conversation,
    this.message,
    this.event,
    this.uuid,
    this.type,
    this.content,
    this.fromUserId,
    this.toUserId,
    this.groupId,
    this.replyToId,
    this.forwardFromId,
    this.clientSeq,
    this.idempotencyKey,
    this.extra,
    this.needReadReceipt,
  });

  factory SendMessage.fromJson(Map<String, dynamic> json) {
    return SendMessage(
      version: _asDouble(json['version']),
      conversation: _asObject(json['conversation'], ConversationEnvelope.fromJson),
      message: _asObject(json['message'], MessageEnvelope.fromJson),
      event: _asObject(json['event'], EventContentTransport.fromJson),
      uuid: json['uuid']?.toString(),
      type: json['type']?.toString(),
      content: _asObject(json['content'], MessageContent.fromJson),
      fromUserId: json['fromUserId']?.toString(),
      toUserId: json['toUserId']?.toString(),
      groupId: json['groupId']?.toString(),
      replyToId: json['replyToId']?.toString(),
      forwardFromId: json['forwardFromId']?.toString(),
      clientSeq: _asDouble(json['clientSeq']),
      idempotencyKey: json['idempotencyKey']?.toString(),
      extra: _asMap(json['extra']),
      needReadReceipt: _asBool(json['needReadReceipt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'version': _encodeValue(version),
      'conversation': _encodeValue(conversation),
      'message': _encodeValue(message),
      'event': _encodeValue(event),
      'uuid': _encodeValue(uuid),
      'type': _encodeValue(type),
      'content': _encodeValue(content),
      'fromUserId': _encodeValue(fromUserId),
      'toUserId': _encodeValue(toUserId),
      'groupId': _encodeValue(groupId),
      'replyToId': _encodeValue(replyToId),
      'forwardFromId': _encodeValue(forwardFromId),
      'clientSeq': _encodeValue(clientSeq),
      'idempotencyKey': _encodeValue(idempotencyKey),
      'extra': _encodeValue(extra),
      'needReadReceipt': _encodeValue(needReadReceipt),
    };
  }
}

class BatchSendMessage {
  final List<SendMessage>? messages;

  BatchSendMessage({
    this.messages,
  });

  factory BatchSendMessage.fromJson(Map<String, dynamic> json) {
    return BatchSendMessage(
      messages: _asListOfObject(json['messages'], SendMessage.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'messages': _encodeValue(messages),
    };
  }
}

class AckConversationSeqRequest {
  final String? targetId;
  final String? type;
  final double? ackSeq;
  final String? deviceId;

  AckConversationSeqRequest({
    this.targetId,
    this.type,
    this.ackSeq,
    this.deviceId,
  });

  factory AckConversationSeqRequest.fromJson(Map<String, dynamic> json) {
    return AckConversationSeqRequest(
      targetId: json['targetId']?.toString(),
      type: json['type']?.toString(),
      ackSeq: _asDouble(json['ackSeq']),
      deviceId: json['deviceId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'targetId': _encodeValue(targetId),
      'type': _encodeValue(type),
      'ackSeq': _encodeValue(ackSeq),
      'deviceId': _encodeValue(deviceId),
    };
  }
}

class AckConversationSeqItemRequest {
  final String? targetId;
  final String? type;
  final double? ackSeq;

  AckConversationSeqItemRequest({
    this.targetId,
    this.type,
    this.ackSeq,
  });

  factory AckConversationSeqItemRequest.fromJson(Map<String, dynamic> json) {
    return AckConversationSeqItemRequest(
      targetId: json['targetId']?.toString(),
      type: json['type']?.toString(),
      ackSeq: _asDouble(json['ackSeq']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'targetId': _encodeValue(targetId),
      'type': _encodeValue(type),
      'ackSeq': _encodeValue(ackSeq),
    };
  }
}

class AckConversationSeqBatchRequest {
  final List<AckConversationSeqItemRequest>? items;
  final String? deviceId;

  AckConversationSeqBatchRequest({
    this.items,
    this.deviceId,
  });

  factory AckConversationSeqBatchRequest.fromJson(Map<String, dynamic> json) {
    return AckConversationSeqBatchRequest(
      items: _asListOfObject(json['items'], AckConversationSeqItemRequest.fromJson),
      deviceId: json['deviceId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'items': _encodeValue(items),
      'deviceId': _encodeValue(deviceId),
    };
  }
}

class MessageUnreadMemberItemResponse {
  final String? userId;
  final String? role;
  final String? receiptStatus;
  final String? deliveredAt;
  final String? readAt;

  MessageUnreadMemberItemResponse({
    this.userId,
    this.role,
    this.receiptStatus,
    this.deliveredAt,
    this.readAt,
  });

  factory MessageUnreadMemberItemResponse.fromJson(Map<String, dynamic> json) {
    return MessageUnreadMemberItemResponse(
      userId: json['userId']?.toString(),
      role: json['role']?.toString(),
      receiptStatus: json['receiptStatus']?.toString(),
      deliveredAt: json['deliveredAt']?.toString(),
      readAt: json['readAt']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
      'role': _encodeValue(role),
      'receiptStatus': _encodeValue(receiptStatus),
      'deliveredAt': _encodeValue(deliveredAt),
      'readAt': _encodeValue(readAt),
    };
  }
}

class MessageUnreadMembersResponse {
  final String? messageId;
  final String? groupId;
  final double? total;
  final double? limit;
  final double? offset;
  final String? nextCursor;
  final List<MessageUnreadMemberItemResponse>? items;

  MessageUnreadMembersResponse({
    this.messageId,
    this.groupId,
    this.total,
    this.limit,
    this.offset,
    this.nextCursor,
    this.items,
  });

  factory MessageUnreadMembersResponse.fromJson(Map<String, dynamic> json) {
    return MessageUnreadMembersResponse(
      messageId: json['messageId']?.toString(),
      groupId: json['groupId']?.toString(),
      total: _asDouble(json['total']),
      limit: _asDouble(json['limit']),
      offset: _asDouble(json['offset']),
      nextCursor: json['nextCursor']?.toString(),
      items: _asListOfObject(json['items'], MessageUnreadMemberItemResponse.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'messageId': _encodeValue(messageId),
      'groupId': _encodeValue(groupId),
      'total': _encodeValue(total),
      'limit': _encodeValue(limit),
      'offset': _encodeValue(offset),
      'nextCursor': _encodeValue(nextCursor),
      'items': _encodeValue(items),
    };
  }
}

class MessageReadMemberItemResponse {
  final String? userId;
  final String? role;
  final String? receiptStatus;
  final String? deliveredAt;
  final String? readAt;

  MessageReadMemberItemResponse({
    this.userId,
    this.role,
    this.receiptStatus,
    this.deliveredAt,
    this.readAt,
  });

  factory MessageReadMemberItemResponse.fromJson(Map<String, dynamic> json) {
    return MessageReadMemberItemResponse(
      userId: json['userId']?.toString(),
      role: json['role']?.toString(),
      receiptStatus: json['receiptStatus']?.toString(),
      deliveredAt: json['deliveredAt']?.toString(),
      readAt: json['readAt']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
      'role': _encodeValue(role),
      'receiptStatus': _encodeValue(receiptStatus),
      'deliveredAt': _encodeValue(deliveredAt),
      'readAt': _encodeValue(readAt),
    };
  }
}

class MessageReadMembersResponse {
  final String? messageId;
  final String? groupId;
  final double? total;
  final double? limit;
  final double? offset;
  final String? nextCursor;
  final List<MessageReadMemberItemResponse>? items;

  MessageReadMembersResponse({
    this.messageId,
    this.groupId,
    this.total,
    this.limit,
    this.offset,
    this.nextCursor,
    this.items,
  });

  factory MessageReadMembersResponse.fromJson(Map<String, dynamic> json) {
    return MessageReadMembersResponse(
      messageId: json['messageId']?.toString(),
      groupId: json['groupId']?.toString(),
      total: _asDouble(json['total']),
      limit: _asDouble(json['limit']),
      offset: _asDouble(json['offset']),
      nextCursor: json['nextCursor']?.toString(),
      items: _asListOfObject(json['items'], MessageReadMemberItemResponse.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'messageId': _encodeValue(messageId),
      'groupId': _encodeValue(groupId),
      'total': _encodeValue(total),
      'limit': _encodeValue(limit),
      'offset': _encodeValue(offset),
      'nextCursor': _encodeValue(nextCursor),
      'items': _encodeValue(items),
    };
  }
}

class UpdateMessageStatus {
  final String? status;

  UpdateMessageStatus({
    this.status,
  });

  factory UpdateMessageStatus.fromJson(Map<String, dynamic> json) {
    return UpdateMessageStatus(
      status: json['status']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'status': _encodeValue(status),
    };
  }
}

class EditMessage {
  final MessageContent? content;
  final Map<String, dynamic>? extra;

  EditMessage({
    this.content,
    this.extra,
  });

  factory EditMessage.fromJson(Map<String, dynamic> json) {
    return EditMessage(
      content: _asObject(json['content'], MessageContent.fromJson),
      extra: _asMap(json['extra']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'content': _encodeValue(content),
      'extra': _encodeValue(extra),
    };
  }
}

class SetMessageReaction {
  final String? emoji;
  final bool? active;

  SetMessageReaction({
    this.emoji,
    this.active,
  });

  factory SetMessageReaction.fromJson(Map<String, dynamic> json) {
    return SetMessageReaction(
      emoji: json['emoji']?.toString(),
      active: _asBool(json['active']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'emoji': _encodeValue(emoji),
      'active': _encodeValue(active),
    };
  }
}

class MarkMessagesRead {
  final List<String>? messageIds;

  MarkMessagesRead({
    this.messageIds,
  });

  factory MarkMessagesRead.fromJson(Map<String, dynamic> json) {
    return MarkMessagesRead(
      messageIds: _asListOfString(json['messageIds']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'messageIds': _encodeValue(messageIds),
    };
  }
}

class ForwardMessage {
  final String? messageId;
  final List<String>? toUserIds;
  final List<String>? toGroupIds;

  ForwardMessage({
    this.messageId,
    this.toUserIds,
    this.toGroupIds,
  });

  factory ForwardMessage.fromJson(Map<String, dynamic> json) {
    return ForwardMessage(
      messageId: json['messageId']?.toString(),
      toUserIds: _asListOfString(json['toUserIds']),
      toGroupIds: _asListOfString(json['toGroupIds']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'messageId': _encodeValue(messageId),
      'toUserIds': _encodeValue(toUserIds),
      'toGroupIds': _encodeValue(toGroupIds),
    };
  }
}

class Group {

  Group();

  factory Group.fromJson(Map<String, dynamic> json) {
    return Group();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class GroupMember {

  GroupMember();

  factory GroupMember.fromJson(Map<String, dynamic> json) {
    return GroupMember();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class GroupInvitation {

  GroupInvitation();

  factory GroupInvitation.fromJson(Map<String, dynamic> json) {
    return GroupInvitation();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class Conversation {

  Conversation();

  factory Conversation.fromJson(Map<String, dynamic> json) {
    return Conversation();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class CreateRtcRoomDto {
  final String? type;
  final List<String>? participants;
  final String? name;
  final String? channelId;
  final String? provider;
  final Map<String, dynamic>? aiMetadata;

  CreateRtcRoomDto({
    this.type,
    this.participants,
    this.name,
    this.channelId,
    this.provider,
    this.aiMetadata,
  });

  factory CreateRtcRoomDto.fromJson(Map<String, dynamic> json) {
    return CreateRtcRoomDto(
      type: json['type']?.toString(),
      participants: _asListOfString(json['participants']),
      name: json['name']?.toString(),
      channelId: json['channelId']?.toString(),
      provider: json['provider']?.toString(),
      aiMetadata: _asMap(json['aiMetadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'participants': _encodeValue(participants),
      'name': _encodeValue(name),
      'channelId': _encodeValue(channelId),
      'provider': _encodeValue(provider),
      'aiMetadata': _encodeValue(aiMetadata),
    };
  }
}

class RTCRoom {

  RTCRoom();

  factory RTCRoom.fromJson(Map<String, dynamic> json) {
    return RTCRoom();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class RtcProviderOperationErrorDto {
  final double? statusCode;
  final String? message;
  final String? provider;
  final String? operation;
  final double? providerStatusCode;
  final String? providerErrorCode;
  final bool? retryable;
  final String? providerMessage;

  RtcProviderOperationErrorDto({
    this.statusCode,
    this.message,
    this.provider,
    this.operation,
    this.providerStatusCode,
    this.providerErrorCode,
    this.retryable,
    this.providerMessage,
  });

  factory RtcProviderOperationErrorDto.fromJson(Map<String, dynamic> json) {
    return RtcProviderOperationErrorDto(
      statusCode: _asDouble(json['statusCode']),
      message: json['message']?.toString(),
      provider: json['provider']?.toString(),
      operation: json['operation']?.toString(),
      providerStatusCode: _asDouble(json['providerStatusCode']),
      providerErrorCode: json['providerErrorCode']?.toString(),
      retryable: _asBool(json['retryable']),
      providerMessage: json['providerMessage']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'statusCode': _encodeValue(statusCode),
      'message': _encodeValue(message),
      'provider': _encodeValue(provider),
      'operation': _encodeValue(operation),
      'providerStatusCode': _encodeValue(providerStatusCode),
      'providerErrorCode': _encodeValue(providerErrorCode),
      'retryable': _encodeValue(retryable),
      'providerMessage': _encodeValue(providerMessage),
    };
  }
}

class GenerateRtcTokenDto {
  final String? roomId;
  final String? userId;
  final String? channelId;
  final String? provider;
  final String? role;
  final double? expireSeconds;

  GenerateRtcTokenDto({
    this.roomId,
    this.userId,
    this.channelId,
    this.provider,
    this.role,
    this.expireSeconds,
  });

  factory GenerateRtcTokenDto.fromJson(Map<String, dynamic> json) {
    return GenerateRtcTokenDto(
      roomId: json['roomId']?.toString(),
      userId: json['userId']?.toString(),
      channelId: json['channelId']?.toString(),
      provider: json['provider']?.toString(),
      role: json['role']?.toString(),
      expireSeconds: _asDouble(json['expireSeconds']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'roomId': _encodeValue(roomId),
      'userId': _encodeValue(userId),
      'channelId': _encodeValue(channelId),
      'provider': _encodeValue(provider),
      'role': _encodeValue(role),
      'expireSeconds': _encodeValue(expireSeconds),
    };
  }
}

class RTCToken {

  RTCToken();

  factory RTCToken.fromJson(Map<String, dynamic> json) {
    return RTCToken();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class RtcConnectionInfoRequestDto {
  final String? channelId;
  final String? provider;
  final String? role;
  final double? expireSeconds;
  final bool? includeRealtimeToken;

  RtcConnectionInfoRequestDto({
    this.channelId,
    this.provider,
    this.role,
    this.expireSeconds,
    this.includeRealtimeToken,
  });

  factory RtcConnectionInfoRequestDto.fromJson(Map<String, dynamic> json) {
    return RtcConnectionInfoRequestDto(
      channelId: json['channelId']?.toString(),
      provider: json['provider']?.toString(),
      role: json['role']?.toString(),
      expireSeconds: _asDouble(json['expireSeconds']),
      includeRealtimeToken: _asBool(json['includeRealtimeToken']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'channelId': _encodeValue(channelId),
      'provider': _encodeValue(provider),
      'role': _encodeValue(role),
      'expireSeconds': _encodeValue(expireSeconds),
      'includeRealtimeToken': _encodeValue(includeRealtimeToken),
    };
  }
}

class RtcConnectionProviderConfigDto {
  final String? provider;
  final String? channelId;
  final String? appId;
  final String? providerRoomId;
  final String? businessRoomId;
  final String? userId;
  final String? token;
  final String? role;
  final String? expiresAt;
  final String? endpoint;
  final String? region;
  final Map<String, dynamic>? extras;

  RtcConnectionProviderConfigDto({
    this.provider,
    this.channelId,
    this.appId,
    this.providerRoomId,
    this.businessRoomId,
    this.userId,
    this.token,
    this.role,
    this.expiresAt,
    this.endpoint,
    this.region,
    this.extras,
  });

  factory RtcConnectionProviderConfigDto.fromJson(Map<String, dynamic> json) {
    return RtcConnectionProviderConfigDto(
      provider: json['provider']?.toString(),
      channelId: json['channelId']?.toString(),
      appId: json['appId']?.toString(),
      providerRoomId: json['providerRoomId']?.toString(),
      businessRoomId: json['businessRoomId']?.toString(),
      userId: json['userId']?.toString(),
      token: json['token']?.toString(),
      role: json['role']?.toString(),
      expiresAt: json['expiresAt']?.toString(),
      endpoint: json['endpoint']?.toString(),
      region: json['region']?.toString(),
      extras: _asMap(json['extras']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'provider': _encodeValue(provider),
      'channelId': _encodeValue(channelId),
      'appId': _encodeValue(appId),
      'providerRoomId': _encodeValue(providerRoomId),
      'businessRoomId': _encodeValue(businessRoomId),
      'userId': _encodeValue(userId),
      'token': _encodeValue(token),
      'role': _encodeValue(role),
      'expiresAt': _encodeValue(expiresAt),
      'endpoint': _encodeValue(endpoint),
      'region': _encodeValue(region),
      'extras': _encodeValue(extras),
    };
  }
}

class RtcConnectionConversationTargetDto {
  final String? conversationType;
  final String? targetId;

  RtcConnectionConversationTargetDto({
    this.conversationType,
    this.targetId,
  });

  factory RtcConnectionConversationTargetDto.fromJson(Map<String, dynamic> json) {
    return RtcConnectionConversationTargetDto(
      conversationType: json['conversationType']?.toString(),
      targetId: json['targetId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'conversationType': _encodeValue(conversationType),
      'targetId': _encodeValue(targetId),
    };
  }
}

class RtcConnectionSignalingDto {
  final String? transport;
  final String? eventType;
  final String? namespace;
  final String? roomId;
  final String? directTargetField;
  final RtcConnectionConversationTargetDto? broadcastConversation;
  final List<String>? directSignalTypes;
  final List<String>? broadcastSignalTypes;

  RtcConnectionSignalingDto({
    this.transport,
    this.eventType,
    this.namespace,
    this.roomId,
    this.directTargetField,
    this.broadcastConversation,
    this.directSignalTypes,
    this.broadcastSignalTypes,
  });

  factory RtcConnectionSignalingDto.fromJson(Map<String, dynamic> json) {
    return RtcConnectionSignalingDto(
      transport: json['transport']?.toString(),
      eventType: json['eventType']?.toString(),
      namespace: json['namespace']?.toString(),
      roomId: json['roomId']?.toString(),
      directTargetField: json['directTargetField']?.toString(),
      broadcastConversation: _asObject(json['broadcastConversation'], RtcConnectionConversationTargetDto.fromJson),
      directSignalTypes: _asListOfString(json['directSignalTypes']),
      broadcastSignalTypes: _asListOfString(json['broadcastSignalTypes']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'transport': _encodeValue(transport),
      'eventType': _encodeValue(eventType),
      'namespace': _encodeValue(namespace),
      'roomId': _encodeValue(roomId),
      'directTargetField': _encodeValue(directTargetField),
      'broadcastConversation': _encodeValue(broadcastConversation),
      'directSignalTypes': _encodeValue(directSignalTypes),
      'broadcastSignalTypes': _encodeValue(broadcastSignalTypes),
    };
  }
}

class RtcConnectionRealtimeDto {
  final String? transport;
  final String? uid;
  final String? wsUrl;
  final String? token;
  final String? apiUrl;
  final String? managerUrl;
  final String? tcpAddr;

  RtcConnectionRealtimeDto({
    this.transport,
    this.uid,
    this.wsUrl,
    this.token,
    this.apiUrl,
    this.managerUrl,
    this.tcpAddr,
  });

  factory RtcConnectionRealtimeDto.fromJson(Map<String, dynamic> json) {
    return RtcConnectionRealtimeDto(
      transport: json['transport']?.toString(),
      uid: json['uid']?.toString(),
      wsUrl: json['wsUrl']?.toString(),
      token: json['token']?.toString(),
      apiUrl: json['apiUrl']?.toString(),
      managerUrl: json['managerUrl']?.toString(),
      tcpAddr: json['tcpAddr']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'transport': _encodeValue(transport),
      'uid': _encodeValue(uid),
      'wsUrl': _encodeValue(wsUrl),
      'token': _encodeValue(token),
      'apiUrl': _encodeValue(apiUrl),
      'managerUrl': _encodeValue(managerUrl),
      'tcpAddr': _encodeValue(tcpAddr),
    };
  }
}

class RtcConnectionInfoResponseDto {
  final RTCRoom? room;
  final RTCToken? rtcToken;
  final RtcConnectionProviderConfigDto? providerConfig;
  final RtcConnectionSignalingDto? signaling;
  final RtcConnectionRealtimeDto? realtime;

  RtcConnectionInfoResponseDto({
    this.room,
    this.rtcToken,
    this.providerConfig,
    this.signaling,
    this.realtime,
  });

  factory RtcConnectionInfoResponseDto.fromJson(Map<String, dynamic> json) {
    return RtcConnectionInfoResponseDto(
      room: _asObject(json['room'], RTCRoom.fromJson),
      rtcToken: _asObject(json['rtcToken'], RTCToken.fromJson),
      providerConfig: _asObject(json['providerConfig'], RtcConnectionProviderConfigDto.fromJson),
      signaling: _asObject(json['signaling'], RtcConnectionSignalingDto.fromJson),
      realtime: _asObject(json['realtime'], RtcConnectionRealtimeDto.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'room': _encodeValue(room),
      'rtcToken': _encodeValue(rtcToken),
      'providerConfig': _encodeValue(providerConfig),
      'signaling': _encodeValue(signaling),
      'realtime': _encodeValue(realtime),
    };
  }
}

class ValidateRtcTokenDto {
  final String? token;

  ValidateRtcTokenDto({
    this.token,
  });

  factory ValidateRtcTokenDto.fromJson(Map<String, dynamic> json) {
    return ValidateRtcTokenDto(
      token: json['token']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'token': _encodeValue(token),
    };
  }
}

class RtcTokenValidationResultDto {
  final bool? valid;
  final String? roomId;
  final String? userId;
  final String? provider;
  final String? channelId;
  final String? role;
  final String? expiresAt;

  RtcTokenValidationResultDto({
    this.valid,
    this.roomId,
    this.userId,
    this.provider,
    this.channelId,
    this.role,
    this.expiresAt,
  });

  factory RtcTokenValidationResultDto.fromJson(Map<String, dynamic> json) {
    return RtcTokenValidationResultDto(
      valid: _asBool(json['valid']),
      roomId: json['roomId']?.toString(),
      userId: json['userId']?.toString(),
      provider: json['provider']?.toString(),
      channelId: json['channelId']?.toString(),
      role: json['role']?.toString(),
      expiresAt: json['expiresAt']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'valid': _encodeValue(valid),
      'roomId': _encodeValue(roomId),
      'userId': _encodeValue(userId),
      'provider': _encodeValue(provider),
      'channelId': _encodeValue(channelId),
      'role': _encodeValue(role),
      'expiresAt': _encodeValue(expiresAt),
    };
  }
}

class AddRtcParticipantDto {
  final String? userId;

  AddRtcParticipantDto({
    this.userId,
  });

  factory AddRtcParticipantDto.fromJson(Map<String, dynamic> json) {
    return AddRtcParticipantDto(
      userId: json['userId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
    };
  }
}

class RtcProviderCapabilityDto {
  final String? provider;
  final bool? configured;
  final String? channelId;
  final bool? supportsRecording;
  final List<String>? tokenStrategies;
  final bool? supportsControlPlaneDelegate;

  RtcProviderCapabilityDto({
    this.provider,
    this.configured,
    this.channelId,
    this.supportsRecording,
    this.tokenStrategies,
    this.supportsControlPlaneDelegate,
  });

  factory RtcProviderCapabilityDto.fromJson(Map<String, dynamic> json) {
    return RtcProviderCapabilityDto(
      provider: json['provider']?.toString(),
      configured: _asBool(json['configured']),
      channelId: json['channelId']?.toString(),
      supportsRecording: _asBool(json['supportsRecording']),
      tokenStrategies: _asListOfString(json['tokenStrategies']),
      supportsControlPlaneDelegate: _asBool(json['supportsControlPlaneDelegate']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'provider': _encodeValue(provider),
      'configured': _encodeValue(configured),
      'channelId': _encodeValue(channelId),
      'supportsRecording': _encodeValue(supportsRecording),
      'tokenStrategies': _encodeValue(tokenStrategies),
      'supportsControlPlaneDelegate': _encodeValue(supportsControlPlaneDelegate),
    };
  }
}

class RtcProviderCapabilitiesResponseDto {
  final String? defaultProvider;
  final String? recommendedPrimary;
  final List<String>? fallbackOrder;
  final List<String>? activeProviders;
  final List<RtcProviderCapabilityDto>? providers;

  RtcProviderCapabilitiesResponseDto({
    this.defaultProvider,
    this.recommendedPrimary,
    this.fallbackOrder,
    this.activeProviders,
    this.providers,
  });

  factory RtcProviderCapabilitiesResponseDto.fromJson(Map<String, dynamic> json) {
    return RtcProviderCapabilitiesResponseDto(
      defaultProvider: json['defaultProvider']?.toString(),
      recommendedPrimary: json['recommendedPrimary']?.toString(),
      fallbackOrder: _asListOfString(json['fallbackOrder']),
      activeProviders: _asListOfString(json['activeProviders']),
      providers: _asListOfObject(json['providers'], RtcProviderCapabilityDto.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'defaultProvider': _encodeValue(defaultProvider),
      'recommendedPrimary': _encodeValue(recommendedPrimary),
      'fallbackOrder': _encodeValue(fallbackOrder),
      'activeProviders': _encodeValue(activeProviders),
      'providers': _encodeValue(providers),
    };
  }
}

class StartRtcRecordingDto {
  final String? taskId;
  final Map<String, dynamic>? metadata;

  StartRtcRecordingDto({
    this.taskId,
    this.metadata,
  });

  factory StartRtcRecordingDto.fromJson(Map<String, dynamic> json) {
    return StartRtcRecordingDto(
      taskId: json['taskId']?.toString(),
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'taskId': _encodeValue(taskId),
      'metadata': _encodeValue(metadata),
    };
  }
}

class StopRtcRecordingDto {
  final String? recordId;
  final String? taskId;
  final Map<String, dynamic>? metadata;

  StopRtcRecordingDto({
    this.recordId,
    this.taskId,
    this.metadata,
  });

  factory StopRtcRecordingDto.fromJson(Map<String, dynamic> json) {
    return StopRtcRecordingDto(
      recordId: json['recordId']?.toString(),
      taskId: json['taskId']?.toString(),
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'recordId': _encodeValue(recordId),
      'taskId': _encodeValue(taskId),
      'metadata': _encodeValue(metadata),
    };
  }
}

class CreateRtcVideoRecordDto {
  final String? roomId;
  final String? userId;
  final String? fileName;
  final String? filePath;
  final String? fileType;
  final double? fileSize;
  final String? startTime;
  final String? endTime;
  final String? status;
  final Map<String, dynamic>? metadata;

  CreateRtcVideoRecordDto({
    this.roomId,
    this.userId,
    this.fileName,
    this.filePath,
    this.fileType,
    this.fileSize,
    this.startTime,
    this.endTime,
    this.status,
    this.metadata,
  });

  factory CreateRtcVideoRecordDto.fromJson(Map<String, dynamic> json) {
    return CreateRtcVideoRecordDto(
      roomId: json['roomId']?.toString(),
      userId: json['userId']?.toString(),
      fileName: json['fileName']?.toString(),
      filePath: json['filePath']?.toString(),
      fileType: json['fileType']?.toString(),
      fileSize: _asDouble(json['fileSize']),
      startTime: json['startTime']?.toString(),
      endTime: json['endTime']?.toString(),
      status: json['status']?.toString(),
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'roomId': _encodeValue(roomId),
      'userId': _encodeValue(userId),
      'fileName': _encodeValue(fileName),
      'filePath': _encodeValue(filePath),
      'fileType': _encodeValue(fileType),
      'fileSize': _encodeValue(fileSize),
      'startTime': _encodeValue(startTime),
      'endTime': _encodeValue(endTime),
      'status': _encodeValue(status),
      'metadata': _encodeValue(metadata),
    };
  }
}

class UpdateRtcVideoRecordStatusDto {
  final String? status;
  final String? errorMessage;

  UpdateRtcVideoRecordStatusDto({
    this.status,
    this.errorMessage,
  });

  factory UpdateRtcVideoRecordStatusDto.fromJson(Map<String, dynamic> json) {
    return UpdateRtcVideoRecordStatusDto(
      status: json['status']?.toString(),
      errorMessage: json['errorMessage']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'status': _encodeValue(status),
      'errorMessage': _encodeValue(errorMessage),
    };
  }
}

class UpdateRtcVideoRecordMetadataDto {
  final Map<String, dynamic>? metadata;

  UpdateRtcVideoRecordMetadataDto({
    this.metadata,
  });

  factory UpdateRtcVideoRecordMetadataDto.fromJson(Map<String, dynamic> json) {
    return UpdateRtcVideoRecordMetadataDto(
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'metadata': _encodeValue(metadata),
    };
  }
}

class SyncRtcVideoRecordDto {
  final String? roomId;
  final String? taskId;

  SyncRtcVideoRecordDto({
    this.roomId,
    this.taskId,
  });

  factory SyncRtcVideoRecordDto.fromJson(Map<String, dynamic> json) {
    return SyncRtcVideoRecordDto(
      roomId: json['roomId']?.toString(),
      taskId: json['taskId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'roomId': _encodeValue(roomId),
      'taskId': _encodeValue(taskId),
    };
  }
}

class AgentConfig {
  final String? model;
  final double? temperature;
  final double? maxTokens;
  final String? systemPrompt;
  final String? welcomeMessage;
  final List<String>? tools;
  final List<String>? skills;
  final Map<String, dynamic>? llm;

  AgentConfig({
    this.model,
    this.temperature,
    this.maxTokens,
    this.systemPrompt,
    this.welcomeMessage,
    this.tools,
    this.skills,
    this.llm,
  });

  factory AgentConfig.fromJson(Map<String, dynamic> json) {
    return AgentConfig(
      model: json['model']?.toString(),
      temperature: _asDouble(json['temperature']),
      maxTokens: _asDouble(json['maxTokens']),
      systemPrompt: json['systemPrompt']?.toString(),
      welcomeMessage: json['welcomeMessage']?.toString(),
      tools: _asListOfString(json['tools']),
      skills: _asListOfString(json['skills']),
      llm: _asMap(json['llm']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'model': _encodeValue(model),
      'temperature': _encodeValue(temperature),
      'maxTokens': _encodeValue(maxTokens),
      'systemPrompt': _encodeValue(systemPrompt),
      'welcomeMessage': _encodeValue(welcomeMessage),
      'tools': _encodeValue(tools),
      'skills': _encodeValue(skills),
      'llm': _encodeValue(llm),
    };
  }
}

class CreateAgent {
  final String? name;
  final String? description;
  final String? avatar;
  final String? type;
  final AgentConfig? config;
  final bool? isPublic;

  CreateAgent({
    this.name,
    this.description,
    this.avatar,
    this.type,
    this.config,
    this.isPublic,
  });

  factory CreateAgent.fromJson(Map<String, dynamic> json) {
    return CreateAgent(
      name: json['name']?.toString(),
      description: json['description']?.toString(),
      avatar: json['avatar']?.toString(),
      type: json['type']?.toString(),
      config: _asObject(json['config'], AgentConfig.fromJson),
      isPublic: _asBool(json['isPublic']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'description': _encodeValue(description),
      'avatar': _encodeValue(avatar),
      'type': _encodeValue(type),
      'config': _encodeValue(config),
      'isPublic': _encodeValue(isPublic),
    };
  }
}

class UpdateAgent {
  final String? name;
  final String? description;
  final String? avatar;
  final String? type;
  final AgentConfig? config;
  final bool? isPublic;
  final String? status;

  UpdateAgent({
    this.name,
    this.description,
    this.avatar,
    this.type,
    this.config,
    this.isPublic,
    this.status,
  });

  factory UpdateAgent.fromJson(Map<String, dynamic> json) {
    return UpdateAgent(
      name: json['name']?.toString(),
      description: json['description']?.toString(),
      avatar: json['avatar']?.toString(),
      type: json['type']?.toString(),
      config: _asObject(json['config'], AgentConfig.fromJson),
      isPublic: _asBool(json['isPublic']),
      status: json['status']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'description': _encodeValue(description),
      'avatar': _encodeValue(avatar),
      'type': _encodeValue(type),
      'config': _encodeValue(config),
      'isPublic': _encodeValue(isPublic),
      'status': _encodeValue(status),
    };
  }
}

class CreateSession {
  final String? title;

  CreateSession({
    this.title,
  });

  factory CreateSession.fromJson(Map<String, dynamic> json) {
    return CreateSession(
      title: json['title']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': _encodeValue(title),
    };
  }
}

class SendAgentMessage {
  final String? content;
  final bool? stream;

  SendAgentMessage({
    this.content,
    this.stream,
  });

  factory SendAgentMessage.fromJson(Map<String, dynamic> json) {
    return SendAgentMessage(
      content: json['content']?.toString(),
      stream: _asBool(json['stream']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'content': _encodeValue(content),
      'stream': _encodeValue(stream),
    };
  }
}

class AddTool {
  final String? name;
  final String? description;
  final Map<String, dynamic>? parameters;
  final Map<String, dynamic>? config;

  AddTool({
    this.name,
    this.description,
    this.parameters,
    this.config,
  });

  factory AddTool.fromJson(Map<String, dynamic> json) {
    return AddTool(
      name: json['name']?.toString(),
      description: json['description']?.toString(),
      parameters: _asMap(json['parameters']),
      config: _asMap(json['config']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'description': _encodeValue(description),
      'parameters': _encodeValue(parameters),
      'config': _encodeValue(config),
    };
  }
}

class AddSkill {
  final String? skillId;
  final String? name;
  final String? description;
  final String? version;
  final Map<String, dynamic>? config;

  AddSkill({
    this.skillId,
    this.name,
    this.description,
    this.version,
    this.config,
  });

  factory AddSkill.fromJson(Map<String, dynamic> json) {
    return AddSkill(
      skillId: json['skillId']?.toString(),
      name: json['name']?.toString(),
      description: json['description']?.toString(),
      version: json['version']?.toString(),
      config: _asMap(json['config']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'skillId': _encodeValue(skillId),
      'name': _encodeValue(name),
      'description': _encodeValue(description),
      'version': _encodeValue(version),
      'config': _encodeValue(config),
    };
  }
}

class StoreMemoryDto {
  final String? content;
  final String? type;
  final String? source;
  final String? sessionId;
  final Map<String, dynamic>? metadata;

  StoreMemoryDto({
    this.content,
    this.type,
    this.source,
    this.sessionId,
    this.metadata,
  });

  factory StoreMemoryDto.fromJson(Map<String, dynamic> json) {
    return StoreMemoryDto(
      content: json['content']?.toString(),
      type: json['type']?.toString(),
      source: json['source']?.toString(),
      sessionId: json['sessionId']?.toString(),
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'content': _encodeValue(content),
      'type': _encodeValue(type),
      'source': _encodeValue(source),
      'sessionId': _encodeValue(sessionId),
      'metadata': _encodeValue(metadata),
    };
  }
}

class AddKnowledgeDocumentDto {
  final String? title;
  final String? content;
  final String? description;
  final String? sourcePath;
  final String? sourceType;
  final Map<String, dynamic>? metadata;

  AddKnowledgeDocumentDto({
    this.title,
    this.content,
    this.description,
    this.sourcePath,
    this.sourceType,
    this.metadata,
  });

  factory AddKnowledgeDocumentDto.fromJson(Map<String, dynamic> json) {
    return AddKnowledgeDocumentDto(
      title: json['title']?.toString(),
      content: json['content']?.toString(),
      description: json['description']?.toString(),
      sourcePath: json['sourcePath']?.toString(),
      sourceType: json['sourceType']?.toString(),
      metadata: _asMap(json['metadata']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': _encodeValue(title),
      'content': _encodeValue(content),
      'description': _encodeValue(description),
      'sourcePath': _encodeValue(sourcePath),
      'sourceType': _encodeValue(sourceType),
      'metadata': _encodeValue(metadata),
    };
  }
}

class CreateBotDto {

  CreateBotDto();

  factory CreateBotDto.fromJson(Map<String, dynamic> json) {
    return CreateBotDto();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class UpdateBotDto {

  UpdateBotDto();

  factory UpdateBotDto.fromJson(Map<String, dynamic> json) {
    return UpdateBotDto();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class SetWebhookDto {

  SetWebhookDto();

  factory SetWebhookDto.fromJson(Map<String, dynamic> json) {
    return SetWebhookDto();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class BotOpenStatsDto {
  final double? totalMessagesSent;
  final double? totalMessagesReceived;
  final double? totalUsersInteracted;
  final double? totalGroupsJoined;
  final double? totalCommandsExecuted;
  final double? totalInteractions;
  final String? lastActivityAt;

  BotOpenStatsDto({
    this.totalMessagesSent,
    this.totalMessagesReceived,
    this.totalUsersInteracted,
    this.totalGroupsJoined,
    this.totalCommandsExecuted,
    this.totalInteractions,
    this.lastActivityAt,
  });

  factory BotOpenStatsDto.fromJson(Map<String, dynamic> json) {
    return BotOpenStatsDto(
      totalMessagesSent: _asDouble(json['totalMessagesSent']),
      totalMessagesReceived: _asDouble(json['totalMessagesReceived']),
      totalUsersInteracted: _asDouble(json['totalUsersInteracted']),
      totalGroupsJoined: _asDouble(json['totalGroupsJoined']),
      totalCommandsExecuted: _asDouble(json['totalCommandsExecuted']),
      totalInteractions: _asDouble(json['totalInteractions']),
      lastActivityAt: json['lastActivityAt']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'totalMessagesSent': _encodeValue(totalMessagesSent),
      'totalMessagesReceived': _encodeValue(totalMessagesReceived),
      'totalUsersInteracted': _encodeValue(totalUsersInteracted),
      'totalGroupsJoined': _encodeValue(totalGroupsJoined),
      'totalCommandsExecuted': _encodeValue(totalCommandsExecuted),
      'totalInteractions': _encodeValue(totalInteractions),
      'lastActivityAt': _encodeValue(lastActivityAt),
    };
  }
}

class BotOpenProfileResponseDto {
  final String? id;
  final String? name;
  final String? username;
  final String? appId;
  final String? description;
  final String? avatar;
  final String? homepage;
  final String? developerName;
  final String? developerEmail;
  final double? intents;
  final List<String>? scopes;
  final String? status;
  final BotOpenStatsDto? stats;
  final String? createdAt;
  final String? updatedAt;

  BotOpenProfileResponseDto({
    this.id,
    this.name,
    this.username,
    this.appId,
    this.description,
    this.avatar,
    this.homepage,
    this.developerName,
    this.developerEmail,
    this.intents,
    this.scopes,
    this.status,
    this.stats,
    this.createdAt,
    this.updatedAt,
  });

  factory BotOpenProfileResponseDto.fromJson(Map<String, dynamic> json) {
    return BotOpenProfileResponseDto(
      id: json['id']?.toString(),
      name: json['name']?.toString(),
      username: json['username']?.toString(),
      appId: json['appId']?.toString(),
      description: json['description']?.toString(),
      avatar: json['avatar']?.toString(),
      homepage: json['homepage']?.toString(),
      developerName: json['developerName']?.toString(),
      developerEmail: json['developerEmail']?.toString(),
      intents: _asDouble(json['intents']),
      scopes: _asListOfString(json['scopes']),
      status: json['status']?.toString(),
      stats: _asObject(json['stats'], BotOpenStatsDto.fromJson),
      createdAt: json['createdAt']?.toString(),
      updatedAt: json['updatedAt']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': _encodeValue(id),
      'name': _encodeValue(name),
      'username': _encodeValue(username),
      'appId': _encodeValue(appId),
      'description': _encodeValue(description),
      'avatar': _encodeValue(avatar),
      'homepage': _encodeValue(homepage),
      'developerName': _encodeValue(developerName),
      'developerEmail': _encodeValue(developerEmail),
      'intents': _encodeValue(intents),
      'scopes': _encodeValue(scopes),
      'status': _encodeValue(status),
      'stats': _encodeValue(stats),
      'createdAt': _encodeValue(createdAt),
      'updatedAt': _encodeValue(updatedAt),
    };
  }
}

class BotOpenWebhookStatsResponseDto {
  final bool? configured;
  final String? url;
  final List<String>? events;
  final double? pendingRetries;

  BotOpenWebhookStatsResponseDto({
    this.configured,
    this.url,
    this.events,
    this.pendingRetries,
  });

  factory BotOpenWebhookStatsResponseDto.fromJson(Map<String, dynamic> json) {
    return BotOpenWebhookStatsResponseDto(
      configured: _asBool(json['configured']),
      url: json['url']?.toString(),
      events: _asListOfString(json['events']),
      pendingRetries: _asDouble(json['pendingRetries']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'configured': _encodeValue(configured),
      'url': _encodeValue(url),
      'events': _encodeValue(events),
      'pendingRetries': _encodeValue(pendingRetries),
    };
  }
}

class BotOpenWebhookTestEventRequestDto {
  final String? eventType;
  final Map<String, dynamic>? data;

  BotOpenWebhookTestEventRequestDto({
    this.eventType,
    this.data,
  });

  factory BotOpenWebhookTestEventRequestDto.fromJson(Map<String, dynamic> json) {
    return BotOpenWebhookTestEventRequestDto(
      eventType: json['eventType']?.toString(),
      data: _asMap(json['data']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'eventType': _encodeValue(eventType),
      'data': _encodeValue(data),
    };
  }
}

class BotOpenWebhookResultResponseDto {
  final bool? success;
  final double? statusCode;
  final String? error;
  final double? retryCount;
  final double? latency;

  BotOpenWebhookResultResponseDto({
    this.success,
    this.statusCode,
    this.error,
    this.retryCount,
    this.latency,
  });

  factory BotOpenWebhookResultResponseDto.fromJson(Map<String, dynamic> json) {
    return BotOpenWebhookResultResponseDto(
      success: _asBool(json['success']),
      statusCode: _asDouble(json['statusCode']),
      error: json['error']?.toString(),
      retryCount: _asDouble(json['retryCount']),
      latency: _asDouble(json['latency']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': _encodeValue(success),
      'statusCode': _encodeValue(statusCode),
      'error': _encodeValue(error),
      'retryCount': _encodeValue(retryCount),
      'latency': _encodeValue(latency),
    };
  }
}

class ThirdPartyMessage {

  ThirdPartyMessage();

  factory ThirdPartyMessage.fromJson(Map<String, dynamic> json) {
    return ThirdPartyMessage();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class CrawRegisterRequestDto {
  final String? name;
  final String? description;

  CrawRegisterRequestDto({
    this.name,
    this.description,
  });

  factory CrawRegisterRequestDto.fromJson(Map<String, dynamic> json) {
    return CrawRegisterRequestDto(
      name: json['name']?.toString(),
      description: json['description']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'description': _encodeValue(description),
    };
  }
}

class CrawRegisterAgentDataDto {
  final String? apiKey;
  final String? claimUrl;
  final String? verificationCode;

  CrawRegisterAgentDataDto({
    this.apiKey,
    this.claimUrl,
    this.verificationCode,
  });

  factory CrawRegisterAgentDataDto.fromJson(Map<String, dynamic> json) {
    return CrawRegisterAgentDataDto(
      apiKey: json['apiKey']?.toString(),
      claimUrl: json['claimUrl']?.toString(),
      verificationCode: json['verificationCode']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'apiKey': _encodeValue(apiKey),
      'claimUrl': _encodeValue(claimUrl),
      'verificationCode': _encodeValue(verificationCode),
    };
  }
}

class CrawRegisterResponseDto {
  final bool? success;
  final CrawRegisterAgentDataDto? agent;
  final String? important;
  final String? error;

  CrawRegisterResponseDto({
    this.success,
    this.agent,
    this.important,
    this.error,
  });

  factory CrawRegisterResponseDto.fromJson(Map<String, dynamic> json) {
    return CrawRegisterResponseDto(
      success: _asBool(json['success']),
      agent: _asObject(json['agent'], CrawRegisterAgentDataDto.fromJson),
      important: json['important']?.toString(),
      error: json['error']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': _encodeValue(success),
      'agent': _encodeValue(agent),
      'important': _encodeValue(important),
      'error': _encodeValue(error),
    };
  }
}

class CrawAgentStatusResponseDto {
  final bool? success;
  final String? status;
  final String? error;

  CrawAgentStatusResponseDto({
    this.success,
    this.status,
    this.error,
  });

  factory CrawAgentStatusResponseDto.fromJson(Map<String, dynamic> json) {
    return CrawAgentStatusResponseDto(
      success: _asBool(json['success']),
      status: json['status']?.toString(),
      error: json['error']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': _encodeValue(success),
      'status': _encodeValue(status),
      'error': _encodeValue(error),
    };
  }
}

class CrawAgentOwnerDto {
  final String? xHandle;
  final String? xName;
  final String? xAvatar;
  final String? xBio;
  final double? xFollowerCount;
  final double? xFollowingCount;
  final bool? xVerified;

  CrawAgentOwnerDto({
    this.xHandle,
    this.xName,
    this.xAvatar,
    this.xBio,
    this.xFollowerCount,
    this.xFollowingCount,
    this.xVerified,
  });

  factory CrawAgentOwnerDto.fromJson(Map<String, dynamic> json) {
    return CrawAgentOwnerDto(
      xHandle: json['xHandle']?.toString(),
      xName: json['xName']?.toString(),
      xAvatar: json['xAvatar']?.toString(),
      xBio: json['xBio']?.toString(),
      xFollowerCount: _asDouble(json['xFollowerCount']),
      xFollowingCount: _asDouble(json['xFollowingCount']),
      xVerified: _asBool(json['xVerified']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'xHandle': _encodeValue(xHandle),
      'xName': _encodeValue(xName),
      'xAvatar': _encodeValue(xAvatar),
      'xBio': _encodeValue(xBio),
      'xFollowerCount': _encodeValue(xFollowerCount),
      'xFollowingCount': _encodeValue(xFollowingCount),
      'xVerified': _encodeValue(xVerified),
    };
  }
}

class CrawAgentDataDto {
  final String? name;
  final String? description;
  final double? karma;
  final double? followerCount;
  final double? followingCount;
  final bool? isClaimed;
  final bool? isActive;
  final String? createdAt;
  final String? lastActive;
  final CrawAgentOwnerDto? owner;

  CrawAgentDataDto({
    this.name,
    this.description,
    this.karma,
    this.followerCount,
    this.followingCount,
    this.isClaimed,
    this.isActive,
    this.createdAt,
    this.lastActive,
    this.owner,
  });

  factory CrawAgentDataDto.fromJson(Map<String, dynamic> json) {
    return CrawAgentDataDto(
      name: json['name']?.toString(),
      description: json['description']?.toString(),
      karma: _asDouble(json['karma']),
      followerCount: _asDouble(json['followerCount']),
      followingCount: _asDouble(json['followingCount']),
      isClaimed: _asBool(json['isClaimed']),
      isActive: _asBool(json['isActive']),
      createdAt: json['createdAt']?.toString(),
      lastActive: json['lastActive']?.toString(),
      owner: _asObject(json['owner'], CrawAgentOwnerDto.fromJson),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'description': _encodeValue(description),
      'karma': _encodeValue(karma),
      'followerCount': _encodeValue(followerCount),
      'followingCount': _encodeValue(followingCount),
      'isClaimed': _encodeValue(isClaimed),
      'isActive': _encodeValue(isActive),
      'createdAt': _encodeValue(createdAt),
      'lastActive': _encodeValue(lastActive),
      'owner': _encodeValue(owner),
    };
  }
}

class CrawAgentMeResponseDto {
  final bool? success;
  final CrawAgentDataDto? agent;
  final String? error;

  CrawAgentMeResponseDto({
    this.success,
    this.agent,
    this.error,
  });

  factory CrawAgentMeResponseDto.fromJson(Map<String, dynamic> json) {
    return CrawAgentMeResponseDto(
      success: _asBool(json['success']),
      agent: _asObject(json['agent'], CrawAgentDataDto.fromJson),
      error: json['error']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': _encodeValue(success),
      'agent': _encodeValue(agent),
      'error': _encodeValue(error),
    };
  }
}

class CrawPostsResponseDto {
  final bool? success;
  final List<Map<String, dynamic>>? posts;
  final String? error;

  CrawPostsResponseDto({
    this.success,
    this.posts,
    this.error,
  });

  factory CrawPostsResponseDto.fromJson(Map<String, dynamic> json) {
    return CrawPostsResponseDto(
      success: _asBool(json['success']),
      posts: _asListOfMap(json['posts']),
      error: json['error']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': _encodeValue(success),
      'posts': _encodeValue(posts),
      'error': _encodeValue(error),
    };
  }
}

class CrawPostResponseDto {
  final bool? success;
  final Map<String, dynamic>? post;
  final String? error;

  CrawPostResponseDto({
    this.success,
    this.post,
    this.error,
  });

  factory CrawPostResponseDto.fromJson(Map<String, dynamic> json) {
    return CrawPostResponseDto(
      success: _asBool(json['success']),
      post: _asMap(json['post']),
      error: json['error']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': _encodeValue(success),
      'post': _encodeValue(post),
      'error': _encodeValue(error),
    };
  }
}

class TimelineMediaItemDto {
  final String? type;
  final String? url;
  final double? width;
  final double? height;
  final double? duration;
  final String? coverUrl;
  final Map<String, dynamic>? extra;

  TimelineMediaItemDto({
    this.type,
    this.url,
    this.width,
    this.height,
    this.duration,
    this.coverUrl,
    this.extra,
  });

  factory TimelineMediaItemDto.fromJson(Map<String, dynamic> json) {
    return TimelineMediaItemDto(
      type: json['type']?.toString(),
      url: json['url']?.toString(),
      width: _asDouble(json['width']),
      height: _asDouble(json['height']),
      duration: _asDouble(json['duration']),
      coverUrl: json['coverUrl']?.toString(),
      extra: _asMap(json['extra']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'url': _encodeValue(url),
      'width': _encodeValue(width),
      'height': _encodeValue(height),
      'duration': _encodeValue(duration),
      'coverUrl': _encodeValue(coverUrl),
      'extra': _encodeValue(extra),
    };
  }
}

class CreateTimelinePostDto {
  final String? text;
  final List<TimelineMediaItemDto>? media;
  final String? visibility;
  final List<String>? customAudienceIds;
  final Map<String, dynamic>? extra;

  CreateTimelinePostDto({
    this.text,
    this.media,
    this.visibility,
    this.customAudienceIds,
    this.extra,
  });

  factory CreateTimelinePostDto.fromJson(Map<String, dynamic> json) {
    return CreateTimelinePostDto(
      text: json['text']?.toString(),
      media: _asListOfObject(json['media'], TimelineMediaItemDto.fromJson),
      visibility: json['visibility']?.toString(),
      customAudienceIds: _asListOfString(json['customAudienceIds']),
      extra: _asMap(json['extra']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'text': _encodeValue(text),
      'media': _encodeValue(media),
      'visibility': _encodeValue(visibility),
      'customAudienceIds': _encodeValue(customAudienceIds),
      'extra': _encodeValue(extra),
    };
  }
}

class ToggleTimelineLikeDto {
  final bool? liked;

  ToggleTimelineLikeDto({
    this.liked,
  });

  factory ToggleTimelineLikeDto.fromJson(Map<String, dynamic> json) {
    return ToggleTimelineLikeDto(
      liked: _asBool(json['liked']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'liked': _encodeValue(liked),
    };
  }
}

class FriendControllerSendRequestResponse {

  FriendControllerSendRequestResponse();

  factory FriendControllerSendRequestResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerSendRequestResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerSendRequestResponse400 {
  final double? code;
  final String? message;
  final double? timestamp;
  final String? requestId;

  FriendControllerSendRequestResponse400({
    this.code,
    this.message,
    this.timestamp,
    this.requestId,
  });

  factory FriendControllerSendRequestResponse400.fromJson(Map<String, dynamic> json) {
    return FriendControllerSendRequestResponse400(
      code: _asDouble(json['code']),
      message: json['message']?.toString(),
      timestamp: _asDouble(json['timestamp']),
      requestId: json['requestId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'code': _encodeValue(code),
      'message': _encodeValue(message),
      'timestamp': _encodeValue(timestamp),
      'requestId': _encodeValue(requestId),
    };
  }
}

class FriendControllerAcceptRequestResponse {

  FriendControllerAcceptRequestResponse();

  factory FriendControllerAcceptRequestResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerAcceptRequestResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerAcceptRequestResponse404 {
  final double? code;
  final String? message;
  final double? timestamp;
  final String? requestId;

  FriendControllerAcceptRequestResponse404({
    this.code,
    this.message,
    this.timestamp,
    this.requestId,
  });

  factory FriendControllerAcceptRequestResponse404.fromJson(Map<String, dynamic> json) {
    return FriendControllerAcceptRequestResponse404(
      code: _asDouble(json['code']),
      message: json['message']?.toString(),
      timestamp: _asDouble(json['timestamp']),
      requestId: json['requestId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'code': _encodeValue(code),
      'message': _encodeValue(message),
      'timestamp': _encodeValue(timestamp),
      'requestId': _encodeValue(requestId),
    };
  }
}

class FriendControllerRejectRequestResponse {

  FriendControllerRejectRequestResponse();

  factory FriendControllerRejectRequestResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerRejectRequestResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerCancelRequestResponse {

  FriendControllerCancelRequestResponse();

  factory FriendControllerCancelRequestResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerCancelRequestResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerRemoveResponse {

  FriendControllerRemoveResponse();

  factory FriendControllerRemoveResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerRemoveResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerGetRequestsResponse {

  FriendControllerGetRequestsResponse();

  factory FriendControllerGetRequestsResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerGetRequestsResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerGetSentRequestsResponse {

  FriendControllerGetSentRequestsResponse();

  factory FriendControllerGetSentRequestsResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerGetSentRequestsResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerGetResponse {

  FriendControllerGetResponse();

  factory FriendControllerGetResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerGetResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerCheckFriendshipResponse {

  FriendControllerCheckFriendshipResponse();

  factory FriendControllerCheckFriendshipResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerCheckFriendshipResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerBlockResponse {

  FriendControllerBlockResponse();

  factory FriendControllerBlockResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerBlockResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerUnblockResponse {

  FriendControllerUnblockResponse();

  factory FriendControllerUnblockResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerUnblockResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class FriendControllerCheckBlockedResponse {

  FriendControllerCheckBlockedResponse();

  factory FriendControllerCheckBlockedResponse.fromJson(Map<String, dynamic> json) {
    return FriendControllerCheckBlockedResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class ContactControllerCreateRequest {
  final String? userId;
  final String? contactId;
  final String? type;
  final String? name;
  final String? remark;
  final List<String>? tags;

  ContactControllerCreateRequest({
    this.userId,
    this.contactId,
    this.type,
    this.name,
    this.remark,
    this.tags,
  });

  factory ContactControllerCreateRequest.fromJson(Map<String, dynamic> json) {
    return ContactControllerCreateRequest(
      userId: json['userId']?.toString(),
      contactId: json['contactId']?.toString(),
      type: json['type']?.toString(),
      name: json['name']?.toString(),
      remark: json['remark']?.toString(),
      tags: _asListOfString(json['tags']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
      'contactId': _encodeValue(contactId),
      'type': _encodeValue(type),
      'name': _encodeValue(name),
      'remark': _encodeValue(remark),
      'tags': _encodeValue(tags),
    };
  }
}

class ContactControllerGetByUserIdResponse {

  ContactControllerGetByUserIdResponse();

  factory ContactControllerGetByUserIdResponse.fromJson(Map<String, dynamic> json) {
    return ContactControllerGetByUserIdResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class ContactControllerUpdateRequest {
  final String? name;
  final String? remark;
  final List<String>? tags;
  final bool? isFavorite;
  final String? status;

  ContactControllerUpdateRequest({
    this.name,
    this.remark,
    this.tags,
    this.isFavorite,
    this.status,
  });

  factory ContactControllerUpdateRequest.fromJson(Map<String, dynamic> json) {
    return ContactControllerUpdateRequest(
      name: json['name']?.toString(),
      remark: json['remark']?.toString(),
      tags: _asListOfString(json['tags']),
      isFavorite: _asBool(json['isFavorite']),
      status: json['status']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'remark': _encodeValue(remark),
      'tags': _encodeValue(tags),
      'isFavorite': _encodeValue(isFavorite),
      'status': _encodeValue(status),
    };
  }
}

class ContactControllerBatchDeleteRequest {
  final List<String>? ids;

  ContactControllerBatchDeleteRequest({
    this.ids,
  });

  factory ContactControllerBatchDeleteRequest.fromJson(Map<String, dynamic> json) {
    return ContactControllerBatchDeleteRequest(
      ids: _asListOfString(json['ids']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'ids': _encodeValue(ids),
    };
  }
}

class ContactControllerSetFavoriteRequest {
  final bool? isFavorite;

  ContactControllerSetFavoriteRequest({
    this.isFavorite,
  });

  factory ContactControllerSetFavoriteRequest.fromJson(Map<String, dynamic> json) {
    return ContactControllerSetFavoriteRequest(
      isFavorite: _asBool(json['isFavorite']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'isFavorite': _encodeValue(isFavorite),
    };
  }
}

class ContactControllerSetRemarkRequest {
  final String? remark;

  ContactControllerSetRemarkRequest({
    this.remark,
  });

  factory ContactControllerSetRemarkRequest.fromJson(Map<String, dynamic> json) {
    return ContactControllerSetRemarkRequest(
      remark: json['remark']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'remark': _encodeValue(remark),
    };
  }
}

class ContactControllerAddTagRequest {
  final String? tag;

  ContactControllerAddTagRequest({
    this.tag,
  });

  factory ContactControllerAddTagRequest.fromJson(Map<String, dynamic> json) {
    return ContactControllerAddTagRequest(
      tag: json['tag']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'tag': _encodeValue(tag),
    };
  }
}

class ContactControllerSearchResponse {

  ContactControllerSearchResponse();

  factory ContactControllerSearchResponse.fromJson(Map<String, dynamic> json) {
    return ContactControllerSearchResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class GroupControllerAddMemberRequest {
  final String? userId;
  final String? role;

  GroupControllerAddMemberRequest({
    this.userId,
    this.role,
  });

  factory GroupControllerAddMemberRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerAddMemberRequest(
      userId: json['userId']?.toString(),
      role: json['role']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
      'role': _encodeValue(role),
    };
  }
}

class GroupControllerGetMembersResponse {

  GroupControllerGetMembersResponse();

  factory GroupControllerGetMembersResponse.fromJson(Map<String, dynamic> json) {
    return GroupControllerGetMembersResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class GroupControllerUpdateMemberRoleRequest {
  final String? role;

  GroupControllerUpdateMemberRoleRequest({
    this.role,
  });

  factory GroupControllerUpdateMemberRoleRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerUpdateMemberRoleRequest(
      role: json['role']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'role': _encodeValue(role),
    };
  }
}

class GroupControllerGetByUserIdResponse {

  GroupControllerGetByUserIdResponse();

  factory GroupControllerGetByUserIdResponse.fromJson(Map<String, dynamic> json) {
    return GroupControllerGetByUserIdResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class GroupControllerSendInvitationRequest {
  final String? groupId;
  final String? inviterId;
  final String? inviteeId;
  final String? message;

  GroupControllerSendInvitationRequest({
    this.groupId,
    this.inviterId,
    this.inviteeId,
    this.message,
  });

  factory GroupControllerSendInvitationRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerSendInvitationRequest(
      groupId: json['groupId']?.toString(),
      inviterId: json['inviterId']?.toString(),
      inviteeId: json['inviteeId']?.toString(),
      message: json['message']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'groupId': _encodeValue(groupId),
      'inviterId': _encodeValue(inviterId),
      'inviteeId': _encodeValue(inviteeId),
      'message': _encodeValue(message),
    };
  }
}

class GroupControllerAddToBlacklistRequest {
  final String? userId;

  GroupControllerAddToBlacklistRequest({
    this.userId,
  });

  factory GroupControllerAddToBlacklistRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerAddToBlacklistRequest(
      userId: json['userId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
    };
  }
}

class GroupControllerAddToWhitelistRequest {
  final String? userId;

  GroupControllerAddToWhitelistRequest({
    this.userId,
  });

  factory GroupControllerAddToWhitelistRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerAddToWhitelistRequest(
      userId: json['userId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
    };
  }
}

class GroupControllerQuitRequest {
  final String? userId;

  GroupControllerQuitRequest({
    this.userId,
  });

  factory GroupControllerQuitRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerQuitRequest(
      userId: json['userId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
    };
  }
}

class GroupControllerUpdateAnnouncementRequest {
  final String? announcement;

  GroupControllerUpdateAnnouncementRequest({
    this.announcement,
  });

  factory GroupControllerUpdateAnnouncementRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerUpdateAnnouncementRequest(
      announcement: json['announcement']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'announcement': _encodeValue(announcement),
    };
  }
}

class GroupControllerSetMuteAllRequest {
  final bool? muteAll;

  GroupControllerSetMuteAllRequest({
    this.muteAll,
  });

  factory GroupControllerSetMuteAllRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerSetMuteAllRequest(
      muteAll: _asBool(json['muteAll']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'muteAll': _encodeValue(muteAll),
    };
  }
}

class GroupControllerMuteMemberRequest {
  final double? duration;

  GroupControllerMuteMemberRequest({
    this.duration,
  });

  factory GroupControllerMuteMemberRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerMuteMemberRequest(
      duration: _asDouble(json['duration']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'duration': _encodeValue(duration),
    };
  }
}

class GroupControllerTransferRequest {
  final String? newOwnerId;

  GroupControllerTransferRequest({
    this.newOwnerId,
  });

  factory GroupControllerTransferRequest.fromJson(Map<String, dynamic> json) {
    return GroupControllerTransferRequest(
      newOwnerId: json['newOwnerId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'newOwnerId': _encodeValue(newOwnerId),
    };
  }
}

class ConversationControllerCreateRequest {
  final String? type;
  final String? targetId;

  ConversationControllerCreateRequest({
    this.type,
    this.targetId,
  });

  factory ConversationControllerCreateRequest.fromJson(Map<String, dynamic> json) {
    return ConversationControllerCreateRequest(
      type: json['type']?.toString(),
      targetId: json['targetId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': _encodeValue(type),
      'targetId': _encodeValue(targetId),
    };
  }
}

class ConversationControllerGetByUserIdResponse {

  ConversationControllerGetByUserIdResponse();

  factory ConversationControllerGetByUserIdResponse.fromJson(Map<String, dynamic> json) {
    return ConversationControllerGetByUserIdResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class ConversationControllerGetSyncStatesRequest {
  final List<Map<String, dynamic>>? conversations;
  final String? deviceId;

  ConversationControllerGetSyncStatesRequest({
    this.conversations,
    this.deviceId,
  });

  factory ConversationControllerGetSyncStatesRequest.fromJson(Map<String, dynamic> json) {
    return ConversationControllerGetSyncStatesRequest(
      conversations: _asListOfMap(json['conversations']),
      deviceId: json['deviceId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'conversations': _encodeValue(conversations),
      'deviceId': _encodeValue(deviceId),
    };
  }
}

class ConversationControllerUpdateRequest {
  final bool? isPinned;
  final bool? isMuted;

  ConversationControllerUpdateRequest({
    this.isPinned,
    this.isMuted,
  });

  factory ConversationControllerUpdateRequest.fromJson(Map<String, dynamic> json) {
    return ConversationControllerUpdateRequest(
      isPinned: _asBool(json['isPinned']),
      isMuted: _asBool(json['isMuted']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'isPinned': _encodeValue(isPinned),
      'isMuted': _encodeValue(isMuted),
    };
  }
}

class ConversationControllerPinRequest {
  final bool? isPinned;

  ConversationControllerPinRequest({
    this.isPinned,
  });

  factory ConversationControllerPinRequest.fromJson(Map<String, dynamic> json) {
    return ConversationControllerPinRequest(
      isPinned: _asBool(json['isPinned']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'isPinned': _encodeValue(isPinned),
    };
  }
}

class ConversationControllerMuteRequest {
  final bool? isMuted;

  ConversationControllerMuteRequest({
    this.isMuted,
  });

  factory ConversationControllerMuteRequest.fromJson(Map<String, dynamic> json) {
    return ConversationControllerMuteRequest(
      isMuted: _asBool(json['isMuted']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'isMuted': _encodeValue(isMuted),
    };
  }
}

class ConversationControllerBatchDeleteRequest {
  final List<String>? ids;

  ConversationControllerBatchDeleteRequest({
    this.ids,
  });

  factory ConversationControllerBatchDeleteRequest.fromJson(Map<String, dynamic> json) {
    return ConversationControllerBatchDeleteRequest(
      ids: _asListOfString(json['ids']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'ids': _encodeValue(ids),
    };
  }
}

class RtcAppControllerGetRoomsByUserIdResponse {

  RtcAppControllerGetRoomsByUserIdResponse();

  factory RtcAppControllerGetRoomsByUserIdResponse.fromJson(Map<String, dynamic> json) {
    return RtcAppControllerGetRoomsByUserIdResponse();
  }

  Map<String, dynamic> toJson() {
    return {
    };
  }
}

class AibotControllerCreateBotRequest {
  final String? name;
  final String? description;
  final String? type;
  final Map<String, dynamic>? config;
  final bool? isActive;

  AibotControllerCreateBotRequest({
    this.name,
    this.description,
    this.type,
    this.config,
    this.isActive,
  });

  factory AibotControllerCreateBotRequest.fromJson(Map<String, dynamic> json) {
    return AibotControllerCreateBotRequest(
      name: json['name']?.toString(),
      description: json['description']?.toString(),
      type: json['type']?.toString(),
      config: _asMap(json['config']),
      isActive: _asBool(json['isActive']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'description': _encodeValue(description),
      'type': _encodeValue(type),
      'config': _encodeValue(config),
      'isActive': _encodeValue(isActive),
    };
  }
}

class AibotControllerUpdateBotRequest {
  final String? name;
  final String? description;
  final String? type;
  final Map<String, dynamic>? config;
  final bool? isActive;

  AibotControllerUpdateBotRequest({
    this.name,
    this.description,
    this.type,
    this.config,
    this.isActive,
  });

  factory AibotControllerUpdateBotRequest.fromJson(Map<String, dynamic> json) {
    return AibotControllerUpdateBotRequest(
      name: json['name']?.toString(),
      description: json['description']?.toString(),
      type: json['type']?.toString(),
      config: _asMap(json['config']),
      isActive: _asBool(json['isActive']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': _encodeValue(name),
      'description': _encodeValue(description),
      'type': _encodeValue(type),
      'config': _encodeValue(config),
      'isActive': _encodeValue(isActive),
    };
  }
}

class AibotControllerProcessMessageRequest {
  final String? userId;
  final String? message;

  AibotControllerProcessMessageRequest({
    this.userId,
    this.message,
  });

  factory AibotControllerProcessMessageRequest.fromJson(Map<String, dynamic> json) {
    return AibotControllerProcessMessageRequest(
      userId: json['userId']?.toString(),
      message: json['message']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': _encodeValue(userId),
      'message': _encodeValue(message),
    };
  }
}
