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

    return models.User.create(new_user_info);
};

module.exports.changePassword = (user, new_password) => {
    var hash = hash_password(new_password);
    user.password_hash = hash;
    return user.save();
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
        var editor_p = models.User.findOne({"where": {"username": username_editor}});

        editor_p.then((user_editor) => {
            var edited_p = models.User.findOne({"where": {"username": username_edited}});

            edited_p.then((user_edited) => {
                var editor_id = user_editor['id'];
                var edited_id = user_edited['id'];
                var editor_type = user_editor['user_type'];
                var edited_type = user_edited['user_type'];

                var can_edit = false;
                var can_edit_password = false;

                if(editor_id == edited_id ||
                        editor_type == 'Administrator' ||
                        editor_type == 'Moderator' && edited_type == 'User')
                {
                    can_edit = true;
                }

                if(editor_id == edited_id) {
                    can_edit_password = true;
                }

                resolve([can_edit, can_edit_password]);
            });
        });
    });
};
