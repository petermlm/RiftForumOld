var marked      = require("marked");
var escape_html = require("escape-html");

module.exports = {};

module.exports.formatOutput = (output) => {
    return marked(escape_html(output));
};
