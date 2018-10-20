var state = {
    nickname: null,
    server: null,
    tag: null
};

var socket = {
    server: "ws://127.0.0.1:3050/",
    client: null,
    connect: function()
    {
        socket.client = new WebSocket(socket.server);
        socket.client.onopen = socket.updateServerDetails;
        socket.client.onclose = socket.reconnect;
    },
    reconnect: function()
    {
        setTimeout(function(){
            socket.connect();
        }, 5000);
    },
    updateServerDetails: function()
    {
        console.log("Details have changed");
        console.log(state);

        socket.client.send(JSON.stringify({
            type: "update_details",
            data: state
        }));
    }
};

function getState()
{
    if (!state.nickname)
        initLc();

    return state;
}

var reconnectTimer = null;

var initLc = function()
{
    var nick = document.getElementById("nick");
    var server = document.getElementById("server");
    var tag = document.getElementById("clantag");
    var reconnectButton = document.getElementById("server-reconnect");

    if (!nick)
    {
        console.log("Could not initialize Lc");
        return;
    }

    state.nickname = nick.value;
    state.server = server.value;
    state.tag = tag.value;

    nick.addEventListener("change", function(e){
        state.nickname = nick.value;
        socket.updateServerDetails();
    });

    server.addEventListener("change", function(e){
        state.nickname = server.value;
        socket.updateServerDetails();
    });

    tag.addEventListener("change", function(e){
        state.nickname = tag.value;
        socket.updateServerDetails();
    });

    reconnectButton.addEventListener("click", function(e)
    {
        clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(function()
        {
            state.nickname = server.value;
            socket.updateServerDetails();
        }, 5000);
    });

    socket.connect();
};

window.addEventListener("load", initLc);

