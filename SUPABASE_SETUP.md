# Supabase setup for chat migration

Run this SQL in Supabase (SQL editor):

```sql
create table if not exists public.conversations (
  id text primary key,
  customer_name text not null,
  status text not null default 'open',
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_settings (
  id int primary key,
  assistant_name text not null,
  welcome_message text not null,
  auto_reply_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.conversations (id, customer_name, status, messages)
values (
  'guest-1',
  'Guest visitor',
  'open',
  '[{"role":"assistant","text":"Hi! 👋 I can help with menu picks, promotions, and app rewards."}]'::jsonb
)
on conflict (id) do nothing;

insert into public.chat_settings (id, assistant_name, welcome_message, auto_reply_enabled)
values (
  1,
  'ZUS Assistant',
  'Thanks! Our support team usually replies in a few minutes. For now, check the Promotions and FAQ sections below.',
  true
)
on conflict (id) do nothing;
```

## Required client env vars

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Notes

- Frontend reads/writes directly using `@supabase/supabase-js`.
- Add Row Level Security policies before production usage.
