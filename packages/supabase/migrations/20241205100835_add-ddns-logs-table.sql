CREATE TABLE ddns_logs (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    domain text NOT NULL,
    ip text NOT NULL,
    domainId uuid not null,
    created_at timestamp with time zone not null default now()
)