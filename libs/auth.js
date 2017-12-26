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

function getAuthToken(user_id, username, user_type) {
    return makeJWT(user_id, username, user_type);
}

function startSession(res, user_id, username, user_type) {
    token = getAuthToken(user_id, username, user_type);
    res.cookie("token", token);
}

function checkToken(token) {
    return jwt.verify(token, config.secret);
}

function checkSession(req) {
    if(!("token" in req.cookies)) {
        return undefined;
    }

    try {
        return checkToken(req.cookies["token"]);
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
    getAuthToken: getAuthToken,
    startSession: startSession,
    checkToken:   checkToken,
    checkSession: checkSession,
    endSession: endSession,
    setBadLoginCookie: setBadLoginCookie
};
