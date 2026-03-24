using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class MessageEnvelope
    {
        public string? Type { get; set; }
        public TextMediaResource? Text { get; set; }
        public ImageMediaResource? Image { get; set; }
        public AudioMediaResource? Audio { get; set; }
        public VideoMediaResource? Video { get; set; }
        public FileMediaResource? File { get; set; }
        public LocationMediaResource? Location { get; set; }
        public CardMediaResource? Card { get; set; }
        public SystemContent? System { get; set; }
        public CustomContent? Custom { get; set; }
        public MusicMediaResource? Music { get; set; }
        public DocumentMediaResource? Document { get; set; }
        public CodeMediaResource? Code { get; set; }
        public PptMediaResource? Ppt { get; set; }
        public CharacterMediaResource? Character { get; set; }
        public Model3DMediaResource? Model3d { get; set; }
    }
}
