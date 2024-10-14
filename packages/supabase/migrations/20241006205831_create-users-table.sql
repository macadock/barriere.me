create type user_role as enum ('ADMIN', 'USER');

CREATE TABLE IF NOT EXISTS "public"."users" (
    id uuid,
    role user_role not null default 'USER',
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    foreign key (id) references auth.users (id) on delete cascade
);

create function update_updated_at_column()
    returns trigger
    language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger update_users_updated_at
    before update on users
    for each row
execute function update_updated_at_column();
