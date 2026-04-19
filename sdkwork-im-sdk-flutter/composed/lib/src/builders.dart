import 'dart:convert';

import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'types.dart';

class ImBuilders {
  static const String defaultTextFrameEncoding = 'text/plain; charset=utf-8';

  static PostMessageRequest textMessage({
    required String text,
    ImTextMessageOptions options = const ImTextMessageOptions(),
  }) {
    return PostMessageRequest(
      clientMsgId: options.clientMsgId,
      summary: options.summary,
      text: text,
      parts: options.parts,
      renderHints: options.renderHints,
    );
  }

  static EditMessageRequest textEdit({
    required String text,
    ImTextEditOptions options = const ImTextEditOptions(),
  }) {
    return EditMessageRequest(
      summary: options.summary,
      text: text,
      parts: options.parts,
      renderHints: options.renderHints,
    );
  }

  static AppendStreamFrameRequest textFrame(
    ImAppendTextFrameOptions options,
  ) {
    return AppendStreamFrameRequest(
      frameSeq: options.frameSeq,
      frameType: 'text',
      schemaRef: options.schemaRef,
      encoding: options.encoding ?? defaultTextFrameEncoding,
      payload: options.text,
      attributes: options.attributes,
    );
  }

  static PostRtcSignalRequest jsonRtcSignal({
    required String signalType,
    required ImPostJsonSignalOptions options,
  }) {
    final encodedPayload = options.pretty
        ? const JsonEncoder.withIndent('  ').convert(options.payload)
        : jsonEncode(options.payload);
    return PostRtcSignalRequest(
      signalType: signalType,
      schemaRef: options.schemaRef,
      payload: encodedPayload,
      signalingStreamId: options.signalingStreamId,
    );
  }
}
