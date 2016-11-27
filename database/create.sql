drop table if exists Users cascade;
drop type if exists UserType cascade;

drop table if exists Topics cascade;
drop table if exists Messages cascade;

-- ----------------------------------------------------------------------------
-- User types and tables
-- ----------------------------------------------------------------------------

create type UserType as enum (
    'Administrator',
    'Moderator',
    'User');

create table Users (
    user_id   serial primary key,
    username  varchar(25) unique,
    password  varchar(25),
    signature varchar(100),
    about     varchar(500),
    user_type UserType
);

-- ----------------------------------------------------------------------------
-- Topics and Messages
-- ----------------------------------------------------------------------------

create table Topics (
    topic_id        serial primary key,
    user_id         integer not null,
    title           varchar(100),
    topic_timestamp timestamp
);

create table Messages (
    message_id        serial  primary key,
    topic_id          integer not null,
    user_id           integer not null,
    message           varchar(1100),
    message_timestamp timestamp,

    foreign key(topic_id) references Topics(topic_id),
    foreign key(user_id)  references Users(user_id)
);

-- ----------------------------------------------------------------------------
-- Insert default data
-- ----------------------------------------------------------------------------

insert into Users(
    username,
    password,
    signature,
    about,
    user_type)
values (
    'Root',
    'password',
    'This is my signature',
    'I''m the administrator',
    'Administrator'
),(
    'Mod',
    'password',
    'This is my signature too',
    'I''m the moderator',
    'Moderator'
),(
    'User',
    'password',
    'This is also my signature',
    'I''m the user',
    'User'
);

insert into Topics(title, user_id, topic_timestamp)
values
(
    'Test Topic',
    (select user_id from Users where Users.username = 'Root' limit 1),
    now()
), (
    'Test Topic 2',
    (select user_id from Users where Users.username = 'Mod' limit 1),
    now()
), (
    'Test Topic 3',
    (select user_id from Users where Users.username = 'User' limit 1),
    now()
), (
    'Test Topic 4',
    (select user_id from Users where Users.username = 'User' limit 1),
    now());

insert into Messages(topic_id, user_id, message, message_timestamp)
values
(
    (select topic_id from Topics limit 1),
    (select user_id from Users where Users.username = 'Root' limit 1),
    'This is a message.',
    now()
), (
    (select topic_id from Topics limit 1),
    (select user_id from Users where Users.username = 'Root' limit 1),
    'This is another message.',
    now()
), (
    (select topic_id from Topics limit 1 offset 1),
    (select user_id from Users where Users.username = 'User' limit 1),
    'Some message',
    now()
);
