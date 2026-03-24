package com.sdkwork.backend.model;

public class SendMessage {
    private Double version;
    private ConversationEnvelope conversation;
    private MessageEnvelope message;
    private EventContentTransport event;
    private String uuid;
    private String type;
    private MessageContent content;
    private String fromUserId;
    private String toUserId;
    private String groupId;
    private String replyToId;
    private String forwardFromId;
    private Double clientSeq;
    private String idempotencyKey;
    private Map<String, Object> extra;
    private Boolean needReadReceipt;

    public Double getVersion() {
        return this.version;
    }
    
    public void setVersion(Double version) {
        this.version = version;
    }

    public ConversationEnvelope getConversation() {
        return this.conversation;
    }
    
    public void setConversation(ConversationEnvelope conversation) {
        this.conversation = conversation;
    }

    public MessageEnvelope getMessage() {
        return this.message;
    }
    
    public void setMessage(MessageEnvelope message) {
        this.message = message;
    }

    public EventContentTransport getEvent() {
        return this.event;
    }
    
    public void setEvent(EventContentTransport event) {
        this.event = event;
    }

    public String getUuid() {
        return this.uuid;
    }
    
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public MessageContent getContent() {
        return this.content;
    }
    
    public void setContent(MessageContent content) {
        this.content = content;
    }

    public String getFromUserId() {
        return this.fromUserId;
    }
    
    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getToUserId() {
        return this.toUserId;
    }
    
    public void setToUserId(String toUserId) {
        this.toUserId = toUserId;
    }

    public String getGroupId() {
        return this.groupId;
    }
    
    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getReplyToId() {
        return this.replyToId;
    }
    
    public void setReplyToId(String replyToId) {
        this.replyToId = replyToId;
    }

    public String getForwardFromId() {
        return this.forwardFromId;
    }
    
    public void setForwardFromId(String forwardFromId) {
        this.forwardFromId = forwardFromId;
    }

    public Double getClientSeq() {
        return this.clientSeq;
    }
    
    public void setClientSeq(Double clientSeq) {
        this.clientSeq = clientSeq;
    }

    public String getIdempotencyKey() {
        return this.idempotencyKey;
    }
    
    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }

    public Map<String, Object> getExtra() {
        return this.extra;
    }
    
    public void setExtra(Map<String, Object> extra) {
        this.extra = extra;
    }

    public Boolean getNeedReadReceipt() {
        return this.needReadReceipt;
    }
    
    public void setNeedReadReceipt(Boolean needReadReceipt) {
        this.needReadReceipt = needReadReceipt;
    }
}
