create view GetTopics as
select Topics.topic_id           as "TopicId",
       Topics.title              as "TopicTitle",
       MsgCount.count            as "TopicMessageCount",
       Users.username            as "TopicAuthor",
       TopicLast.TopicLastAuthor as "TopicLastAuthor",
       to_char(Topics.topic_timestamp, 'DD Mon, YYYY HH:MI AM')
            as "TopicTimestamp",
       to_char(TopicLast.TopicLastTimestamp, 'DD Mon, YYYY HH:MI AM')
            as "TopicLastTimestamp"
from
    Topics inner join Users on Topics.user_id = Users.user_id
    inner join
    (
        select Messages.topic_id as topic_id,
               Users.username as TopicLastAuthor,
               max(Messages.message_timestamp) as TopicLastTimestamp
        from Messages inner join Users on Messages.user_id = Users.user_id
        group by Messages.topic_id, Users.username
    ) as TopicLast
    on Topics.topic_id = TopicLast.topic_id
    inner join
    (
        select Messages.topic_id as topic_id,
               count(Messages.message_id) as count
        from Messages
        group by Messages.topic_id
    ) as MsgCount
    on Topics.topic_id = MsgCount.topic_id
order by TopicLast.TopicLastTimestamp desc;

create view GetMessages as
select Messages.message_id as "MessageId",
       Messages.topic_id   as "TopicId",
       Users.username      as "Username",
       Messages.message    as "Message",
       to_char(Messages.message_timestamp, 'DD Mon, YYYY HH:MI AM')
            as "MessageTime"
from Messages inner join Users on Messages.user_id = Users.user_id
order by Messages.message_timestamp;
