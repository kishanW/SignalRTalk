﻿$(document).ready(function () {
    window.setupHub = function () {
        window.connection = window.connection || $.hubConnection();
        window.hubOne = window.hubOne || window.connection.createHubProxy('hubOne');
    };


    window.setupHub();
    window.connection.start();


    window.hubOne.on("ClientsListReceived", function(clients) {
        window.ShowClientList(clients);
    });




    window.setupHub = window.setupHub || {};
    window.RegisterClick = window.RegisterClick || {};
    window.GetClientInfo = window.GetClientInfo || {};
    window.ShowClientList = window.ShowClientList || {};
    window.ClientsList = [];

    


    window.RegisterClick = function (element) {
        var name = $("#name").val();
        var comment = $("#comment").val();
        var lng = "N/A";
        var lat = "N/A";

        $("#name").val("");
        $("#comment").val("");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;

                window.hubOne.invoke("RegisterClient", name, comment, lng, lat);
            });
        }
    };


    window.ShowClientList = function (clients) {
        console.log(clients);
        $("#registeredClients").html("");

        for (var i = 0; i < clients.length; i++) {
            var clientItem = $("<li></li>");
            var msg = $("<p><b>"+ clients[i].Name + "</b><br/> says: " + clients[i].Comment +"</p>");

            msg.text();
            clientItem.append(msg);
            var miniMap = "<iframe frameborder='0' class='minimap' src='http://maps.google.com/maps?q=" + clients[i].Lat + "," + clients[i].Lng + "&output=embed&iwloc=0' allowfullscreen></iframe>";
            clientItem.append(miniMap);

            

            $("#registeredClients").prepend(clientItem);
        }

    };
});

$(document).on("click", "#register", function() {
    window.RegisterClick($(this));
});