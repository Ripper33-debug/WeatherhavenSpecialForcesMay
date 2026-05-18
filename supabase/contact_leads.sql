-- Run in Supabase SQL editor
create table if not exists contact_leads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  full_name text,
  organization text,
  role text,
  inquiry_type text,
  program text,
  subject text,
  message text,
  contact_method text,
  phone text,
  submitted_at timestamp with time zone default now(),
  status text default 'new'
);

alter table contact_leads enable row level security;

create policy "Users can insert own leads"
  on contact_leads for insert with check (auth.uid() = user_id);

create policy "Admin can read all leads"
  on contact_leads for select using (true);

create policy "Admin can update leads"
  on contact_leads for update using (true);
