<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    export let finishLoading: () => void;
    let isMounted = false;
    
    onMount(() => {
        setTimeout(() => {
            isMounted = true;
            setTimeout(finishLoading, 2500);
        }, 10);
    });
</script>

<div 
    class="fixed inset-0 z-[99] flex items-center justify-center bg-dark"
    transition:fade={{ duration: 200 }}
>
    {#if isMounted}
        <div 
            class="logo-wrapper"
            in:fade={{ duration: 300, delay: 150 }}
        >
            <img 
                src="/ap3labs_logo.webp" 
                alt="AP3 Labs Logo"
                class="w-32 h-32 object-contain animate-draw"
            />
        </div>
    {/if}
</div>

<style>
    .animate-draw {
        opacity: 0;
        animation: fadeInLogo 0.5s ease forwards;
    }

    @keyframes fadeInLogo {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .logo-wrapper {
        animation: fadeOut 0.3s ease forwards 2.2s;
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.1);
        }
    }
</style> 