-- Policy RLS profiles untuk halaman Pengaturan (30-09-2026).
-- Jalankan di Supabase Dashboard -> SQL Editor. Idempoten: aman diulang.
--
-- Halaman Pengaturan membaca/mengubah baris profiles milik user sendiri
-- (ganti username, sinkron email). Tanpa policy ini, baris sendiri tak
-- terlihat via anon key dan fitur ganti username/email akan gagal.

alter table public.profiles enable row level security;

drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Cek: harus muncul 2 policy di atas.
select policyname, cmd
from pg_policies
where schemaname = 'public' and tablename = 'profiles';
