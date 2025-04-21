<script lang="ts">
	import '../app.css';
  import '../satoshi.css';
  import { theme } from '../stores/theme';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Loader from '../components/Loader.svelte';

  let isLoading = true;
  
  const finishLoading = () => {
      setTimeout(() => {
          isLoading = false;
          document.body.classList.add('loaded');
      }, 500);
  };

  onMount(() => {
      // Si on a un hash au chargement initial, rediriger vers la page d'accueil
      if (window.location.hash) {
          window.location.href = window.location.pathname;
      }
  });
</script>

<div class="font-satoshi min-h-screen {$theme === 'dark' ? 'bg-dark text-white' : 'bg-cream text-dark'}">
  <main class="relative min-h-screen pb-32">
    <div class="overflow-x-hidden">
      {#if isLoading}
        <Loader {finishLoading} />
      {:else}
        <div 
          class="content"
          in:fade={{ duration: 300, delay: 200 }}
        >
          <slot />
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.text-content {
  max-width: 800px;
  text-align: center;
}

.image-container {
  margin-top: 20px;
}

:global(html, body) {
  overflow-x: hidden;
  width: 100%;
  position: relative;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  background-color: #171717;
  overflow-x: hidden;
}

:global(body.loaded) {
  overflow: visible;
}

.content {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
