import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get initial theme from localStorage or default to 'dark'
const initialTheme = browser ? localStorage.getItem('theme') || 'dark' : 'dark';

export const theme = writable('dark');

// Subscribe to theme changes and update localStorage and body class
if (browser) {
  theme.subscribe(value => {
    localStorage.setItem('theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  });
} 