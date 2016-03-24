using System;

namespace SignalRTalk.Models
{
    public class ClientDataModel
    {
        public string Name { get; set; }
        public string Comment { get; set; }
        public string Lng{ get; set; }
        public string Lat { get; set; }
        public DateTime RegisteredTime { get; set; }
    }
}