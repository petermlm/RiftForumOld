'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        var topics_bulk_insert = queryInterface.bulkInsert('Topics', [{
            title: "Initial Topic",
            createdAt:     new Date(),
            updatedAt:     new Date(),
            UserId: 1
        }], {});

        return new Promise((resolve, reject) => {
            topics_bulk_insert
                .then(() => {
                    queryInterface.bulkInsert('Messages', [{
                        message: "This is the initial Topic.",
                        createdAt:     new Date(),
                        updatedAt:     new Date(),
                        UserId: 1,
                        TopicId: 1
                    }], {}).then(arg => { resolve(arg); });
                })
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Topics', null, {});
    }
};
