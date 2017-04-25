-- ----------------------------------------------------------------------------
-- Tables, Types
-- ----------------------------------------------------------------------------

drop table if exists Users cascade;
drop type if exists UserType cascade;

drop table if exists Topics cascade;
drop table if exists Messages cascade;

-- ----------------------------------------------------------------------------
-- Views
-- ----------------------------------------------------------------------------

drop view if exists GetTopics cascade;
drop view if exists GetMessages cascade;
drop view if exists GetUsers cascade;

-- ----------------------------------------------------------------------------
-- Auth
-- ----------------------------------------------------------------------------

drop function if exists CreateUser(
    varchar(25),
    varchar(25),
    varchar(100),
    varchar(500),
    UserType);


drop function if exists CheckUser(varchar(25), varchar(25));

-- ----------------------------------------------------------------------------
-- Topics
-- ----------------------------------------------------------------------------

drop function if exists NewTopic(integer, varchar(100), varchar(1100));

-- ----------------------------------------------------------------------------
-- Users
-- ----------------------------------------------------------------------------

drop function if exists UpdateAbout(varchar(25), varchar(500));
drop function if exists UpdateSignature(varchar(25), varchar(100));
drop function if exists canEdit(varchar(25), varchar(25));
