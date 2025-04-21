<script lang="ts">
  import About from '../components/About.svelte';
  import Intro from '../components/Intro.svelte';
  import Experience from '../components/Experience.svelte';
  import Header from '../components/Header.svelte';
  import Projects from '../components/Projects.svelte';
  import Contact from '../components/Contact.svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let activeSection = '';
  let sectionsVisible = {
    intro: false,
    about: false,
    experience: false,
    projects: false,
    contact: false
  };

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/alexisperonn',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>`
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alexispierreprn/',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>`
    }
  ];

  // Fonction pour gérer le changement de hash
  function handleHashChange() {
    const hash = window.location.hash.slice(1);
    activeSection = hash;
    
    // Ne scroller que pour les changements de hash après le chargement initial
    if (hash && document.body.classList.contains('loaded')) {
      const section = document.getElementById(hash);
      if (section) {
        const offset = 250;
        window.scrollTo({
          top: section.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    }
  }

  onMount(() => {
    // Définir la section active initiale
    activeSection = window.location.hash.slice(1);
    
    // Écouter les changements futurs de hash
    window.addEventListener('hashchange', handleHashChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Observer uniquement pour le debug/développement si nécessaire
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    // Déclencher les animations séquentiellement
    setTimeout(() => sectionsVisible.intro = true, 100);
    setTimeout(() => sectionsVisible.about = true, 300);
    setTimeout(() => sectionsVisible.experience = true, 500);
    setTimeout(() => sectionsVisible.projects = true, 700);
    setTimeout(() => sectionsVisible.contact = true, 900);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  });
</script>

<Header {activeSection} />

<!-- Social Links Sidebar -->
{#if sectionsVisible.intro}
  <div 
    class="fixed left-4 sm:left-14 top-[120px] hidden md:flex flex-col items-center z-50"
    in:fly={{ x: -50, duration: 500, delay: 1000 }}
  >
    <div class="w-[1px] h-48 bg-gray-400 mb-6"></div>
    <div class="flex flex-col gap-6">
      {#each socialLinks as link}
        <a 
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          class="social-icon text-gray-400 hover:text-[#FFA33C] transition-all duration-300 hover:translate-y-1"
          aria-label={link.name}
        >
          {@html link.icon}
        </a>
      {/each}
    </div>
  </div>

  <!-- Email Sidebar -->
  <div 
    class="fixed right-4 sm:right-14 bottom-0 hidden md:flex flex-col items-center z-50"
    in:fly={{ x: 50, duration: 500, delay: 1000 }}
  >
    <a 
      href="mailto:alexis.peron@ap3labs.com" 
      class="vertical-email text-gray-400 hover:text-[#FFA33C] transition-all duration-300 hover:-translate-y-1"
      style="writing-mode: vertical-rl;"
    >
      alexis.peron@ap3labs.com
    </a>
    <div class="w-[1px] h-48 bg-gray-400 mt-6"></div>
  </div>
{/if}

<!-- Main Content -->
<main class="min-h-screen bg-dark">
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    {#if sectionsVisible.intro}
      <div in:fly={{ y: 50, duration: 800 }}>
        <Intro />
      </div>
    {/if}

    {#if sectionsVisible.about}
      <div in:fly={{ y: 50, duration: 800 }}>
        <About />
      </div>
    {/if}

    {#if sectionsVisible.experience}
      <div in:fly={{ y: 50, duration: 800 }}>
        <Experience />
      </div>
    {/if}

    {#if sectionsVisible.projects}
      <div in:fly={{ y: 50, duration: 800 }}>
        <Projects />
      </div>
    {/if}

    {#if sectionsVisible.contact}
      <div in:fly={{ y: 50, duration: 800 }}>
        <Contact />
      </div>
    {/if}
  </div>
</main>

<style>
  .vertical-text {
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 0.1em;
  }

  .vertical-email {
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 0.1em;
    font-family: 'Satoshi', sans-serif;
    transform: translateY(0);
  }

  .social-icon {
    transform: translateY(0);
  }

  :global(.social-icon svg) {
    width: 20px;
    height: 20px;
  }

  section {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
</style>
