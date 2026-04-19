import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'builders.dart';
import 'context.dart';
import 'types.dart';

class ImRtcModule {
  final ImSdkContext context;

  ImRtcModule(this.context);

  Future<RtcSession?> create(CreateRtcSessionRequest body) {
    return context.transportClient.rtc.createRtcSession(body);
  }

  Future<RtcSession?> invite(
    String rtcSessionId,
    InviteRtcSessionRequest body,
  ) {
    return context.transportClient.rtc.inviteRtcSession(rtcSessionId, body);
  }

  Future<RtcSession?> accept(
    String rtcSessionId,
    UpdateRtcSessionRequest body,
  ) {
    return context.transportClient.rtc.acceptRtcSession(rtcSessionId, body);
  }

  Future<RtcSession?> reject(
    String rtcSessionId,
    UpdateRtcSessionRequest body,
  ) {
    return context.transportClient.rtc.rejectRtcSession(rtcSessionId, body);
  }

  Future<RtcSession?> end(
    String rtcSessionId,
    UpdateRtcSessionRequest body,
  ) {
    return context.transportClient.rtc.endRtcSession(rtcSessionId, body);
  }

  Future<RtcSignalEvent?> postSignal(
    String rtcSessionId,
    PostRtcSignalRequest body,
  ) {
    return context.transportClient.rtc.postRtcSignal(rtcSessionId, body);
  }

  Future<RtcSignalEvent?> postJsonSignal(
    String rtcSessionId, {
    required String signalType,
    required ImPostJsonSignalOptions options,
  }) {
    return postSignal(
      rtcSessionId,
      ImBuilders.jsonRtcSignal(
        signalType: signalType,
        options: options,
      ),
    );
  }

  Future<RtcParticipantCredential?> issueParticipantCredential(
    String rtcSessionId,
    IssueRtcParticipantCredentialRequest body,
  ) {
    return context.transportClient.rtc.issueRtcParticipantCredential(
      rtcSessionId,
      body,
    );
  }

  Future<RtcRecordingArtifact?> getRecordingArtifact(String rtcSessionId) {
    return context.transportClient.rtc.getRtcRecordingArtifact(rtcSessionId);
  }
}
