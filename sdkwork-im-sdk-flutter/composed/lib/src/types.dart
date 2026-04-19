import 'package:im_sdk_generated/im_sdk_generated.dart';

typedef ImQueryParams = Map<String, dynamic>;

class ImSdkClientOptions {
  final ImTransportClient transportClient;

  const ImSdkClientOptions({
    required this.transportClient,
  });
}

class ImAppendTextFrameOptions {
  final int frameSeq;
  final String text;
  final String? schemaRef;
  final String? encoding;
  final Map<String, String>? attributes;

  const ImAppendTextFrameOptions({
    required this.frameSeq,
    required this.text,
    this.schemaRef,
    this.encoding,
    this.attributes,
  });
}

class ImPostJsonSignalOptions {
  final String? schemaRef;
  final String? signalingStreamId;
  final Object? payload;
  final bool pretty;

  const ImPostJsonSignalOptions({
    this.schemaRef,
    this.signalingStreamId,
    this.payload,
    this.pretty = false,
  });
}

class ImAttachTextMediaOptions {
  final String? conversationId;
  final String? clientMsgId;
  final String? summary;
  final String text;
  final Map<String, String>? renderHints;

  const ImAttachTextMediaOptions({
    this.conversationId,
    this.clientMsgId,
    this.summary,
    required this.text,
    this.renderHints,
  });
}

class ImTextMessageOptions {
  final String? clientMsgId;
  final String? summary;
  final List<ContentPart>? parts;
  final Map<String, String>? renderHints;

  const ImTextMessageOptions({
    this.clientMsgId,
    this.summary,
    this.parts,
    this.renderHints,
  });
}

class ImTextEditOptions {
  final String? summary;
  final List<ContentPart>? parts;
  final Map<String, String>? renderHints;

  const ImTextEditOptions({
    this.summary,
    this.parts,
    this.renderHints,
  });
}
