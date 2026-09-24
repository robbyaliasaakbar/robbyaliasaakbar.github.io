// theme.js — dark/light. Simpan 'content.theme', tempel class dark di html.
export const THEME_KEY = 'content.theme';
export function getTheme() { return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; }
export function applyTheme(t) { document.documentElement.classList.toggle('dark', t === 'dark'); }
export function saveTheme(t) { localStorage.setItem(THEME_KEY, t); applyTheme(t); }
