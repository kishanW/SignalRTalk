using System;
using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using SignalRTalk.Models;

namespace SignalRTalk.Hubs
{
    public class HubOne : Hub
    {
        private static readonly List<ClientDataModel> ClientsList = new List<ClientDataModel>();

        public void RegisterClient(string name, string comment, string lng, string lat)
        {
            var client = new ClientDataModel
            {
                Name = name,
                Comment = comment,
                Lat = lat,
                Lng = lng,
                RegisteredTime = DateTime.Now
            };
            ClientsList.Add(client);
            SendClientLlist();
        }

        private void SendClientLlist()
        {
            Clients.All.ClientsListReceived(ClientsList);
        }
    }
}