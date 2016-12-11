function newLines2HTML(new_lines) {
    return new_lines.replace(/\r\n/g, "<br />");
}

module.exports = {
    newLines2HTML: newLines2HTML
};
