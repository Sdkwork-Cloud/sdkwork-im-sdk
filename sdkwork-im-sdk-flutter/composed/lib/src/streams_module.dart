import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'builders.dart';
import 'context.dart';
import 'types.dart';

class ImStreamsModule {
  final ImSdkContext context;

  ImStreamsModule(this.context);

  Future<StreamSession?> open(OpenStreamRequest body) {
    return context.transportClient.stream.open(body);
  }

  Future<StreamFrameWindow?> listFrames(
    String streamId, [
    ImQueryParams? params,
  ]) {
    return context.transportClient.stream.listStreamFrames(streamId, params);
  }

  Future<StreamFrame?> appendFrame(
    String streamId,
    AppendStreamFrameRequest body,
  ) {
    return context.transportClient.stream.appendStreamFrame(streamId, body);
  }

  Future<StreamFrame?> appendTextFrame(
    String streamId,
    ImAppendTextFrameOptions options,
  ) {
    return appendFrame(
      streamId,
      ImBuilders.textFrame(options),
    );
  }

  Future<StreamSession?> checkpoint(
    String streamId,
    CheckpointStreamRequest body,
  ) {
    return context.transportClient.stream.checkpoint(streamId, body);
  }

  Future<StreamSession?> complete(
    String streamId,
    CompleteStreamRequest body,
  ) {
    return context.transportClient.stream.complete(streamId, body);
  }

  Future<StreamSession?> abort(
    String streamId,
    AbortStreamRequest body,
  ) {
    return context.transportClient.stream.abort(streamId, body);
  }
}
