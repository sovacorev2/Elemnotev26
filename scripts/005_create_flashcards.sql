-- Create flashcard_decks table
create table if not exists public.flashcard_decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,
  title text not null,
  subject text,
  card_count integer not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Create flashcards table
create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.flashcard_decks(id) on delete cascade,
  front text not null,
  back text not null,
  order_index integer not null,
  created_at timestamptz default now() not null
);

-- Create flashcard_progress table
create table if not exists public.flashcard_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  flashcard_id uuid not null references public.flashcards(id) on delete cascade,
  mastered boolean default false,
  last_reviewed_at timestamptz,
  review_count integer default 0,
  unique(user_id, flashcard_id)
);

-- Enable RLS
alter table public.flashcard_decks enable row level security;
alter table public.flashcards enable row level security;
alter table public.flashcard_progress enable row level security;

-- RLS Policies for flashcard_decks
create policy "Users can view their own flashcard decks"
  on public.flashcard_decks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own flashcard decks"
  on public.flashcard_decks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own flashcard decks"
  on public.flashcard_decks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own flashcard decks"
  on public.flashcard_decks for delete
  using (auth.uid() = user_id);

-- RLS Policies for flashcards
create policy "Users can view flashcards in their decks"
  on public.flashcards for select
  using (
    exists (
      select 1 from public.flashcard_decks
      where flashcard_decks.id = flashcards.deck_id
      and flashcard_decks.user_id = auth.uid()
    )
  );

create policy "Users can insert flashcards in their decks"
  on public.flashcards for insert
  with check (
    exists (
      select 1 from public.flashcard_decks
      where flashcard_decks.id = flashcards.deck_id
      and flashcard_decks.user_id = auth.uid()
    )
  );

create policy "Users can delete flashcards in their decks"
  on public.flashcards for delete
  using (
    exists (
      select 1 from public.flashcard_decks
      where flashcard_decks.id = flashcards.deck_id
      and flashcard_decks.user_id = auth.uid()
    )
  );

-- RLS Policies for flashcard_progress
create policy "Users can view their own flashcard progress"
  on public.flashcard_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own flashcard progress"
  on public.flashcard_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own flashcard progress"
  on public.flashcard_progress for update
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists flashcard_decks_user_id_idx on public.flashcard_decks(user_id);
create index if not exists flashcards_deck_id_idx on public.flashcards(deck_id);
create index if not exists flashcard_progress_user_id_idx on public.flashcard_progress(user_id);
create index if not exists flashcard_progress_flashcard_id_idx on public.flashcard_progress(flashcard_id);
