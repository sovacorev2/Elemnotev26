-- Create study_sessions table for analytics
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null check (activity_type in ('document', 'chat', 'quiz', 'flashcard')),
  subject text,
  duration_minutes integer,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.study_sessions enable row level security;

-- RLS Policies
create policy "Users can view their own study sessions"
  on public.study_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own study sessions"
  on public.study_sessions for insert
  with check (auth.uid() = user_id);

-- Create indexes
create index if not exists study_sessions_user_id_idx on public.study_sessions(user_id);
create index if not exists study_sessions_created_at_idx on public.study_sessions(created_at desc);
