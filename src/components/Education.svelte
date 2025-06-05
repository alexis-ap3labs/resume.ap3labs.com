<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { isPageLoaded } from '../stores/loading';
  
  /**
   * Education interface defining the structure of education entries
   */
  type Education = {
    school: string;
    degree: string;
    date: string;
    location?: string;
    logo?: string;
    link?: string;
  };

  /**
   * Array of education experiences
   * @type {Education[]}
   */
  const education: Education[] = [
    {
      school: "Panthéon-Sorbonne",
      degree: "M2 Finance Tech Data, Finance, General",
      date: "2020 - 2021",
      logo: "sorbonne.png",
      link: "https://formations.pantheonsorbonne.fr/fr/catalogue-des-formations/master-M/master-monnaie-banque-finance-assurance-KBUT5XXF/master-parcours-finance-technology-data-KBUT7IZ4.html"
    },
    {
      school: "Fundação Dom Cabral",
      degree: "MBA, Business Administration and Management, General",
      date: "2019 - 2020",
      location: "Belo Horizonte, Minas Gerais, Brazil",
      logo: "fdc.png",
      link: "https://www.fdc.org.br/"
    },
    {
      school: "SKEMA Business School",
      degree: "Master of Business Administration - MBA, Business Administration and Management, General",
      date: "2019 - 2020",
      logo: "skema.png",
      link: "https://www.skema.edu/fr"
    },
    {
      school: "Lycée Français de Vienne",
      degree: "Baccalauréat, Economics and Social Sciences",
      date: "2016",
      logo: "lfv.png",
      link: "https://lyceefrancais.at/"
    }
  ];

  /**
   * State variables
   */
  let activeTab = 0;
  let scrollContainer: HTMLElement;

  /**
   * Handles initial page load and scroll to section if URL contains hash
   */
  onMount(() => {
    const hash = window.location.hash.slice(1);
    
    if (hash === 'education') {
      const unsubscribe = isPageLoaded.subscribe(loaded => {
        if (loaded) {
          setTimeout(() => {
            const section = document.getElementById('education');
            if (section) {
              const offset = 50;
              window.scrollTo({
                top: section.offsetTop - offset,
                behavior: 'smooth'
              });
            }
          }, 100);
          unsubscribe();
        }
      });
    }
  });

  /**
   * Scrolls the tab container to center the active tab
   */
  function scrollToActiveTab(index: number) {
    if (!scrollContainer) return;
    
    const buttons = scrollContainer.querySelectorAll('button');
    const activeButton = buttons[index];
    if (!activeButton) return;

    const containerWidth = scrollContainer.offsetWidth;
    const scrollLeft = scrollContainer.scrollLeft;
    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;

    const targetScroll = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }

  /**
   * Updates active tab and triggers scroll animation
   */
  function handleTabChange(index: number) {
    activeTab = index;
    scrollToActiveTab(index);
  }
</script>

<style>
  /* Section number styling */
  .number {
    color: var(--color-orange);
    opacity: 1;
  }

  /* Arrow bullet points styling */
  .arrow {
    color: var(--color-orange);
    opacity: 1;
  }

  /* Active tab styles */
  .active {
    color: var(--color-orange) !important;
    background-color: var(--color-light-5);
  }

  .active-bar {
    background-color: var(--color-orange);
  }

  /* School name styling */
  .school {
    color: var(--color-orange);
  }

  /* Hide scrollbar while maintaining functionality */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* School link hover effect */
  .school-link {
    position: relative;
    display: inline-block;
  }

  .school-link :global(.underline) {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: var(--color-orange);
    transition: width 0.3s ease;
  }

  .school-link:hover :global(.underline) {
    width: 100%;
  }

  /* Logo styling */
  .school-logo {
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-right: 8px;
  }
</style>

<!-- Education Section -->
<section id="education" class="pt-16 pb-16 bg-dark scroll-mt-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <div 
      class="flex items-center gap-4 mb-8 md:mb-16"
      in:fly={{ y: 20, duration: 800 }}
    >
      <h2 class="text-2xl font-mono whitespace-nowrap">
        <span class="number">03.</span>
        <span class="text-light">Education</span>
      </h2>
      <div class="h-[1px] w-32 md:w-96 bg-light/20"></div>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Liste des écoles -->
      <div 
        class="md:w-52 w-full overflow-x-auto md:overflow-visible hide-scrollbar"
        bind:this={scrollContainer}
        in:fly={{ x: -20, duration: 800, delay: 200 }}
      >
        <div class="flex md:flex-col border-b md:border-b-0 md:border-l border-light/20 min-w-max md:min-w-0">
          {#each education as edu, i}
            <button
              class="relative md:pl-5 px-4 md:px-0 py-3 text-left whitespace-nowrap md:w-full transition-all duration-300
                     cursor-pointer
                     {activeTab === i ? 'text-primary' : 'text-light/50'}
                     hover:bg-light/5 md:hover:bg-transparent md:hover:pl-7 hover:text-primary
                     focus:outline-none"
              class:active={activeTab === i}
              on:click={() => handleTabChange(i)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabChange(i);
                }
              }}
            >
              {edu.school}
              {#if activeTab === i}
                <span class="absolute left-0 bottom-[-1px] md:bottom-0 md:left-[-1px] w-full h-[2px] md:h-full md:w-[2px] active-bar"></span>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Détails de l'éducation -->
      <div 
        class="flex-1"
        in:fly={{ x: 20, duration: 800, delay: 300 }}
      >
        <h3 class="text-lg md:text-xl text-light mb-1 md:mb-2">
          <span class="mr-1">{education[activeTab].degree}</span>
          <span class="school">@ 
            <span class="school-link">
              {#if education[activeTab].link}
                <a href={education[activeTab].link} target="_blank" rel="noopener noreferrer" class="hover:text-orange transition-colors">
                  {education[activeTab].school}
                </a>
              {:else}
                {education[activeTab].school}
              {/if}
              <span class="underline"></span>
            </span>
          </span>
        </h3>
        <p class="text-light/50 font-mono text-sm md:text-base mb-4">
          {education[activeTab].date}
          {#if education[activeTab].location}
            <span class="block mt-1">{education[activeTab].location}</span>
          {/if}
        </p>
      </div>
    </div>
  </div>
</section> 