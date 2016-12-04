var RiftForum = (function() {
    return {
        ready: function() {
        },

        showBadLogin: function() {
            $(".nav_right_bad_loggin")
                .show()
                .delay(1000)
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
