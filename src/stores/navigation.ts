import { writable } from 'svelte/store';

function createActiveSection() {
    const { subscribe, set } = writable('');

    return {
        subscribe,
        set: (path: string) => {
            // Enlève le / du début et le # si présent
            const cleanPath = path.replace(/^\/|#/g, '');
            set(cleanPath || '');
        }
    };
}

export const activeSection = createActiveSection(); 