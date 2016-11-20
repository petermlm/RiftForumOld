var db = require("./db");

function getTopics(callback) {
    db.getTopics(
        function(data) {
            callback(data);
        },
        function(error) {
            console.log(error);
        });
}

module.exports = {
    getTopics: getTopics
};
