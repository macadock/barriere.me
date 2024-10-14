create function is_admin_authenticated_user()
    returns boolean
    language sql
    security definer
    set search_path = public
    stable
as $$
select exists(
    select *
    from users
    where id = auth.uid()
      and role = 'ADMIN'
)
$$;
