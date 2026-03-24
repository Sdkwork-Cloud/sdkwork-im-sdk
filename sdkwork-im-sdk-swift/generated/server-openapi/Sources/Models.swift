import Foundation

struct LoginDto: Codable {
    let username: String?
    let password: String?
    let deviceId: String?
}

struct IMConfigDto: Codable {
    let wsUrl: String?
    let uid: String?
    let token: String?
}

struct AuthResponseDto: Codable {
    let user: [String: Any]?
    let token: String?
    let refreshToken: String?
    let expiresIn: Double?
    let imConfig: IMConfigDto?
}

struct LogoutDto: Codable {
    let token: String?
    let refreshToken: String?
    let deviceId: String?
}

struct RefreshTokenDto: Codable {
    let refreshToken: String?
}

struct UpdatePasswordDto: Codable {
    let oldPassword: String?
    let newPassword: String?
}

struct ForgotPasswordDto: Codable {
    let email: String?
    let phone: String?
}

struct ForgotPasswordResponseDto: Codable {
    let success: Bool?
    let message: String?
    let error: String?
}

struct SendVerificationCodeDto: Codable {
    let email: String?
    let phone: String?
    let type: String?
}

struct VerifyVerificationCodeDto: Codable {
    let email: String?
    let phone: String?
    let code: String?
    let type: String?
}

struct RegisterDto: Codable {
    let username: String?
    let password: String?
    let nickname: String?
    let email: String?
    let phone: String?
    let code: String?
}

struct UpdateProfileDto: Codable {

}

struct SendFriendRequestDto: Codable {
    let toUserId: String?
    let message: String?
}

struct Contact: Codable {

}

struct ConversationEnvelope: Codable {
    let type: String?
    let targetId: String?
}

struct TextMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let text: String?
    let format: String?
    let mentions: [String]?
    let annotations: [String: Any]?
}

struct ImageMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let format: String?
    let width: Double?
    let height: Double?
    let splitImages: [ImageMediaResource]?
    let aspectRatio: String?
    let colorMode: String?
    let dpi: Double?
    let thumbnailUrl: String?
}

struct AudioMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let format: String?
    let duration: Double?
    let bitRate: String?
    let sampleRate: String?
    let channels: Double?
    let codec: String?
}

struct VideoMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let format: String?
    let duration: Double?
    let width: Double?
    let height: Double?
    let frameRate: Double?
    let bitRate: String?
    let codec: String?
    let thumbnailUrl: String?
    let coverUrl: String?
}

struct FileMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let hash: String?
    let path: String?
}

struct LocationMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let latitude: Double?
    let longitude: Double?
    let address: String?
    let thumbnailUrl: String?
    let mapUrl: String?
}

struct CardAction: Codable {
    let type: String?
    let url: String?
    let params: [String: Any]?
    let appId: String?
    let appPath: String?
}

struct CardButton: Codable {
    let text: String?
    let action: CardAction?
    let style: String?
    let color: String?
}

struct CardMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let cardType: String?
    let title: String?
    let thumbnailUrl: String?
    let sourceName: String?
    let sourceIcon: String?
    let targetUrl: String?
    let appId: String?
    let appPath: String?
    let appOriginalId: String?
    let appVersion: String?
    let packageName: String?
    let appDownloadUrl: String?
    let mainAction: CardAction?
    let buttons: [CardButton]?
    let extraData: [String: Any]?
    let tag: String?
    let status: String?
    let expireTime: String?
    let showSource: Bool?
}

struct SystemContent: Codable {
    let type: String?
    let data: [String: Any]?
}

struct CustomContent: Codable {
    let customType: String?
    let data: [String: Any]?
}

struct MusicMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let format: String?
    let duration: Double?
    let title: String?
    let artist: String?
    let album: String?
    let genre: String?
    let lyrics: String?
    let coverUrl: String?
    let year: Double?
}

struct DocumentMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let format: String?
    let pageCount: Double?
    let author: String?
    let title: String?
    let summary: String?
    let keywords: [String]?
    let contentText: String?
    let coverUrl: String?
    let version: String?
}

struct CodeMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let language: String?
    let code: String?
    let lineCount: Double?
    let comments: String?
    let dependencies: [String]?
    let license: String?
    let version: String?
    let author: String?
}

