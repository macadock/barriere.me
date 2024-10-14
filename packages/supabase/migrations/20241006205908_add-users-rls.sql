alter table public.users add primary key (id);

alter table public.users enable row level security;

create index users_user_id_index on public.users (id);

create policy "Allow logged in user to get its role"
    on public.users
    for select
    using
    ( auth.uid() = id );

create function create_user()
    returns trigger
    language plpgsql
    security definer
as $$
begin
    insert into public.users(id)
    values (new.id);
    return new;
end;
$$;

create trigger create_user_at_sign_up
    after insert on auth.users
    for each row
execute function create_user();
