<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { isPageLoaded } from '../stores/loading';
  
  /**
   * Project interface defining the structure of project entries
   */
  type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    technologies: string[];
    featured?: boolean;
  };

  /**
   * Array of featured projects
   * @type {Project[]}
   */
  const projects: Project[] = [
    {
      title: "ERC-4626 DeFi Interface",
      description: "A decentralized, modular DApp for interacting with ERC-4626 vaults. Deposit, withdraw, and track assets with real-time analytics via TheGraph.",
      image: "app1.png",
      link: "https://app.detrade.fund/",
      technologies: ["TypeScript", "Svelte", "HTML/CSS", "TailwindCSS", "Ethers.js"],
      featured: true
    },
    {
      title: "DeFi NAV Oracle",
      description: "Real-time Net Asset Value oracle for DeFi portfolios. Aggregates positions across lending protocols (Aave, Compound), perp DEXs, and concentrated liquidity pools with accurate PnL attribution.",
      image: "oracle.detrade.fund.png",
      link: "https://oracle.detrade.fund/",
      technologies: ["Python", "Web3.py", "MongoDB", "TheGraph", "Subgraphs"],
      featured: true
    }
  ];

  /**
   * State for section visibility
   * @type {boolean}
   */
  let isVisible = false;

  /**
   * Handles initial page load and scroll behavior
   */
  onMount(() => {
    const hash = window.location.hash.slice(1);
    
    if (hash === 'projects') {
      const unsubscribe = isPageLoaded.subscribe(loaded => {
        if (loaded) {
          setTimeout(() => {
            const section = document.getElementById('projects');
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

    isVisible = true;

    // Initialize intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<style>
  /* Section number styling */
  .number {
    color: var(--color-orange);
    opacity: 1;
  }

  /* Project image hover effects */
  .project-image {
    transition: all 0.3s ease;
  }

  .project-overlay {
    background-color: var(--color-orange);
    opacity: 0.4;
    mix-blend-mode: color;
    transition: opacity 300ms ease;
  }

  .project-container:hover .project-overlay {
    opacity: 0;
  }

  /* Technology list styling */
  .tech-list {
    color: var(--color-orange);
  }

  /* Arrow bullet points */
  .arrow {
    color: var(--color-orange);
    opacity: 1;
  }

  /* Bouton externe animation */
  .external-link {
    transition: all 0.3s ease;
  }

  .external-link:hover {
    transform: translate(-2px, -2px);
    background-color: var(--color-orange);
    color: var(--color-dark);
  }

  /* Technology pills styling */
  .tech-pill {
    background-color: var(--color-orange-10);
    color: var(--color-orange);
    border: 1px solid var(--color-orange);
    border-radius: 9999px;
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
    white-space: nowrap;
  }
</style>

<!-- Projects Section -->
<section id="projects" class="pt-16 pb-16 bg-dark scroll-mt-[100px]">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <!-- Section Title -->
    <div class="flex items-center gap-4 mb-8 md:mb-16">
      <h2 class="text-2xl font-mono whitespace-nowrap">
        <span class="number">04.</span>
        <span class="text-light">Things I've Built</span>
      </h2>
      <div class="h-[1px] w-32 md:w-96 bg-light/20"></div>
    </div>

    <!-- Projects Grid -->
    <div class="space-y-16 md:space-y-32">
      {#each projects as project, index}
        {#if project.featured}
          <div class="relative grid grid-cols-12 gap-4 md:gap-16">
            <!-- Contenu -->
            <div class="col-span-12 md:col-span-5 flex flex-col justify-center 
                        {index % 2 === 1 ? 'md:order-1' : ''} order-1"
            >
              <div class="space-y-4 text-left md:text-{index % 2 === 1 ? 'left' : 'right'} 
                          flex flex-col items-start md:items-{index % 2 === 1 ? 'start' : 'end'}"
              >
                <p class="font-mono text-[var(--color-orange)] text-sm">Featured Project</p>
                <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-light whitespace-nowrap">
                  {project.title}
                </h3>

                <!-- Image sur Mobile -->
                <div class="block md:hidden w-full">
                  <div class="relative rounded-lg overflow-hidden group h-fit">
                    <!-- Lien pour Mobile -->
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="block w-full h-full"
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        class="w-full grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                      <div class="absolute inset-0 bg-[var(--color-orange)] opacity-40 mix-blend-color group-hover:opacity-0 transition-opacity duration-300"></div>
                    </a>
                    <!-- Icône pour Mobile -->
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="absolute top-4 right-4 external-link bg-[#2a2a2a] p-2 rounded-lg z-20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div class="bg-[#2a2a2a] p-4 md:p-6 rounded-lg w-full md:w-auto 
                           {index % 2 === 1 ? 'md:-mr-48' : 'md:-ml-48'} relative z-10 
                           border border-[var(--color-orange)]/20"
                >
                  <p class="text-light/70 text-sm md:text-base">
                    {project.description}
                  </p>
                </div>
                <div class="flex flex-col gap-4 w-full">
                  <ul class="flex flex-wrap gap-x-3 gap-y-4 text-sm md:text-base 
                             {index % 2 === 1 ? '' : 'md:justify-end'}"
                  >
                    {#each project.technologies as tech}
                      <li>
                        <span class="tech-pill">{tech}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>

            <!-- Image pour Desktop -->
            <div 
              class="hidden md:block col-span-12 md:col-span-7 relative rounded-lg overflow-hidden group h-fit 
                     {index % 2 === 1 ? 'md:order-2' : ''}"
            >
              <div class="absolute inset-0 z-10">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full h-full"
                ></a>
              </div>
              
              <img 
                src={project.image} 
                alt={project.title}
                class="w-full grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div class="absolute inset-0 bg-[var(--color-orange)] opacity-40 mix-blend-color group-hover:opacity-0 transition-opacity duration-300"></div>
              <!-- Icône pour Desktop -->
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                class="absolute top-4 right-4 external-link bg-[#2a2a2a] p-2 rounded-lg z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section> 