struct PptMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let format: String?
    let slideCount: Double?
    let theme: String?
    let author: String?
    let title: String?
    let notes: String?
    let slideThumbnails: [String]?
}

struct CharacterMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let characterType: String?
    let gender: String?
    let ageGroup: String?
    let avatarImage: ImageMediaResource?
    let avatarVideo: VideoMediaResource?
    let speakerId: String?
    let appearanceParams: [String: Any]?
    let animationParams: [String: Any]?
    let actions: [String]?
    let expressions: [String]?
    let voiceFeatures: [String: Any]?
}

struct Model3DMediaResource: Codable {
    let id: String?
    let uuid: String?
    let url: String?
    let bytes: [String]?
    let localFile: [String: Any]?
    let base64: String?
    let type: String?
    let mimeType: String?
    let size: Double?
    let name: String?
    let extension: String?
    let tags: [String: Any]?
    let metadata: [String: Any]?
    let prompt: String?
    let createdAt: String?
    let updatedAt: String?
    let creatorId: String?
    let description: String?
    let format: String?
    let vertexCount: Double?
    let faceCount: Double?
    let materialCount: Double?
    let boneCount: Double?
    let animationCount: Double?
    let boundingBox: [String: Any]?
    let previewUrl: String?
    let textureUrls: [String]?
}

struct MessageEnvelope: Codable {
    let type: String?
    let text: TextMediaResource?
    let image: ImageMediaResource?
    let audio: AudioMediaResource?
    let video: VideoMediaResource?
    let file: FileMediaResource?
    let location: LocationMediaResource?
    let card: CardMediaResource?
    let system: SystemContent?
    let custom: CustomContent?
    let music: MusicMediaResource?
    let document: DocumentMediaResource?
    let code: CodeMediaResource?
    let ppt: PptMediaResource?
    let character: CharacterMediaResource?
    let model3d: Model3DMediaResource?
}

struct EventContentTransport: Codable {
    let type: String?
    let name: String?
    let data: [String: Any]?
    let metadata: [String: Any]?
}

struct TextContent: Codable {
    let text: String?
    let mentions: [String]?
}

struct LocationContent: Codable {
    let latitude: Double?
    let longitude: Double?
    let address: String?
    let name: String?
    let thumbnailUrl: String?
}

struct CardContent: Codable {
    let userId: String?
    let nickname: String?
    let avatar: String?
    let signature: String?
}

struct EventContent: Codable {
    let type: String?
    let name: String?
    let data: [String: Any]?
    let metadata: [String: Any]?
}

struct MessageContent: Codable {
    let text: TextContent?
    let image: ImageMediaResource?
    let video: VideoMediaResource?
    let audio: AudioMediaResource?
    let music: MusicMediaResource?
    let file: FileMediaResource?
    let document: DocumentMediaResource?
    let code: CodeMediaResource?
    let ppt: PptMediaResource?
    let character: CharacterMediaResource?
    let model3d: Model3DMediaResource?
    let location: LocationContent?
    let card: CardContent?
    let cardResource: CardMediaResource?
    let system: SystemContent?
    let custom: CustomContent?
    let event: EventContent?
}

struct SendMessage: Codable {
    let version: Double?
    let conversation: ConversationEnvelope?
    let message: MessageEnvelope?
    let event: EventContentTransport?
    let uuid: String?
    let type: String?
    let content: MessageContent?
    let fromUserId: String?
    let toUserId: String?
    let groupId: String?
    let replyToId: String?
    let forwardFromId: String?
    let clientSeq: Double?
    let idempotencyKey: String?
    let extra: [String: Any]?
    let needReadReceipt: Bool?
}

struct BatchSendMessage: Codable {
    let messages: [SendMessage]?
}

struct AckConversationSeqRequest: Codable {
    let targetId: String?
    let type: String?
    let ackSeq: Double?
    let deviceId: String?
}

struct AckConversationSeqItemRequest: Codable {
    let targetId: String?
    let type: String?
    let ackSeq: Double?
}

struct AckConversationSeqBatchRequest: Codable {
    let items: [AckConversationSeqItemRequest]?
    let deviceId: String?
}

struct MessageUnreadMemberItemResponse: Codable {
    let userId: String?
    let role: String?
    let receiptStatus: String?
    let deliveredAt: String?
    let readAt: String?
}

