<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { isPageLoaded } from '../stores/loading';
  
  let isVisible = false;

  onMount(() => {
    const hash = window.location.hash.slice(1);
    
    if (hash === 'projects') {
      const unsubscribe = isPageLoaded.subscribe(loaded => {
        if (loaded) {
          setTimeout(() => {
            const section = document.getElementById('projects');
            if (section) {
              const offset = 50; // Même offset que Experience
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

  type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    technologies: string[];
    featured?: boolean;
  };

  const projects: Project[] = [
    {
      title: "ERC-4626 DeFi Interface",
      description: "A decentralized, modular DApp for interacting with ERC-4626 vaults. Deposit, withdraw, and track assets with real-time analytics via TheGraph. Custom wallet integration with Svelte stores and window.ethereum — no wagmi, no bloat.",
      image: "app-detrade.png",
      link: "https://app.detrade.fund/",
      technologies: ["TypeScript", "Svelte", "HTML/CSS", "TailwindCSS", "Ethers.js"],
      featured: true
    },
    {
      title: "Oracle NAV",
      description: "Oracle for pushing NAVs and calculating vault asset liquidation value, leveraging on-chain smart contract data and APIs for asset conversion. Cron task in GitHub Actions for regular valuation pushes.",
      image: "oracle-detrade.png",
      link: "https://oracle.detrade.fund/",
      technologies: ["Python", "GitHub Actions", "Web3.py", "APIs", "Smart Contracts"],
      featured: true
    }
  ];
</script>

<style>
  .number {
    color: #FFA33C;
    opacity: 1;
  }

  .project-image {
    transition: all 0.3s ease;
  }

  .project-overlay {
    background-color: #FFA33C;
    opacity: 0.4;
    mix-blend-mode: color;
    transition: opacity 300ms ease;
  }

  .project-container:hover .project-overlay {
    opacity: 0;
  }

  .tech-list {
    color: #FFA33C;
  }

  .arrow {
    color: #FFA33C;
    opacity: 1;
  }
</style>

<section id="projects" class="py-24 bg-dark scroll-mt-[100px]">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <!-- Titre avec ligne -->
    <div class="flex items-center gap-4 mb-8 md:mb-16">
      <h2 class="text-2xl font-mono whitespace-nowrap">
        <span class="number">03.</span>
        <span class="text-light">Some Things I've Built</span>
      </h2>
      <div class="h-[1px] w-32 md:w-96 bg-light/20"></div>
    </div>

    <!-- Liste des projets -->
    <div class="space-y-40">
      {#each projects as project, index}
        {#if project.featured}
          <div class="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
            <!-- Image avec filtre -->
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class="col-span-1 md:col-span-7 relative rounded-lg overflow-hidden group h-fit block {index % 2 === 1 ? 'md:order-2' : ''}"
            >
              <img 
                src={project.image} 
                alt={project.title}
                class="w-full grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div class="absolute inset-0 bg-[#FFA33C] opacity-40 mix-blend-color group-hover:opacity-0 transition-opacity duration-300"></div>
            </a>

            <!-- Contenu -->
            <div class="col-span-1 md:col-span-5 flex flex-col justify-center mt-6 md:mt-0 {index % 2 === 1 ? 'md:order-1' : ''}">
              <div class="space-y-4 {index % 2 === 1 ? 'text-left' : 'text-left md:text-right'} flex flex-col {index % 2 === 1 ? 'items-start' : 'items-start md:items-end'}">
                <p class="font-mono text-[#FFA33C] text-sm">Featured Project</p>
                <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-light whitespace-nowrap">
                  {project.title}
                </h3>
                <div class="bg-[#2a2a2a] p-4 md:p-6 rounded-lg {index % 2 === 1 ? 'md:-mr-48' : 'md:-ml-48'} relative z-10 border border-[#FFA33C]/20">
                  <p class="text-light/70 text-sm md:text-base">
                    {project.description}
                  </p>
                </div>
                <div class="flex flex-col gap-4">
                  <div class="flex gap-4 {index % 2 === 1 ? 'justify-start' : 'justify-start md:justify-end'}">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[#FFA33C] hover:text-[#FFA33C]/80 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  <ul class="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 font-mono text-[10px] md:text-xs {index % 2 === 1 ? '' : 'md:text-right'}">
                    {#each project.technologies as tech}
                      <li class="text-light/70 w-full flex items-center gap-2">
                        <span class="arrow shrink-0">▹</span>
                        <span class="break-normal">{tech}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section> 