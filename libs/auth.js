var jwt = require("jsonwebtoken");

var config = require("./config");

function startSession(res, token_obj) {
    token = jwt.sign(token_obj, config.secret, config.expires);
    res.cookie("token", token);
}

function checkSession(req) {
    if(!("token" in req.cookies)) {
        return undefined;
    }

    var decoded = undefined;
    try {
        decoded = jwt.verify(req.cookies["token"], config.secret);
    } catch(err) {
        return undefined;
    }

    return decoded;
}

function endSession(res) {
    res.clearCookie("token");
};

module.exports = {
    startSession: startSession,
    checkSession: checkSession,
    endSession: endSession
};
