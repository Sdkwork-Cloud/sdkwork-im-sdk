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

dynamic unwrapResponseValue(dynamic value) {
  final map = _asMap(value);
  if (map == null) {
    return value;
  }
  if (map['success'] == false) {
    throw Exception((map['message'] ?? map['error'] ?? 'OpenChat request failed').toString());
  }
  if (map.containsKey('data')) {
    return map['data'];
  }
  return map;
}

T? decodeResponse<T>(
  dynamic value,
  T Function(Map<String, dynamic> json) fromJson,
) {
  final unwrapped = unwrapResponseValue(value);
  if (unwrapped == null) {
    return null;
  }
  if (unwrapped is T) {
    return unwrapped;
  }
  final map = _asMap(unwrapped);
  if (map == null) {
    return null;
  }
  return fromJson(map);
}
