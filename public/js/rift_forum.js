var RiftForum = (function() {
    return {
        ready: function() {
            // Is it necessary to show bad login?
            if($.cookie("bad_login") != undefined) {
                this.showBadLogin();
                $.removeCookie("bad_login");
            }

            // Is there any edit?
            this.editButtons();
        },

        showBadLogin: function() {
            $(".nav_right_bad_loggin")
                .show()
                .delay(3000)
                .fadeOut(1000);
        },

        editButtons: function() {
            var about = $("#edit_user_info_about");
            if(about.length) {
                about.click(function() {
                    $("#user_info_about_text").hide();
                    $("#user_info_about_form").show();
                });

                $("#user_info_about_cancel").click(function() {
                    $("#user_info_about_text").show();
                    $("#user_info_about_form").hide();
                });
            }

            var signature = $("#edit_user_info_signature");
            if(signature.length) {
                signature.click(function() {
                    $("#user_info_signature_text").hide();
                    $("#user_info_signature_form").show();
                });

                $("#user_info_signature_cancel").click(function() {
                    $("#user_info_signature_text").show();
                    $("#user_info_signature_form").hide();
                });
            }
        }
    };
})();

RiftForum.bindTextFeedback(text_area, feedback, limit) {
}

$(document).ready(function() {
    RiftForum.ready();
});
