function validateUsername(username_input) {
    var ur = /^[a-zA-Z0-9]{4,25}$/;
    return ur.test(username_input);
}

function validatePassword(password_input) {
    var password_regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return password_regex.test(password_input);
}

module.exports = {
    validateUsername: validateUsername,
    validatePassword: validatePassword
}
