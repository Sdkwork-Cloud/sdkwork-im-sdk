using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class MessageContent
    {
        public TextContent? Text { get; set; }
        public ImageMediaResource? Image { get; set; }
        public VideoMediaResource? Video { get; set; }
        public AudioMediaResource? Audio { get; set; }
        public MusicMediaResource? Music { get; set; }
        public FileMediaResource? File { get; set; }
        public DocumentMediaResource? Document { get; set; }
        public CodeMediaResource? Code { get; set; }
        public PptMediaResource? Ppt { get; set; }
        public CharacterMediaResource? Character { get; set; }
        public Model3DMediaResource? Model3d { get; set; }
        public LocationContent? Location { get; set; }
        public CardContent? Card { get; set; }
        public CardMediaResource? CardResource { get; set; }
        public SystemContent? System { get; set; }
        public CustomContent? Custom { get; set; }
        public EventContent? Event { get; set; }
    }
}
