import 'package:im_sdk_generated/im_sdk_generated.dart';
import 'package:sdkwork_common_flutter/sdkwork_common_flutter.dart';

import 'context.dart';
import 'types.dart';

BaseHttpClient _createPresignedUploadClient(String uploadUrl) {
  final uri = Uri.parse(uploadUrl);
  final authority = uri.hasPort
      ? '${uri.scheme}://${uri.host}:${uri.port}'
      : '${uri.scheme}://${uri.host}';
  return BaseHttpClient(
    SdkConfig(
      baseUrl: authority,
      timeout: 30000,
      headers: const <String, String>{},
    ),
  );
}

String _resolveUploadPath(Uri uri) {
  final normalizedPath = uri.path.isEmpty ? '/' : uri.path;
  return uri.hasQuery ? '$normalizedPath?${uri.query}' : normalizedPath;
}

String _requireUploadField(String? value, String fieldName) {
  if (value != null && value.isNotEmpty) {
    return value;
  }
  throw StateError('Media upload session is missing required field: $fieldName');
}

MediaUploadSession _requireUploadSession(
  MediaUploadMutationResponse? response,
  String mediaAssetId,
) {
  final upload = response?.upload;
  if (upload != null) {
    return upload;
  }
  throw StateError(
    'Media asset $mediaAssetId did not include a presigned upload session.',
  );
}

class ImMediaModule {
  final ImSdkContext context;

  ImMediaModule(this.context);

  Future<MediaUploadMutationResponse?> createUpload(CreateUploadRequest body) {
    return context.transportClient.media.createMediaUpload(body);
  }

  Future<MediaUploadMutationResponse?> completeUpload(
    String mediaAssetId,
    CompleteUploadRequest body,
  ) {
    return context.transportClient.media.completeMediaUpload(mediaAssetId, body);
  }

  Future<void> uploadContent(
    MediaUploadSession upload,
    List<int> bytes,
  ) async {
    final uploadUrl = _requireUploadField(upload.url, 'url');
    final uploadMethod = _requireUploadField(upload.method, 'method');
    final client = _createPresignedUploadClient(uploadUrl);
    final uri = Uri.parse(uploadUrl);
    await client.request(
      uploadMethod,
      _resolveUploadPath(uri),
      body: bytes,
      requestHeaders: upload.headers,
      contentType: 'application/octet-stream',
    );
  }

  Future<MediaUploadMutationResponse?> upload(
    CreateUploadRequest body,
    List<int> bytes, {
    String? checksum,
  }) async {
    final created = await createUpload(body);
    final mediaAssetId = _requireUploadField(
      created?.mediaAssetId ?? body.mediaAssetId,
      'mediaAssetId',
    );
    final upload = _requireUploadSession(created, mediaAssetId);
    await uploadContent(upload, bytes);
    return completeUpload(
      mediaAssetId,
      CompleteUploadRequest(
        bucket: upload.bucket,
        objectKey: upload.objectKey,
        storageProvider: upload.storageProvider,
        url: upload.url,
        checksum: checksum,
      ),
    );
  }

  Future<MediaDownloadUrlResponse?> getDownloadUrl(
    String mediaAssetId, [
    ImQueryParams? params,
  ]) {
    return context.transportClient.media.getMediaDownloadUrl(mediaAssetId, params);
  }

  Future<MediaAsset?> get(String mediaAssetId) {
    return context.transportClient.media.getMediaAsset(mediaAssetId);
  }

  Future<PostMessageResult?> attach(
    String mediaAssetId,
    AttachMediaRequest body,
  ) {
    return context.transportClient.media.attachMediaAsset(mediaAssetId, body);
  }

  Future<PostMessageResult?> attachText(
    String mediaAssetId,
    ImAttachTextMediaOptions options,
  ) {
    return attach(
      mediaAssetId,
      AttachMediaRequest(
        conversationId: options.conversationId,
        clientMsgId: options.clientMsgId,
        summary: options.summary,
        text: options.text,
        renderHints: options.renderHints,
      ),
    );
  }
}
