-- ----------------------------------------------------------------------------
-- New Topic
-- User Id
-- Title
-- Message

create function NewTopic(integer, varchar(100), varchar(1100))
returns integer as $$
declare
    ret integer;

begin
    with Topic as (
        insert into Topics(user_id, title, topic_timestamp)
        values($1, $2, now())
        returning topic_id
    )
    insert into Messages(topic_id, user_id, message, message_timestamp)
    values((select topic_id from Topic), $1, $3, now())
    returning topic_id into ret;

    return ret;
end
$$ language 'plpgsql';
