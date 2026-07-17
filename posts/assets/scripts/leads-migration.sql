-- tabela de leads do caderno (formulário "assinar" em todo post)
create table leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- RLS ligada e sem nenhuma policy: ninguém lê/escreve direto via REST.
-- o insert acontece só pela edge function `subscribe` (supabaseAdmin, bypassa RLS).
alter table leads enable row level security;
