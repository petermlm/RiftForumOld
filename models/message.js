/*
 * Message Model
 */

module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        'message': {'type': DataTypes.STRING(10000)}
    });

    Message.associate = (models) => {
        Message.belongsTo(models.User);
        Message.belongsTo(models.Topic);
    };

    return Message;
};
