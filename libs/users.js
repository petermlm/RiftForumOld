var bcrypt = require("bcrypt");

var models = require("../models");

function hash_password(password) {
    return bcrypt.hashSync(password, 10);
}

module.exports = {
    hash_password: hash_password
};

module.exports.createUser = (username, password) => {
    var hash = hash_password(password);

    var new_user_info = {
        "username":      username,
        "password_hash": hash,
        "signature":     "",
        "about":         "I am a RiftForum user.",
        "user_type":     "User"
    };

    models.User.create(new_user_info);
};

module.exports.checkUser = (username, password) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({"where": {"username": username}})
            .then((user) => {
                var hash = user["password_hash"];
                var correct = bcrypt.compareSync(password, hash);

                if(correct) {
                    resolve(user);
                } else {
                    reject("Wrong password");
                }
            })
            .catch(() => {
                reject("Username doesn't exist");
            });
    });
};

module.exports.canEdit = (username_editor, username_edited) => {
    return new Promise((resolve, reject) => {
        resolve(true); // Needs better rules
    });
};
