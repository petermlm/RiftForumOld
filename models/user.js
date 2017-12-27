/*
 * User Model
 *
 * Defines a single user and his information.
 */

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        "username":      {"type": DataTypes.STRING(50), "unique": true},
        "password_hash": {"type": DataTypes.STRING},
        "signature":     {"type": DataTypes.STRING(500)},
        "about":         {"type": DataTypes.STRING(500)},
        "user_type":     {"type": DataTypes.ENUM("Administrator", "Moderator", "User")}
    });

    User.associate = (models) => {
        User.hasMany(models.Topic);
        User.hasMany(models.Message);
    };

    return User;
};
