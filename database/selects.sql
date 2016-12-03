select * from Users;
select * from Topics;
select * from Messages;
select * from GetTopics;
select * from GetMessages where GetMessages."TopicId" = 1;
select * from CheckUser('Root', 'password');
select * from CheckUser('Root', 'none');
