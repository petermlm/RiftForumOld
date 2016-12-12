var marked      = require("marked");
var escape_html = require("escape-html");

function formatOutput(output) {
    return marked(escape_html(output));
}

module.exports = {
    formatOutput: formatOutput
};
