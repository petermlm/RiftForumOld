var jwt = require("jsonwebtoken");

var config = require("./config");

function makeJWT(user_id, username, user_type) {
    var token_obj = {
        "user_id":   user_id,
        "username":  username,
        "user_type": user_type
    };

    return jwt.sign(token_obj, config.secret, config.expires);
}

function startSession(res, user_id, username, user_type) {
    token = makeJWT(user_id, username, user_type);
    res.cookie("token", token);
}

function checkSession(req) {
    if(!("token" in req.cookies)) {
        return undefined;
    }

    try {
        return jwt.verify(req.cookies["token"], config.secret);
    } catch(err) {
        return undefined;
    }
}

function endSession(res) {
    res.clearCookie("token");
}

function setBadLoginCookie(res) {
    res.cookie("bad_login", true);
}

module.exports = {
    startSession: startSession,
    checkSession: checkSession,
    endSession: endSession,
    setBadLoginCookie: setBadLoginCookie
};
