select * from Users;
select * from Topics;
select * from Messages;
select * from GetTopics;
select * from GetMessages where GetMessages."TopicId" = 1;
select * from CheckUser('Root', 'password');
select * from CheckUser('Root', 'none');

select canEdit('Root', 'Root');
select canEdit('Root', 'Mod');
select canEdit('Root', 'User');
select canEdit('Mod', 'Root');
select canEdit('Mod', 'Mod');
select canEdit('Mod', 'User');
select canEdit('User', 'Root');
select canEdit('User', 'Mod');
select canEdit('User', 'User');
