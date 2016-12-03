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
                      user_type)
    values($1, crypt($2, salt), salt, $3, $4, $5);
end
$$ language 'plpgsql';

-- ----------------------------------------------------------------------------
-- Check User
-- username
-- password

create function CheckUser(varchar(25), varchar(25))
returns table(username_ret varchar(25), user_type_ret UserType) as $$
declare
    salt      text;
    calc_hash text;

begin
    salt = (select Users.password_salt
            from Users
            where Users.username = $1);
    calc_hash = crypt($2, salt);

    return query
    select username, user_type
    from Users where
        Users.username      = $1 and
        Users.password_hash = calc_hash;
end
$$ language 'plpgsql';
