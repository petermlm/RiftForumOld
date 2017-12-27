'use strict';

var users = require("../libs/users");

module.exports = {
    up: (queryInterface, Sequelize) => {
        var hash = users.hash_password('admin');

        return queryInterface.bulkInsert('Users', [{
            username:      'Admin',
            password_hash: hash,
            signature:     "The Administrator",
            about:         "I am the administrator.",
            user_type:     "Administrator",
            createdAt:     new Date(),
            updatedAt:     new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
