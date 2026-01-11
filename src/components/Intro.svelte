<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import ContactModal from './ContactModal.svelte';

  /**
   * State variables
   */
  let isIntroMounted = false;
  let isVisible = false;
  let isModalOpen = false;

  /**
   * Initialize component animations after header animations
   */
  onMount(() => {
    // Start animations after header animations (300ms + 800ms + margin)
    setTimeout(() => {
      isIntroMounted = true;
    }, 1300);
    isVisible = true;
  });

  /**
   * Modal control functions
   */
  function openModal() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>

<style>
  /* Contact button styling */
  .contact-button {
    color: var(--color-orange);
    border-color: var(--color-orange);
    cursor: pointer;
  }

  .contact-button :global(.fill) {
    background-color: var(--color-orange-10);
  }

  /* Text accent color */
  .intro-text {
    color: var(--color-orange);
  }

  /* Company link styling */
  .company-link {
    color: var(--color-orange);
  }

  .company-link :global(.underline) {
    background-color: var(--color-orange);
  }
</style>

<section class="min-h-screen bg-dark flex items-center">
  <div class="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    {#if isIntroMounted}
      <div>
        <div 
          class="intro-text mb-4 font-mono whitespace-nowrap"
          in:fly={{ y: 20, duration: 800, delay: 100 }}
        >
          Hi, my name is
        </div>
        
        <h1 
          class="text-4xl sm:text-6xl md:text-7xl font-bold text-light mb-4 whitespace-nowrap"
          in:fly={{ y: 20, duration: 800, delay: 200 }}
        >
          Alexis Péron.
        </h1>
        
        <h2 
          class="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-400 mb-8 whitespace-nowrap"
          in:fly={{ y: 20, duration: 800, delay: 300 }}
        >
          I build DeFi solutions.
        </h2>

        <p 
          class="text-base sm:text-lg text-light/70 max-w-[720px] mb-12 leading-relaxed"
          in:fly={{ y: 20, duration: 800, delay: 400 }}
        >
          As a long-time DeFi builder, I work across end-to-end onchain systems: from strategy and risk to vault infrastructure, protocol integrations, APIs, and user-facing products.
        </p>

        <div class="mt-12">
          <button
            on:click={openModal}
            class="contact-button group relative inline-block px-6 py-3 rounded border
                   overflow-hidden transition-colors duration-300"
          >
            <!-- Effet de remplissage -->
            <span class="fill absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            
            <!-- Effet de brillance -->
            <span class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                         translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            
            <!-- Texte -->
            <span class="relative z-10">Get in Touch</span>
          </button>
        </div>
      </div>
    {/if}
  </div>
</section>

<ContactModal isOpen={isModalOpen} onClose={closeModal} /> 