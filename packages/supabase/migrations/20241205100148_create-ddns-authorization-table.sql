CREATE TABLE ddns_authorization (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    domain text NOT NULL,
    configuration jsonb not null default '{}',
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    user_id uuid not null,
    foreign key (user_id) references "public"."users" (id) on delete cascade
);

create trigger update_ddns_authorization_updated_at
    before update on ddns_authorization
    for each row
execute function update_updated_at_column();