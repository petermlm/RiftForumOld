select CreateUser('Root',
                  'password',
                  'This is my signature',
                  'I''m the administrator',
                  'Administrator');

select CreateUser('Mod',
                  'password',
                  'This is my signature too',
                  'I''m the moderator',
                  'Moderator');

select CreateUser('User',
                  'password',
                  'This is also my signature',
                  'I''m the user',
                  'User');

select NewTopic(
    (select user_id from Users where Users.username = 'Root' limit 1),
    'Test Topic 1',
    'Test Message 1');

select NewTopic(
    (select user_id from Users where Users.username = 'Mod' limit 1),
    'Test Topic 2',
    'Test Message 2');

select NewTopic(
    (select user_id from Users where Users.username = 'User' limit 1),
    'Test Topic 3',
    'Test Message 3');

insert into Messages(topic_id, user_id, message, message_timestamp)
values(
    (select topic_id from Topics limit 1),
    (select user_id from Users where Users.username = 'Mod' limit 1),
    'Message 2',
    now());

insert into Messages(topic_id, user_id, message, message_timestamp)
values(
    (select topic_id from Topics limit 1),
    (select user_id from Users where Users.username = 'Root' limit 1),
    'Message 3',
    now());

insert into Messages(topic_id, user_id, message, message_timestamp)
values(
    (select topic_id from Topics limit 1),
    (select user_id from Users where Users.username = 'User' limit 1),
    'Message 4',
    now());

-- insert into Messages(topic_id, user_id, message, message_timestamp)
-- values
-- (
--     (select topic_id from Topics limit 1),
--     (select user_id from Users where Users.username = 'Root' limit 1),
--     'This is a message.',
--     now()
-- ), (
--     (select topic_id from Topics limit 1),
--     (select user_id from Users where Users.username = 'Root' limit 1),
--     'This is another message.',
--     now()
-- ), (
--     (select topic_id from Topics limit 1 offset 1),
--     (select user_id from Users where Users.username = 'User' limit 1),
--     'Some message',
--     now()
-- );
