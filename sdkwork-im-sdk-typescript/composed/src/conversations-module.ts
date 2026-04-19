import { buildTextMessageRequest } from './builders.js';
import type {
  AddConversationMemberRequest,
  AgentHandoffStateView,
  ChangeConversationMemberRoleRequest,
  ChangeConversationMemberRoleResult,
  ConversationMember,
  ConversationReadCursorView,
  ConversationSummaryView,
  CreateAgentDialogRequest,
  CreateAgentHandoffRequest,
  CreateConversationRequest,
  CreateConversationResult,
  CreateSystemChannelRequest,
  ListMembersResponse,
  PostMessageRequest,
  PostMessageResult,
  PostTextMessageOptions,
  RemoveConversationMemberRequest,
  TimelineResponse,
  TransferConversationOwnerRequest,
  TransferConversationOwnerResult,
  UpdateReadCursorRequest,
} from './types.js';
import type { ImSdkContext } from './sdk-context.js';

export class ImConversationsModule {
  constructor(private readonly context: ImSdkContext) {}

  create(body: CreateConversationRequest): Promise<CreateConversationResult> {
    return this.context.transportClient.conversation.createConversation(body);
  }

  createAgentDialog(body: CreateAgentDialogRequest): Promise<CreateConversationResult> {
    return this.context.transportClient.conversation.createAgentDialog(body);
  }

  createAgentHandoff(
    body: CreateAgentHandoffRequest,
  ): Promise<CreateConversationResult> {
    return this.context.transportClient.conversation.createAgentHandoff(body);
  }

  createSystemChannel(
    body: CreateSystemChannelRequest,
  ): Promise<CreateConversationResult> {
    return this.context.transportClient.conversation.createSystemChannel(body);
  }

  get(conversationId: string | number): Promise<ConversationSummaryView> {
    return this.context.transportClient.conversation.getConversationSummary(
      conversationId,
    );
  }

  getAgentHandoffState(
    conversationId: string | number,
  ): Promise<AgentHandoffStateView> {
    return this.context.transportClient.conversation.getAgentHandoffState(
      conversationId,
    );
  }

  acceptAgentHandoff(
    conversationId: string | number,
  ): Promise<AgentHandoffStateView> {
    return this.context.transportClient.conversation.acceptAgentHandoff(
      conversationId,
    );
  }

  resolveAgentHandoff(
    conversationId: string | number,
  ): Promise<AgentHandoffStateView> {
    return this.context.transportClient.conversation.resolveAgentHandoff(
      conversationId,
    );
  }

  closeAgentHandoff(
    conversationId: string | number,
  ): Promise<AgentHandoffStateView> {
    return this.context.transportClient.conversation.closeAgentHandoff(
      conversationId,
    );
  }

  listMembers(conversationId: string | number): Promise<ListMembersResponse> {
    return this.context.transportClient.conversation.listConversationMembers(
      conversationId,
    );
  }

  addMember(
    conversationId: string | number,
    body: AddConversationMemberRequest,
  ): Promise<ConversationMember> {
    return this.context.transportClient.conversation.addConversationMember(
      conversationId,
      body,
    );
  }

  removeMember(
    conversationId: string | number,
    body: RemoveConversationMemberRequest,
  ): Promise<ConversationMember> {
    return this.context.transportClient.conversation.removeConversationMember(
      conversationId,
      body,
    );
  }

  transferOwner(
    conversationId: string | number,
    body: TransferConversationOwnerRequest,
  ): Promise<TransferConversationOwnerResult> {
    return this.context.transportClient.conversation.transferConversationOwner(
      conversationId,
      body,
    );
  }

  changeMemberRole(
    conversationId: string | number,
    body: ChangeConversationMemberRoleRequest,
  ): Promise<ChangeConversationMemberRoleResult> {
    return this.context.transportClient.conversation.changeConversationMemberRole(
      conversationId,
      body,
    );
  }

  leave(conversationId: string | number): Promise<ConversationMember> {
    return this.context.transportClient.conversation.leave(conversationId);
  }

  getReadCursor(
    conversationId: string | number,
  ): Promise<ConversationReadCursorView> {
    return this.context.transportClient.conversation.getConversationReadCursor(
      conversationId,
    );
  }

  updateReadCursor(
    conversationId: string | number,
    body: UpdateReadCursorRequest,
  ): Promise<ConversationReadCursorView> {
    return this.context.transportClient.conversation.updateConversationReadCursor(
      conversationId,
      body,
    );
  }

  listMessages(conversationId: string | number): Promise<TimelineResponse> {
    return this.context.transportClient.conversation.listConversationMessages(
      conversationId,
    );
  }

  postMessage(
    conversationId: string | number,
    body: PostMessageRequest,
  ): Promise<PostMessageResult> {
    return this.context.transportClient.conversation.postConversationMessage(
      conversationId,
      body,
    );
  }

  postText(
    conversationId: string | number,
    text: string,
    options: PostTextMessageOptions = {},
  ): Promise<PostMessageResult> {
    return this.postMessage(conversationId, buildTextMessageRequest(text, options));
  }

  publishSystemMessage(
    conversationId: string | number,
    body: PostMessageRequest,
  ): Promise<PostMessageResult> {
    return this.context.transportClient.conversation.publishSystemChannelMessage(
      conversationId,
      body,
    );
  }

  publishSystemText(
    conversationId: string | number,
    text: string,
    options: PostTextMessageOptions = {},
  ): Promise<PostMessageResult> {
    return this.publishSystemMessage(
      conversationId,
      buildTextMessageRequest(text, options),
    );
  }
}
