import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'builders.dart';
import 'context.dart';
import 'types.dart';

class ImConversationsModule {
  final ImSdkContext context;

  ImConversationsModule(this.context);

  Future<CreateConversationResult?> create(CreateConversationRequest body) {
    return context.transportClient.conversation.createConversation(body);
  }

  Future<CreateConversationResult?> createAgentDialog(
    CreateAgentDialogRequest body,
  ) {
    return context.transportClient.conversation.createAgentDialog(body);
  }

  Future<CreateConversationResult?> createAgentHandoff(
    CreateAgentHandoffRequest body,
  ) {
    return context.transportClient.conversation.createAgentHandoff(body);
  }

  Future<CreateConversationResult?> createSystemChannel(
    CreateSystemChannelRequest body,
  ) {
    return context.transportClient.conversation.createSystemChannel(body);
  }

  Future<ConversationSummaryView?> get(String conversationId) {
    return context.transportClient.conversation.getConversationSummary(conversationId);
  }

  Future<AgentHandoffStateView?> getAgentHandoffState(String conversationId) {
    return context.transportClient.conversation.getAgentHandoffState(conversationId);
  }

  Future<AgentHandoffStateView?> acceptAgentHandoff(String conversationId) {
    return context.transportClient.conversation.acceptAgentHandoff(conversationId);
  }

  Future<AgentHandoffStateView?> resolveAgentHandoff(String conversationId) {
    return context.transportClient.conversation.resolveAgentHandoff(conversationId);
  }

  Future<AgentHandoffStateView?> closeAgentHandoff(String conversationId) {
    return context.transportClient.conversation.closeAgentHandoff(conversationId);
  }

  Future<ListMembersResponse?> listMembers(String conversationId) {
    return context.transportClient.conversation.listConversationMembers(conversationId);
  }

  Future<ConversationMember?> addMember(
    String conversationId,
    AddConversationMemberRequest body,
  ) {
    return context.transportClient.conversation.addConversationMember(
      conversationId,
      body,
    );
  }

  Future<ConversationMember?> removeMember(
    String conversationId,
    RemoveConversationMemberRequest body,
  ) {
    return context.transportClient.conversation.removeConversationMember(
      conversationId,
      body,
    );
  }

  Future<TransferConversationOwnerResult?> transferOwner(
    String conversationId,
    TransferConversationOwnerRequest body,
  ) {
    return context.transportClient.conversation.transferConversationOwner(
      conversationId,
      body,
    );
  }

  Future<ChangeConversationMemberRoleResult?> changeMemberRole(
    String conversationId,
    ChangeConversationMemberRoleRequest body,
  ) {
    return context.transportClient.conversation.changeConversationMemberRole(
      conversationId,
      body,
    );
  }

  Future<ConversationMember?> leave(String conversationId) {
    return context.transportClient.conversation.leave(conversationId);
  }

  Future<ConversationReadCursorView?> getReadCursor(String conversationId) {
    return context.transportClient.conversation.getConversationReadCursor(
      conversationId,
    );
  }

  Future<ConversationReadCursorView?> updateReadCursor(
    String conversationId,
    UpdateReadCursorRequest body,
  ) {
    return context.transportClient.conversation.updateConversationReadCursor(
      conversationId,
      body,
    );
  }

  Future<TimelineResponse?> listMessages(String conversationId) {
    return context.transportClient.conversation.listConversationMessages(
      conversationId,
    );
  }

  Future<PostMessageResult?> postMessage(
    String conversationId,
    PostMessageRequest body,
  ) {
    return context.transportClient.conversation.postConversationMessage(
      conversationId,
      body,
    );
  }

  Future<PostMessageResult?> postText(
    String conversationId, {
    required String text,
    ImTextMessageOptions options = const ImTextMessageOptions(),
  }) {
    return postMessage(
      conversationId,
      ImBuilders.textMessage(text: text, options: options),
    );
  }

  Future<PostMessageResult?> publishSystemMessage(
    String conversationId,
    PostMessageRequest body,
  ) {
    return context.transportClient.conversation.publishSystemChannelMessage(
      conversationId,
      body,
    );
  }

  Future<PostMessageResult?> publishSystemText(
    String conversationId, {
    required String text,
    ImTextMessageOptions options = const ImTextMessageOptions(),
  }) {
    return publishSystemMessage(
      conversationId,
      ImBuilders.textMessage(text: text, options: options),
    );
  }
}
