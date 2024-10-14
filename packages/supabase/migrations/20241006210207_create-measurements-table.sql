CREATE TABLE IF NOT EXISTS "public"."measurements" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    measures jsonb not null default '{}',
    date timestamp with time zone not null default now(),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    user_id uuid not null,
    foreign key (user_id) references "public"."users" (id) on delete cascade
);

create trigger update_measurements_updated_at
    before update on measurements
    for each row
execute function update_updated_at_column();