// theme.js — Light/Dark. Pilihan disimpan di localStorage,
// ditempel sebagai class 'dark' di <html>. Tailwind baca class itu (darkMode: 'class').

export const THEME_KEY = 'crm.theme';

export function getTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export function applyTheme(t) {
  document.documentElement.classList.toggle('dark', t === 'dark');
}

export function saveTheme(t) {
  localStorage.setItem(THEME_KEY, t);
  applyTheme(t);
}
