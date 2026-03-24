package com.sdkwork.backend.model;

public class MessageContent {
    private TextContent text;
    private ImageMediaResource image;
    private VideoMediaResource video;
    private AudioMediaResource audio;
    private MusicMediaResource music;
    private FileMediaResource file;
    private DocumentMediaResource document;
    private CodeMediaResource code;
    private PptMediaResource ppt;
    private CharacterMediaResource character;
    private Model3DMediaResource model3d;
    private LocationContent location;
    private CardContent card;
    private CardMediaResource cardResource;
    private SystemContent system;
    private CustomContent custom;
    private EventContent event;

    public TextContent getText() {
        return this.text;
    }
    
    public void setText(TextContent text) {
        this.text = text;
    }

    public ImageMediaResource getImage() {
        return this.image;
    }
    
    public void setImage(ImageMediaResource image) {
        this.image = image;
    }

    public VideoMediaResource getVideo() {
        return this.video;
    }
    
    public void setVideo(VideoMediaResource video) {
        this.video = video;
    }

    public AudioMediaResource getAudio() {
        return this.audio;
    }
    
    public void setAudio(AudioMediaResource audio) {
        this.audio = audio;
    }

    public MusicMediaResource getMusic() {
        return this.music;
    }
    
    public void setMusic(MusicMediaResource music) {
        this.music = music;
    }

    public FileMediaResource getFile() {
        return this.file;
    }
    
    public void setFile(FileMediaResource file) {
        this.file = file;
    }

    public DocumentMediaResource getDocument() {
        return this.document;
    }
    
    public void setDocument(DocumentMediaResource document) {
        this.document = document;
    }

    public CodeMediaResource getCode() {
        return this.code;
    }
    
    public void setCode(CodeMediaResource code) {
        this.code = code;
    }

    public PptMediaResource getPpt() {
        return this.ppt;
    }
    
    public void setPpt(PptMediaResource ppt) {
        this.ppt = ppt;
    }

    public CharacterMediaResource getCharacter() {
        return this.character;
    }
    
    public void setCharacter(CharacterMediaResource character) {
        this.character = character;
    }

    public Model3DMediaResource getModel3d() {
        return this.model3d;
    }
    
    public void setModel3d(Model3DMediaResource model3d) {
        this.model3d = model3d;
    }

    public LocationContent getLocation() {
        return this.location;
    }
    
    public void setLocation(LocationContent location) {
        this.location = location;
    }

    public CardContent getCard() {
        return this.card;
    }
    
    public void setCard(CardContent card) {
        this.card = card;
    }

    public CardMediaResource getCardResource() {
        return this.cardResource;
    }
    
    public void setCardResource(CardMediaResource cardResource) {
        this.cardResource = cardResource;
    }

    public SystemContent getSystem() {
        return this.system;
    }
    
    public void setSystem(SystemContent system) {
        this.system = system;
    }

    public CustomContent getCustom() {
        return this.custom;
    }
    
    public void setCustom(CustomContent custom) {
        this.custom = custom;
    }

    public EventContent getEvent() {
        return this.event;
    }
    
    public void setEvent(EventContent event) {
        this.event = event;
    }
}
