var state = {
    nickname: null,
    server: null,
    tag: null
};

var ws = null;

function getState()
{
    if (!state.nickname)
        initLc();

    return state;
}

var updateServerDetails = function()
{
    console.log("Details have changed");
    console.log(state);

    ws.send(JSON.stringify({
        type: "update_details",
        data: state
    }));
}

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
        updateServerDetails();
    });

    server.addEventListener("change", function(e){
        state.nickname = server.value;
        updateServerDetails();
    });

    tag.addEventListener("change", function(e){
        state.nickname = tag.value;
        updateServerDetails();
    });

    reconnectButton.addEventListener("click", function(e){
        setTimeout(function()
        {
            state.nickname = server.value;
            updateServerDetails();
        }, 5000);
    });

    ws = new WebSocket("ws://127.0.0.1:3050/");
    ws.onopen = updateServerDetails;
};

window.addEventListener("load", initLc);

