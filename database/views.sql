create view GetTopics as
select Topics.topic_id                 as "TopicId",
       Topics.title                    as "TopicTitle",
       MessagesCountPerTopic.count     as "TopicMessageCount",
       Users.username                  as "TopicAuthor",
       MessagesAuthorPerTopic.username as "TopicLastAuthor",
       to_char(Topics.topic_timestamp, 'DD Mon, YYYY HH:MI AM')
                                       as "TopicTimestamp",
       to_char(LastMessageTimestampPerTopic.timestamp, 'DD Mon, YYYY HH:MI AM')
                                       as "TopicLastTimestamp"
from
    -- Topics
    Topics
    inner join

    -- Users
    Users
    on Topics.user_id = Users.user_id
    inner join

    -- Messages Count per topic
    (
        select Messages.topic_id as topic_id,
               count(Messages.message_id) as count
        from Messages
        group by Messages.topic_id
    ) as MessagesCountPerTopic
    on Topics.topic_id = MessagesCountPerTopic.topic_id
    inner join

    -- Last message author per topic
    (
        select max_res.topic_id as topic_id,
               Users.username as username
        from
            Users inner join (
                select Messages.topic_id as topic_id,
                       Messages.message_id as message_id,
                       Messages.user_id as user_id,
                       Messages.message_timestamp as message_timestamp,
                       max(Messages.message_timestamp) over (
                        partition by Messages.topic_id) as max_res_p
                from Messages
            ) as max_res
            on Users.user_id = max_res.user_id
        where max_res.message_timestamp = max_res_p
    ) as MessagesAuthorPerTopic
    on Topics.topic_id = MessagesAuthorPerTopic.topic_id
    inner join

    -- Last message timestamp per topic
    (
        select Messages.topic_id as topic_id,
               max(Messages.message_timestamp) as timestamp
        from Messages
        group by Messages.topic_id
    ) as LastMessageTimestampPerTopic
    on Topics.topic_id = LastMessageTimestampPerTopic.topic_id
order by LastMessageTimestampPerTopic.timestamp desc;

create view GetMessages as
select Messages.message_id as "MessageId",
       Messages.topic_id   as "TopicId",
       Users.username      as "Username",
       Users.signature     as "Signature",
       Users.user_type     as "UserType",
       Messages.message    as "Message",
       to_char(Messages.message_timestamp, 'DD Mon, YYYY HH:MI AM')
            as "MessageTime"
from Messages inner join Users on Messages.user_id = Users.user_id
order by Messages.message_timestamp;
