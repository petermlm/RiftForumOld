-- ----------------------------------------------------------------------------
-- Update about of user
--
--   Username
--   New About text

create function UpdateAbout(varchar(25), varchar(500))
returns void as $$
begin
    update Users
    set about = $2
    where username = $1;
end
$$ language 'plpgsql';

-- ----------------------------------------------------------------------------
-- Update signature of user
--
--   Username
--   New Signature text

create function UpdateSignature(varchar(25), varchar(100))
returns void as $$
begin
    update Users
    set signature = $2
    where username = $1;
end
$$ language 'plpgsql';

-- ----------------------------------------------------------------------------
-- Check if user can edit other users stuff. Rules are:
--
-- * A User can only edit it's own things.
-- * A Moderator can edit it's own things and other Users things.
-- * An administrator can edit it's own things, moderator things, and other
--   Users things.

create function canEdit(varchar(25), varchar(25))
returns boolean as $$
declare
    user1_type UserType;
    user2_type UserType;

begin
    select into user1_type user_type from Users where username = $1;
    select into user2_type user_type from Users where username = $2;

    -- If this is a user
    if user1_type = 'User' then
        if $1 = $2 then
            return true;
        end if;

    -- If the user is a moderator
    elsif user1_type = 'Moderator' then
        if user2_type = 'User' or $1 = $2 then
            return true;
        end if;

    -- If the user is an administrator
    elsif user1_type = 'Administrator' then
        if user2_type = 'User' or user2_type = 'Moderator' or $1 = $2 then
            return true;
        end if;
    end if;

    return false;
end
$$ language 'plpgsql';
