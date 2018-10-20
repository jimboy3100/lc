var state = {
    nickname: null,
    server: null,
    tag: null
};

function getState()
{
    var nickname = document.getElementById("nick");
    if (nickname)
        state.nickname = nickname.value;
    else
        state.nickname = null;


    var clantag = document.getElementById("clantag");
    if (clantag)
        state.tag = clantag.value;
    else
        state.tag = null;

    var server = document.getElementById("nick");
    if (server)
        state.server = server.value;
    else
        state.server = null;

    return state;
}
