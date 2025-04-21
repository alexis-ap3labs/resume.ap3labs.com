<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let isIntroMounted = false;
  
  onMount(() => {
    // Démarrer les animations après celles du header (300ms + 800ms + un peu de marge)
    setTimeout(() => {
      isIntroMounted = true;
    }, 1300);
  });
</script>

<style>
  .contact-button {
    color: #FFA33C;
    border-color: #FFA33C;
  }

  .contact-button :global(.fill) {
    background-color: rgba(255, 163, 60, 0.1);
  }

  .intro-text {
    color: #FFA33C;
  }

  .company-link {
    color: #FFA33C;
  }

  .company-link :global(.underline) {
    background-color: #FFA33C;
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
          I'm passionate about blockchain technology and DeFi, combining development skills with deep knowledge in crypto finance. 
          Since 2017, I've been exploring and contributing to the crypto ecosystem. Currently at 
          <a 
            href="/" 
            class="company-link relative group"
          >
            AP3 Labs
            <span class="underline absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300"></span>
          </a>, 
          I focus on building secure and accessible DeFi applications, bridging technical innovation with financial expertise.
        </p>

        <div in:fly={{ y: 20, duration: 800, delay: 500 }}>
          <a 
            href="/contact"
            class="contact-button group relative inline-block px-6 py-3 rounded border
                   overflow-hidden transition-colors duration-300"
          >
            <!-- Effet de remplissage -->
            <span class="fill absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            
            <!-- Effet de brillance -->
            <span class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                         translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            
            <!-- Texte -->
            <span class="relative z-10">Get in touch</span>
          </a>
        </div>
      </div>
    {/if}
  </div>
</section> 