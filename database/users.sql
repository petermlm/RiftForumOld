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