struct MessageUnreadMembersResponse: Codable {
    let messageId: String?
    let groupId: String?
    let total: Double?
    let limit: Double?
    let offset: Double?
    let nextCursor: String?
    let items: [MessageUnreadMemberItemResponse]?
}

struct MessageReadMemberItemResponse: Codable {
    let userId: String?
    let role: String?
    let receiptStatus: String?
    let deliveredAt: String?
    let readAt: String?
}

struct MessageReadMembersResponse: Codable {
    let messageId: String?
    let groupId: String?
    let total: Double?
    let limit: Double?
    let offset: Double?
    let nextCursor: String?
    let items: [MessageReadMemberItemResponse]?
}

struct UpdateMessageStatus: Codable {
    let status: String?
}

struct EditMessage: Codable {
    let content: MessageContent?
    let extra: [String: Any]?
}

struct SetMessageReaction: Codable {
    let emoji: String?
    let active: Bool?
}

struct MarkMessagesRead: Codable {
    let messageIds: [String]?
}

struct ForwardMessage: Codable {
    let messageId: String?
    let toUserIds: [String]?
    let toGroupIds: [String]?
}

struct Group: Codable {

}

struct GroupMember: Codable {

}

struct GroupInvitation: Codable {

}

struct Conversation: Codable {

}

struct CreateRtcRoomDto: Codable {
    let type: String?
    let participants: [String]?
    let name: String?
    let channelId: String?
    let provider: String?
    let aiMetadata: [String: Any]?
}

struct RTCRoom: Codable {

}

struct RtcProviderOperationErrorDto: Codable {
    let statusCode: Double?
    let message: String?
    let provider: String?
    let operation: String?
    let providerStatusCode: Double?
    let providerErrorCode: String?
    let retryable: Bool?
    let providerMessage: String?
}

struct GenerateRtcTokenDto: Codable {
    let roomId: String?
    let userId: String?
    let channelId: String?
    let provider: String?
    let role: String?
    let expireSeconds: Double?
}

struct RTCToken: Codable {

}

struct ValidateRtcTokenDto: Codable {
    let token: String?
}

struct RtcTokenValidationResultDto: Codable {
    let valid: Bool?
    let roomId: String?
    let userId: String?
    let provider: String?
    let channelId: String?
    let role: String?
    let expiresAt: String?
}

struct AddRtcParticipantDto: Codable {
    let userId: String?
}

struct RtcProviderCapabilityDto: Codable {
    let provider: String?
    let configured: Bool?
    let channelId: String?
    let supportsRecording: Bool?
    let tokenStrategies: [String]?
    let supportsControlPlaneDelegate: Bool?
}

struct RtcProviderCapabilitiesResponseDto: Codable {
    let defaultProvider: String?
    let recommendedPrimary: String?
    let fallbackOrder: [String]?
    let activeProviders: [String]?
    let providers: [RtcProviderCapabilityDto]?
}

struct StartRtcRecordingDto: Codable {
    let taskId: String?
    let metadata: [String: Any]?
}

struct StopRtcRecordingDto: Codable {
    let recordId: String?
    let taskId: String?
    let metadata: [String: Any]?
}

struct CreateRtcVideoRecordDto: Codable {
    let roomId: String?
    let userId: String?
    let fileName: String?
    let filePath: String?
    let fileType: String?
    let fileSize: Double?
    let startTime: String?
    let endTime: String?
    let status: String?
    let metadata: [String: Any]?
}

struct UpdateRtcVideoRecordStatusDto: Codable {
    let status: String?
    let errorMessage: String?
}

struct UpdateRtcVideoRecordMetadataDto: Codable {
    let metadata: [String: Any]?
}

struct SyncRtcVideoRecordDto: Codable {
    let roomId: String?
    let taskId: String?
}

struct AgentConfig: Codable {
    let model: String?
    let temperature: Double?
    let maxTokens: Double?
    let systemPrompt: String?
    let welcomeMessage: String?
    let tools: [String]?
    let skills: [String]?
    let llm: [String: Any]?
}

struct CreateAgent: Codable {
    let name: String?
    let description: String?
    let avatar: String?
    let type: String?
    let config: AgentConfig?
    let isPublic: Bool?
}

