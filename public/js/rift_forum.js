var RiftForum = (function() {
    return {
        ready: function() {
            if($.cookie("bad_login") != undefined) {
                this.showBadLogin();
                $.removeCookie("bad_login");
            }
        },

        showBadLogin: function() {
            $(".nav_right_bad_loggin")
                .show()
                .delay(3000)
                .fadeOut(1000);
        },

        rift: function() {
            console.log("RiftForum");
        }
    };
})();

$(document).ready(function() {
    RiftForum.ready();
});
