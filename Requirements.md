# Routes

    HTML - GET  / - Same as "GET /topics"

    HTML - GET  /users           - Gets list of users
    JSON - POST /users           - Creates a user
    HTML - GET  /users/:username - Get user details
    JSON - PUT  /users/:username - Updates user info

    HTML - GET  /topics           - Gets list of topics
    JSON - POST /topics           - Creates a topic with one initial message
    HTML - GET  /topics/:topic_id - Get every message of topic

    JSON - POST /topics/:topic_id             - Create a new message in the topic
    JSON - PUT  /topics/:topic_id/:message_id - Edits message

    RAW  - GET  /login  - Creates jwt token for user, starting a session. Redirects to "/"
    RAW  - GET  /logout - Ends a session. Redirects to "/"

# Pages

 * Index - Shows board. May have login button
 * Topic - Shows a topic
 * Users - Shows users list (Only if user is logged in)
 * User  - Shows user information

# User

Users must be able to create account (No email verification).

Users must be able to login and logout.

Users must be able to see their information and edit it.

Users must be able to create a new topic and reply to existing ones.

# User Details

The user details must be only available to users which have logged in.

User details may only be editable by the user itself, the moderators, or the
administrator.

# Topic

Topics must be displayed in a list sorted by the timestamp of their last
message.

The topic list must display the following:

 * The title of the topic
 * Author of topic
 * Author of last message
 * Timestamp of creation of topic
 * Timestamp of last message

# Message

A message can only be edited by the user who created it, moderators, and
administrator.

Only the text can be edited.

A message must display the username of the author, the timestamp of creation,
and the text.
