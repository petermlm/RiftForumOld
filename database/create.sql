-- ----------------------------------------------------------------------------
-- User types and tables
-- ----------------------------------------------------------------------------

create type UserType as enum (
    'Administrator',
    'Moderator',
    'User');

create table Users (
    user_id       serial primary key,
    username      varchar(25) unique,
    password_hash text not null,
    password_salt text not null,
    signature     varchar(100),
    about         varchar(500),
    user_type     UserType,
    created       timestamp
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
