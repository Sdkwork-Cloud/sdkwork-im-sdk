import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'builders.dart';
import 'context.dart';
import 'types.dart';

class ImMessagesModule {
  final ImSdkContext context;

  ImMessagesModule(this.context);

  Future<MessageMutationResult?> edit(
    String messageId,
    EditMessageRequest body,
  ) {
    return context.transportClient.message.edit(messageId, body);
  }

  Future<MessageMutationResult?> editText(
    String messageId, {
    required String text,
    ImTextEditOptions options = const ImTextEditOptions(),
  }) {
    return edit(
      messageId,
      ImBuilders.textEdit(text: text, options: options),
    );
  }

  Future<MessageMutationResult?> recall(String messageId) {
    return context.transportClient.message.recall(messageId);
  }
}
