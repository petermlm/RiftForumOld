-- Extension for encryptation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ----------------------------------------------------------------------------
-- Create New User
-- 1 - Username
-- 2 - Password
-- 3 - Signature
-- 4 - About
-- 5 - User Type

create function CreateUser(varchar(25),
                           varchar(25),
                           varchar(100),
                           varchar(500),
                           UserType)
returns void as $$
declare
    salt text;

begin
    salt = gen_salt('md5');

    insert into Users(username,
                      password_hash,
                      password_salt,
                      signature,
                      about,
                      user_type,
                      created)
    values($1, crypt($2, salt), salt, $3, $4, $5, now());
end
$$ language 'plpgsql';

-- ----------------------------------------------------------------------------
-- Check User
-- username
-- password

create function CheckUser(varchar(25), varchar(25))
returns table(user_id_ret   integer,
              username_ret  varchar(25),
              user_type_ret UserType
) as $$
declare
    salt      text;
    calc_hash text;

begin
    salt = (select Users.password_salt
            from Users
            where Users.username = $1);
    calc_hash = crypt($2, salt);

    return query
    select user_id, username, user_type
    from Users where
        Users.username      = $1 and
        Users.password_hash = calc_hash;
end
$$ language 'plpgsql';

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
