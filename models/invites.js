/*
 * Invites Model
 *
 * Defines an invite that can be sent to a user so he can use it to register
 * himself.
 */

module.exports = (sequelize, DataTypes) => {
    var Invite = sequelize.define("Invite", {
        "key": {"type": DataTypes.STRING},
        "used": {"type": DataTypes.BOOLEAN}
    });

    return Invite;
};
