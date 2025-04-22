<script lang="ts">
  import About from '../components/About.svelte';
  import Intro from '../components/Intro.svelte';
  import Experience from '../components/Experience.svelte';
  import Header from '../components/Header.svelte';
  import Projects from '../components/Projects.svelte';
  import Contact from '../components/Contact.svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  /**
   * State variables
   */
  let activeSection = '';
  let sectionsVisible = {
    intro: false,
    about: false,
    experience: false,
    projects: false,
    contact: false
  };

  /**
   * Social media links configuration
   * @type {Array<{name: string, url: string, icon: string}>}
   */
  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/alexispierreprn',
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
    },
    {
      name: 'X',
      url: 'https://x.com/alexis_ap3labs',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>`
    },
    {
      name: 'GitHub',
      url: 'https://github.com/alexis-ap3labs',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>`
    }
  ];

  /**
   * Handles hash change in URL and scrolls to corresponding section
   */
  function handleHashChange() {
    const hash = window.location.hash.slice(1);
    activeSection = hash;
    
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

  /**
   * Initialize page behavior and animations
   */
  onMount(() => {
    // Set initial active section
    activeSection = window.location.hash.slice(1);
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Initialize intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Observer for future development if needed
      });
    }, { threshold: 0.5 });

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    // Trigger sequential section animations
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

<style>
  /* Vertical text styling */
  .vertical-text {
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 0.1em;
  }

  /* Email link styling */
  .vertical-email {
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 0.1em;
    font-family: 'Satoshi', sans-serif;
    transform: translateY(0);
  }

  /* Social icon styling */
  .social-icon {
    transform: translateY(0);
  }

  :global(.social-icon svg) {
    width: 20px;
    height: 20px;
  }

  /* Section fade-in animation */
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

<!-- Header Component -->
<Header {activeSection} />

<!-- Social Links Sidebar -->
{#if sectionsVisible.intro}
  <!-- Social links sidebar content -->
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
      href="mailto:alexis@ap3labs.com" 
      class="vertical-email text-gray-400 hover:text-[#FFA33C] transition-all duration-300 hover:-translate-y-1"
      style="writing-mode: vertical-rl;"
    >
      alexis@ap3labs.com
    </a>
    <div class="w-[1px] h-48 bg-gray-400 mt-6"></div>
  </div>
{/if}

<!-- Main Content -->
<main class="min-h-screen bg-dark">
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <!-- Section components with animations -->
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

<svelte:head>
    <title>Alexis Péron - Full Stack Developer | AP3 Labs</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Alexis Péron - Full Stack Developer | AP3 Labs" />
    <meta name="description" content="Passionate Full Stack Developer with expertise in JavaScript, TypeScript, React, and Node.js. Discover my portfolio and professional journey at AP3 Labs." />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://resume.ap3labs.com" />
    <meta property="og:title" content="Alexis Péron - Full Stack Developer | AP3 Labs" />
    <meta property="og:description" content="Passionate Full Stack Developer with expertise in JavaScript, TypeScript, React, and Node.js. Discover my portfolio and professional journey at AP3 Labs." />
    <meta property="og:image" content="https://resume.ap3labs.com/og-image.jpg" />
    <meta property="og:image:secure_url" content="https://resume.ap3labs.com/og-image.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="resume.ap3labs.com" />
    <meta property="twitter:url" content="https://resume.ap3labs.com" />
    <meta name="twitter:title" content="Alexis Péron - Full Stack Developer | AP3 Labs" />
    <meta name="twitter:description" content="Passionate Full Stack Developer with expertise in JavaScript, TypeScript, React, and Node.js. Discover my portfolio and professional journey at AP3 Labs." />
    <meta name="twitter:image" content="https://resume.ap3labs.com/og-image.jpg" />
</svelte:head>
