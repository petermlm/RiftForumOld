module.exports = function() {
    /*
     * States the current page for rendering processes
     */
    this.page = "";

    /*
     * States if the page should be rendered as if there was a logged in
     * user or not
     */
    this.login = false;

    /*
     * If the user is the administrator, this flag should be set to true
     */
    this.is_admin = false;

    /*
     * User information. If the user is not logged in, this object should
     * be {}. Else, the object should have the following fields:
     *
     *     {
     *         user_id: user_id,
     *         username: "username",
     *         user_type: "user_type",
     *     }
     */
    this.user = {};
};

module.exports.prototype.setPage = function(page) {
    this.page = page;
};

module.exports.prototype.setLoggedinUser = function(token_object) {
    this.login = true;

    if(token_object.user_type == "Administrator") {
        this.is_admin = true;
    }

    this.user = {
        user_type: token_object.user_type,
        username:  token_object.username,
        user_type: token_object.user_type
    }
};
