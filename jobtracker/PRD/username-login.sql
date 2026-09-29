-- Username login untuk Jobtracker v2 (30-09-2026).
-- Jalankan sekali di Supabase Dashboard -> SQL Editor.
-- Alur FE: identifier bukan email -> RPC cari_email_username -> password grant pakai email.
--
-- CATATAN KEAMANAN: RPC ini memperlihatkan email milik sebuah username ke siapa
-- saja yang pegang anon key (memang diperlukan supaya bisa login). Trade-off
-- standar pola username->email; tidak ada password yang lewat SQL.

-- 1. Setiap user auth baru otomatis dapat baris profiles (username diambil
--    dari metadata yang dikirim form daftar). Kalau trigger versi lama sudah
--    ada dengan nama yang sama, dia ditimpa definisi ini.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, username, nama, telepon)
  values (
    new.id,
    new.email,
    lower(trim(coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)))),
    coalesce(new.raw_user_meta_data->>'nama', ''),
    coalesce(new.raw_user_meta_data->>'telepon', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Backfill user lama yang belum punya baris profiles. Username diambil dari
--    metadata 'username', kalau kosong dipakai bagian depan email.
insert into public.profiles (id, email, username, nama, telepon)
select
  u.id,
  u.email,
  lower(trim(coalesce(u.raw_user_meta_data->>'username', split_part(u.email, '@', 1)))),
  coalesce(u.raw_user_meta_data->>'nama', ''),
  coalesce(u.raw_user_meta_data->>'telepon', '')
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

-- 3. Baris lama yang username-nya masih kosong diisi dari email,
--    supaya constraint di langkah 4 tidak meledak.
update public.profiles
set username = lower(trim(split_part(email, '@', 1)))
where username is null or trim(username) = '';

-- 4. Username wajib unik dan tidak boleh kosong.
--    GAGAL DI SINI = ada username dobel; rapikan dulu datanya, baru jalankan ulang.
alter table public.profiles
  add constraint profiles_username_key unique (username);

alter table public.profiles
  alter column username set not null;

-- 5. RPC username -> email. SECURITY DEFINER diperlukan karena profiles
--    tertutup RLS untuk anon, sedangkan lookup ini harus jalan sebelum login.
create or replace function public.cari_email_username(p_username text)
returns table (email text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.email
  from public.profiles p
  where lower(p.username) = lower(trim(p_username))
  limit 1;
$$;

revoke all on function public.cari_email_username(text) from public;
grant execute on function public.cari_email_username(text) to anon, authenticated;

-- 6. Cek hasil: ganti dengan username lo, harus balik email-nya.
select * from public.cari_email_username('ISI_USERNAME_LO');