struct UpdateAgent: Codable {
    let name: String?
    let description: String?
    let avatar: String?
    let type: String?
    let config: AgentConfig?
    let isPublic: Bool?
    let status: String?
}

struct CreateSession: Codable {
    let title: String?
}

struct SendAgentMessage: Codable {
    let content: String?
    let stream: Bool?
}

struct AddTool: Codable {
    let name: String?
    let description: String?
    let parameters: [String: Any]?
    let config: [String: Any]?
}

struct AddSkill: Codable {
    let skillId: String?
    let name: String?
    let description: String?
    let version: String?
    let config: [String: Any]?
}

struct StoreMemoryDto: Codable {
    let content: String?
    let type: String?
    let source: String?
    let sessionId: String?
    let metadata: [String: Any]?
}

struct AddKnowledgeDocumentDto: Codable {
    let title: String?
    let content: String?
    let description: String?
    let sourcePath: String?
    let sourceType: String?
    let metadata: [String: Any]?
}

struct CreateBotDto: Codable {

}

struct UpdateBotDto: Codable {

}

struct SetWebhookDto: Codable {

}

struct BotOpenStatsDto: Codable {
    let totalMessagesSent: Double?
    let totalMessagesReceived: Double?
    let totalUsersInteracted: Double?
    let totalGroupsJoined: Double?
    let totalCommandsExecuted: Double?
    let totalInteractions: Double?
    let lastActivityAt: String?
}

struct BotOpenProfileResponseDto: Codable {
    let id: String?
    let name: String?
    let username: String?
    let appId: String?
    let description: String?
    let avatar: String?
    let homepage: String?
    let developerName: String?
    let developerEmail: String?
    let intents: Double?
    let scopes: [String]?
    let status: String?
    let stats: BotOpenStatsDto?
    let createdAt: String?
    let updatedAt: String?
}

struct BotOpenWebhookStatsResponseDto: Codable {
    let configured: Bool?
    let url: String?
    let events: [String]?
    let pendingRetries: Double?
}

struct BotOpenWebhookTestEventRequestDto: Codable {
    let eventType: String?
    let data: [String: Any]?
}

struct BotOpenWebhookResultResponseDto: Codable {
    let success: Bool?
    let statusCode: Double?
    let error: String?
    let retryCount: Double?
    let latency: Double?
}

struct ThirdPartyMessage: Codable {

}

struct CrawRegisterRequestDto: Codable {
    let name: String?
    let description: String?
}

struct CrawRegisterAgentDataDto: Codable {
    let apiKey: String?
    let claimUrl: String?
    let verificationCode: String?
}

struct CrawRegisterResponseDto: Codable {
    let success: Bool?
    let agent: CrawRegisterAgentDataDto?
    let important: String?
    let error: String?
}

struct CrawAgentStatusResponseDto: Codable {
    let success: Bool?
    let status: String?
    let error: String?
}

struct CrawAgentOwnerDto: Codable {
    let xHandle: String?
    let xName: String?
    let xAvatar: String?
    let xBio: String?
    let xFollowerCount: Double?
    let xFollowingCount: Double?
    let xVerified: Bool?
}

struct CrawAgentDataDto: Codable {
    let name: String?
    let description: String?
    let karma: Double?
    let followerCount: Double?
    let followingCount: Double?
    let isClaimed: Bool?
    let isActive: Bool?
    let createdAt: String?
    let lastActive: String?
    let owner: CrawAgentOwnerDto?
}

struct CrawAgentMeResponseDto: Codable {
    let success: Bool?
    let agent: CrawAgentDataDto?
    let error: String?
}

struct CrawPostsResponseDto: Codable {
    let success: Bool?
    let posts: [[String: Any]]?
    let error: String?
}

struct CrawPostResponseDto: Codable {
    let success: Bool?
    let post: [String: Any]?
    let error: String?
}

struct TimelineMediaItemDto: Codable {
    let type: String?
    let url: String?
    let width: Double?
    let height: Double?
    let duration: Double?
    let coverUrl: String?
    let extra: [String: Any]?
}

struct CreateTimelinePostDto: Codable {
    let text: String?
    let media: [TimelineMediaItemDto]?
    let visibility: String?
    let customAudienceIds: [String]?
    let extra: [String: Any]?
}

