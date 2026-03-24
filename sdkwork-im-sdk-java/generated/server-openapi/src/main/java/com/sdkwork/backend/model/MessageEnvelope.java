package com.sdkwork.backend.model;

public class MessageEnvelope {
    private String type;
    private TextMediaResource text;
    private ImageMediaResource image;
    private AudioMediaResource audio;
    private VideoMediaResource video;
    private FileMediaResource file;
    private LocationMediaResource location;
    private CardMediaResource card;
    private SystemContent system;
    private CustomContent custom;
    private MusicMediaResource music;
    private DocumentMediaResource document;
    private CodeMediaResource code;
    private PptMediaResource ppt;
    private CharacterMediaResource character;
    private Model3DMediaResource model3d;

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public TextMediaResource getText() {
        return this.text;
    }
    
    public void setText(TextMediaResource text) {
        this.text = text;
    }

    public ImageMediaResource getImage() {
        return this.image;
    }
    
    public void setImage(ImageMediaResource image) {
        this.image = image;
    }

    public AudioMediaResource getAudio() {
        return this.audio;
    }
    
    public void setAudio(AudioMediaResource audio) {
        this.audio = audio;
    }

    public VideoMediaResource getVideo() {
        return this.video;
    }
    
    public void setVideo(VideoMediaResource video) {
        this.video = video;
    }

    public FileMediaResource getFile() {
        return this.file;
    }
    
    public void setFile(FileMediaResource file) {
        this.file = file;
    }

    public LocationMediaResource getLocation() {
        return this.location;
    }
    
    public void setLocation(LocationMediaResource location) {
        this.location = location;
    }

    public CardMediaResource getCard() {
        return this.card;
    }
    
    public void setCard(CardMediaResource card) {
        this.card = card;
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

    public MusicMediaResource getMusic() {
        return this.music;
    }
    
    public void setMusic(MusicMediaResource music) {
        this.music = music;
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
}
