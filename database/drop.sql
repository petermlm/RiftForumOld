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

-- ----------------------------------------------------------------------------
-- Functions
-- ----------------------------------------------------------------------------

drop function if exists CreateUser(
    varchar(25),
    varchar(25),
    varchar(100),
    varchar(500),
    UserType);


drop function if exists CheckUser(varchar(25), varchar(25));
