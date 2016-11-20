function newRenderArgs() {
    return {
        "page":  "index",
        "login": false,
        "user":  {}
    };
}

function setPage(render_args, page) {
    render_args["page"] = page;
}

function setLogin(render_args, login) {
    render_args["login"] = login;
}

function setUser(render_args, user) {
    render_args["user"] = user;
}

module.exports = {
    newRenderArgs: newRenderArgs,
    setPage: setPage,
    setLogin: setLogin,
    setUser:  setUser
};