struct ToggleTimelineLikeDto: Codable {
    let liked: Bool?
}

struct FriendControllerSendRequestResponse: Codable {

}

struct FriendControllerSendRequestResponse400: Codable {
    let code: Double?
    let message: String?
    let timestamp: Double?
    let requestId: String?
}

struct FriendControllerAcceptRequestResponse: Codable {

}

struct FriendControllerAcceptRequestResponse404: Codable {
    let code: Double?
    let message: String?
    let timestamp: Double?
    let requestId: String?
}

struct FriendControllerRejectRequestResponse: Codable {

}

struct FriendControllerCancelRequestResponse: Codable {

}

struct FriendControllerRemoveResponse: Codable {

}

struct FriendControllerGetRequestsResponse: Codable {

}

struct FriendControllerGetSentRequestsResponse: Codable {

}

struct FriendControllerGetResponse: Codable {

}

struct FriendControllerCheckFriendshipResponse: Codable {

}

struct FriendControllerBlockResponse: Codable {

}

struct FriendControllerUnblockResponse: Codable {

}

struct FriendControllerCheckBlockedResponse: Codable {

}

struct ContactControllerCreateRequest: Codable {
    let userId: String?
    let contactId: String?
    let type: String?
    let name: String?
    let remark: String?
    let tags: [String]?
}

struct ContactControllerGetByUserIdResponse: Codable {

}

struct ContactControllerUpdateRequest: Codable {
    let name: String?
    let remark: String?
    let tags: [String]?
    let isFavorite: Bool?
    let status: String?
}

struct ContactControllerBatchDeleteRequest: Codable {
    let ids: [String]?
}

struct ContactControllerSetFavoriteRequest: Codable {
    let isFavorite: Bool?
}

struct ContactControllerSetRemarkRequest: Codable {
    let remark: String?
}

struct ContactControllerAddTagRequest: Codable {
    let tag: String?
}

struct ContactControllerSearchResponse: Codable {

}

struct GroupControllerAddMemberRequest: Codable {
    let userId: String?
    let role: String?
}

struct GroupControllerGetMembersResponse: Codable {

}

struct GroupControllerUpdateMemberRoleRequest: Codable {
    let role: String?
}

struct GroupControllerGetByUserIdResponse: Codable {

}

struct GroupControllerSendInvitationRequest: Codable {
    let groupId: String?
    let inviterId: String?
    let inviteeId: String?
    let message: String?
}

struct GroupControllerAddToBlacklistRequest: Codable {
    let userId: String?
}

struct GroupControllerAddToWhitelistRequest: Codable {
    let userId: String?
}

struct GroupControllerQuitRequest: Codable {
    let userId: String?
}

struct GroupControllerUpdateAnnouncementRequest: Codable {
    let announcement: String?
}

struct GroupControllerSetMuteAllRequest: Codable {
    let muteAll: Bool?
}

struct GroupControllerMuteMemberRequest: Codable {
    let duration: Double?
}

struct GroupControllerTransferRequest: Codable {
    let newOwnerId: String?
}

struct ConversationControllerCreateRequest: Codable {
    let type: String?
    let targetId: String?
}

struct ConversationControllerGetByUserIdResponse: Codable {

}

struct ConversationControllerGetSyncStatesRequest: Codable {
    let conversations: [[String: Any]]?
    let deviceId: String?
}

struct ConversationControllerUpdateRequest: Codable {
    let isPinned: Bool?
    let isMuted: Bool?
}

struct ConversationControllerPinRequest: Codable {
    let isPinned: Bool?
}

struct ConversationControllerMuteRequest: Codable {
    let isMuted: Bool?
}

struct ConversationControllerBatchDeleteRequest: Codable {
    let ids: [String]?
}

struct RtcAppControllerGetRoomsByUserIdResponse: Codable {

}

struct AibotControllerCreateBotRequest: Codable {
    let name: String?
    let description: String?
    let type: String?
    let config: [String: Any]?
    let isActive: Bool?
}

struct AibotControllerUpdateBotRequest: Codable {
    let name: String?
    let description: String?
    let type: String?
    let config: [String: Any]?
    let isActive: Bool?
}

struct AibotControllerProcessMessageRequest: Codable {
    let userId: String?
    let message: String?
}
