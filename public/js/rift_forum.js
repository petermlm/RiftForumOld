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

            // Keep char numbers
            this.keepCharNumbersTopics();
            this.keepCharNumbersMessages();

            // Register
            this.register();

            // Invite button
            this.inviteButton();
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

            var edit = $(".message_list_edit_bnt");
            if(edit.length) {
                var self = this;
                edit.each(function(index, element) {
                    $(element).on("click", "a", function(event) {
                        var message_id = event.delegateTarget.dataset["messageId"];
                        self.setupEditing(message_id);
                        event.preventDefault();
                    });
                });

                $("#new_message form button[name=clear]").click(function(event) {
                    self.endEditing();
                    event.preventDefault();
                });
            }
        },

        setupEditing: function(message_id) {
            var self = this;

            var route = "/topics/messages/" + message_id;
            $.ajax({
                'url': route,
                'method': 'GET',
                'timeout': 1000,
                'success': function(ret) {
                    self.startEditing(ret, message_id);
                },
                'error': function(error) {
                    console.error(error);
                }
            });
        },

        startEditing: function(ret, message_id) {
            var form_method = $("#new_message form input[name=method]");
            var form_message_id = $("#new_message form input[name=message_id]");
            var form_text = $("#new_message form textarea");
            var form_clear = $("#new_message form button[name=clear]");

            form_method.val("put")
            form_message_id.val(message_id);
            form_text.val(ret);
            form_clear.show();
            form_text.change();
        },

        endEditing: function() {
            var form_method = $("#new_message form input[name=method]");
            var form_message_id = $("#new_message form input[name=message_id]");
            var form_text = $("#new_message form textarea");
            var form_clear = $("#new_message form button[name=clear]");

            form_method.val("post")
            form_message_id.val("");
            form_text.val("");
            form_clear.hide();
            form_text.change();
        },

        keepCharNumbersTopics: function() {
            var elements = {
                text_area: $(".new_topic_forum form textarea[name=message]"),
                submit: $(".new_topic_forum form button[name=submit]"),
                text_feedback: $("#text_feedback"),
                text_feedback_val: $("#text_feedback_val")
            }

            if(!elements.text_area) {
                return;
            }

            this.keepCharNumbers(elements);
        },

        keepCharNumbersMessages: function() {
            var elements = {
                text_area: $(".new_message form textarea[name=message]"),
                submit: $(".new_message form button[name=post]"),
                text_feedback: $("#text_feedback"),
                text_feedback_val: $("#text_feedback_val")
            }

            if(!elements.text_area) {
                return;
            }

            this.keepCharNumbers(elements);
        },

        keepCharNumbers: function(elements) {
            var self = this;
            elements.text_area.keyup(function() { self.updateCharNumbers(elements); });
            elements.text_area.keydown(function() { self.updateCharNumbers(elements); });
            elements.text_area.keypress(function() { self.updateCharNumbers(elements); });
            elements.text_area.change(function() { self.updateCharNumbers(elements); });
        },

        updateCharNumbers: function(elements) {
            var text_length = elements.text_area.val().length;

            if(text_length > 500) {
                elements.submit.attr("disabled", true);
                elements.text_feedback.addClass("text-danger");
                elements.text_feedback.removeClass("text_feedback_normal");
            } else {
                elements.submit.attr("disabled", false);
                elements.text_feedback.removeClass("text-danger");
                elements.text_feedback.addClass("text_feedback_normal");
            }

            elements.text_feedback_val.text(text_length);
        },

        register: function() {
            var invite_input = $(".register-container form input[name=invite_key]");

            if(!invite_input) {
                return;
            }

            var query_string = window.location.search.substring(1);
            var key_values = query_string.split("&");

            key_values.forEach(function(key_value) {
                var key = key_value.split("=")[0];
                var value = key_value.split("=")[1];

                if(key == "key") {
                    invite_input.val(value);
                    return;
                }
            });
        },

        inviteButton: function() {
            var invite_button = $("#invite_button");
            var clear_invites_button = $("#clear_invites_button");

            if(!invite_button) {
                return;
            }

            var self = this;
            invite_button.click(function() {
                $.ajax({
                    'url': '/admin/invites',
                    // 'data': '',
                    // 'contentType': 'application/json',
                    'method': 'POST',
                    'timeout': 1000,
                    'success': function(ret) {
                        self.display_invite(ret);
                    },
                    'error': function(error) {
                        window.location = "/500";
                    }
                });
            });

            clear_invites_button.click(function() {
                $.ajax({
                    'url': '/admin/invites',
                    'method': 'delete',
                });
            });
        },

        display_invite: function(js) {
            var invite_key = $("#invite_key");
            var invite_url = $("#invite_url");

            var invite_url_text = window.location.origin + "/register?key=" + js["key"];

            invite_key.val(js["key"]);
            invite_url.val(invite_url_text);
        }
    };
})();

$(document).ready(function() {
    RiftForum.ready();
});
