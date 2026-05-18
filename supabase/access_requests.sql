-- Run in Supabase SQL editor
create table if not exists access_requests (
  id uuid default gen_random_uuid() primary key,
  full_name text,
  organization text,
  email text,
  role text,
  program text,
  requirements text,
  submitted_at timestamp with time zone default now(),
  status text default 'pending'
);

alter table access_requests enable row level security;

create policy "Admin can read all requests"
  on access_requests for select using (true);

create policy "Anyone can insert requests"
  on access_requests for insert with check (true);

create policy "Admin can update requests"
  on access_requests for update using (true);
