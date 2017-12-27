/*
 * Topic Model
 *
 * Defined a topic. A Topic only has a title and belongs to a user
 */

module.exports = (sequelize, DataTypes) => {
    var Topic = sequelize.define("Topic", {
        "title": {"type": DataTypes.STRING(100)}
    });

    Topic.associate = (models) => {
        Topic.belongsTo(models.User);
        Topic.hasMany(models.Message);
    };

    return Topic;
};
