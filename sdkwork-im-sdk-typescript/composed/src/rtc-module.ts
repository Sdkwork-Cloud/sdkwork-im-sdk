import { buildJsonRtcSignalRequest } from './builders.js';
import type {
  CreateRtcSessionRequest,
  InviteRtcSessionRequest,
  IssueRtcParticipantCredentialRequest,
  PostJsonRtcSignalOptions,
  PostRtcSignalRequest,
  RtcParticipantCredential,
  RtcRecordingArtifact,
  RtcSession,
  RtcSignalEvent,
  UpdateRtcSessionRequest,
} from './types.js';
import type { ImSdkContext } from './sdk-context.js';

export class ImRtcModule {
  constructor(private readonly context: ImSdkContext) {}

  create(body: CreateRtcSessionRequest): Promise<RtcSession> {
    return this.context.transportClient.rtc.createRtcSession(body);
  }

  invite(
    rtcSessionId: string | number,
    body: InviteRtcSessionRequest,
  ): Promise<RtcSession> {
    return this.context.transportClient.rtc.inviteRtcSession(rtcSessionId, body);
  }

  accept(
    rtcSessionId: string | number,
    body: UpdateRtcSessionRequest,
  ): Promise<RtcSession> {
    return this.context.transportClient.rtc.acceptRtcSession(rtcSessionId, body);
  }

  reject(
    rtcSessionId: string | number,
    body: UpdateRtcSessionRequest,
  ): Promise<RtcSession> {
    return this.context.transportClient.rtc.rejectRtcSession(rtcSessionId, body);
  }

  end(
    rtcSessionId: string | number,
    body: UpdateRtcSessionRequest,
  ): Promise<RtcSession> {
    return this.context.transportClient.rtc.endRtcSession(rtcSessionId, body);
  }

  postSignal(
    rtcSessionId: string | number,
    body: PostRtcSignalRequest,
  ): Promise<RtcSignalEvent> {
    return this.context.transportClient.rtc.postRtcSignal(rtcSessionId, body);
  }

  postJsonSignal(
    rtcSessionId: string | number,
    signalType: string,
    options: PostJsonRtcSignalOptions,
  ): Promise<RtcSignalEvent> {
    return this.postSignal(
      rtcSessionId,
      buildJsonRtcSignalRequest(signalType, options),
    );
  }

  issueParticipantCredential(
    rtcSessionId: string | number,
    body: IssueRtcParticipantCredentialRequest,
  ): Promise<RtcParticipantCredential> {
    return this.context.transportClient.rtc.issueRtcParticipantCredential(
      rtcSessionId,
      body,
    );
  }

  getRecordingArtifact(
    rtcSessionId: string | number,
  ): Promise<RtcRecordingArtifact> {
    return this.context.transportClient.rtc.getRtcRecordingArtifact(rtcSessionId);
  }
}
