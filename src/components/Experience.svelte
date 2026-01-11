<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { isPageLoaded } from '../stores/loading';
  
  /**
   * Job interface defining the structure of work experience entries
   */
  type Job = {
    title: string;
    company: string;
    date: string;
    points: string[];
  };

  /**
   * Array of work experiences
   * @type {Job[]}
   */
  const jobs: Job[] = [
    {
      title: "DeFi Ops & Account Management",
      company: "Merkl",
      date: "October 2024 — Present",
      points: [
        "Parsed Merkl API data to validate incentive campaigns (eligibility conditions + reward computations).",
        "Scoped integrations with partners to translate their incentive goals into campaign specs.",
        "Supported partners through rollout, troubleshooting issues and ensuring smooth attribution + distribution."
      ]
    },
    {
      title: "Full Stack Developer",
      company: "AP3 Labs",
      date: "September 2023 — Present",
      points: [
        'Built <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer" class="company-link">DeTrade<span class="underline"></span></a>: full-stack ERC-4626 yield platform with vault integrations, monitoring/oracles, and SvelteKit UX.',
        "Designed proprietary NAV oracle: aggregates positions across lending, perps, and concentrated liquidity with PnL attribution.",
        "Contributed to perp DEX: OI skew, ADL, funding/market balance, and liquidity pool design.",
        "Scoped complex onchain systems: analyzed flows, risk/yield tradeoffs, and integration constraints."
      ]
    },
    {
      title: "Index Research Analyst",
      company: "Kaiko",
      date: "August 2022 — August 2023",
      points: [
        "Developed and maintained market‑cap‑weighted cryptocurrency indices by researching tokenomics and circulating supply dynamics",
        "Built quantitative models to estimate historical, real‑time and forecasted token supply for the top 100 digital assets",
        "Analyzed issuance schedules across diverse blockchain networks to calculate accurate market capitalization",
        "Enhanced index reliability and precision by integrating dynamic supply forecasts into index methodologies"
      ]
    },
    {
      title: "Co-founder",
      company: "CryptoGuys",
      date: "July 2021 — August 2022",
      points: [
        "Designed and implemented an automated crypto trading infrastructure connecting multiple exchanges and trading systems",
        "Developed sophisticated trading strategies integrating technical analysis and market sentiment indicators",
        "Built a complete copy trading solution with Cornix integration, enabling real-time signal execution via Telegram",
        "Optimized trading algorithms and risk management systems for consistent performance across market conditions"
      ]
    },
    {
      title: "Various Roles",
      company: "Coinhouse",
      date: "May 2018 — July 2021",
      points: [
        "Progressed from Customer Success to Portfolio Management, developing deep expertise in crypto asset management",
        "Designed and implemented comprehensive investment strategies for high-net-worth individuals and corporate clients",
        "Led educational initiatives to help clients understand blockchain technology and DeFi opportunities",
        "Conducted detailed market analysis and due diligence on emerging crypto projects and protocols"
      ]
    },
    {
      title: "Business Development Specialist",
      company: "Advanced Blockchain",
      date: "January 2019 — March 2019",
      points: [
        "Developed strategic partnerships with key players in the blockchain ecosystem to drive business growth",
        "Created comprehensive market analysis reports and technical documentation for blockchain solutions",
        "Coordinated with technical teams to align business development efforts with product capabilities",
        "Represented the company at industry events and managed relationships with strategic stakeholders"
      ]
    }
  ];

  /**
   * State variables
   */
  let activeTab = 0;
  let scrollContainer: HTMLElement;
  let expandedJobs = new Set<number>();  // Pour suivre quels jobs sont développés

  /**
   * Handles initial page load and scroll to section if URL contains hash
   */
  onMount(() => {
    const hash = window.location.hash.slice(1);
    
    if (hash === 'experience') {
      const unsubscribe = isPageLoaded.subscribe(loaded => {
        if (loaded) {
          setTimeout(() => {
            const section = document.getElementById('experience');
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
   * @param {number} index - Index of the active tab
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
   * @param {number} index - Index of the selected tab
   */
  function handleTabChange(index: number) {
    activeTab = index;
    scrollToActiveTab(index);
  }

  /**
   * Toggle l'expansion des points pour un job
   * @param {number} index - Index du job
   */
  function toggleJobPoints(index: number) {
    if (expandedJobs.has(index)) {
      expandedJobs.delete(index);
    } else {
      expandedJobs.add(index);
    }
    expandedJobs = expandedJobs; // Force Svelte reactivity
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

  /* Company name styling */
  .company {
    color: var(--color-orange);
  }

  /* Hide scrollbar while maintaining functionality */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* For IE and Edge */
    scrollbar-width: none;     /* For Firefox */
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* For Chrome, Safari and Opera */
  }

  /* Company link hover effect */
  .company-link {
    position: relative;
    display: inline-block;
  }

  .company-link :global(.underline) {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: var(--color-orange);
    transition: width 0.3s ease;
  }

  .company-link:hover :global(.underline) {
    width: 100%;
  }

  /* Bouton See More */
  .see-more-btn {
    color: var(--color-orange);
    border: 1px solid var(--color-orange);
    transition: all 0.3s ease;
  }

  .see-more-btn:hover {
    background-color: var(--color-orange-10);
  }

  /* Liens dans les points d'expérience */
  :global(li a.company-link) {
    color: var(--color-light);
    transition: color 0.3s ease;
  }

  :global(li a.company-link:hover) {
    color: var(--color-orange);
  }
</style>

<!-- Experience Section -->
<section id="experience" class="pt-16 pb-16 bg-dark scroll-mt-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <div 
      class="flex items-center gap-4 mb-8 md:mb-16"
      in:fly={{ y: 20, duration: 800 }}
    >
      <h2 class="text-2xl font-mono whitespace-nowrap">
        <span class="number">02.</span>
        <span class="text-light">Where I've Worked</span>
      </h2>
      <div class="h-[1px] w-32 md:w-96 bg-light/20"></div>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Liste des entreprises -->
      <div 
        class="md:w-52 w-full overflow-x-auto md:overflow-visible hide-scrollbar"
        bind:this={scrollContainer}
        in:fly={{ x: -20, duration: 800, delay: 200 }}
      >
        <div class="flex md:flex-col border-b md:border-b-0 md:border-l border-light/20 min-w-max md:min-w-0">
          {#each jobs as job, i}
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
              {job.company}
              {#if activeTab === i}
                <span class="absolute left-0 bottom-[-1px] md:bottom-0 md:left-[-1px] w-full h-[2px] md:h-full md:w-[2px] active-bar"></span>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Détails du poste -->
      <div 
        class="flex-1"
        in:fly={{ x: 20, duration: 800, delay: 300 }}
      >
        <h3 class="text-lg md:text-xl text-light mb-1 md:mb-2">
          <span class="mr-1">{jobs[activeTab].title}</span>
          <span class="company">@ 
            {#if jobs[activeTab].company !== "CryptoGuys"}
              <a 
                href={
                  jobs[activeTab].company === "AP3 Labs" ? "https://ap3labs.com/" :
                  jobs[activeTab].company === "Merkl" ? "https://merkl.angle.money/" :
                  jobs[activeTab].company === "Kaiko" ? "https://www.kaiko.com/" :
                  jobs[activeTab].company === "Coinhouse" ? "https://www.coinhouse.com/" :
                  jobs[activeTab].company === "Advanced Blockchain" ? "https://www.advancedblockchain.com/" :
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                class="company-link"
              >
                {jobs[activeTab].company}
                <span class="underline"></span>
              </a>
            {:else}
              <span>{jobs[activeTab].company}</span>
            {/if}
          </span>
        </h3>
        <p class="text-light/50 font-mono text-sm md:text-base mb-4">{jobs[activeTab].date}</p>
        <ul class="space-y-4">
          {#each jobs[activeTab].points as point, i}
            {#if i === 0 || expandedJobs.has(activeTab) || window.innerWidth >= 768}
              <li class="flex gap-2 text-light/70 text-base md:text-lg">
                <span class="arrow flex-shrink-0">▹</span>
                <span>{@html point}</span>
              </li>
            {/if}
          {/each}
          
          <!-- Bouton See More sur mobile uniquement -->
          {#if jobs[activeTab].points.length > 1 && window.innerWidth < 768}
            <button 
              class="see-more-btn mt-4 px-4 py-2 rounded-md text-sm font-mono w-full md:hidden"
              on:click={() => toggleJobPoints(activeTab)}
            >
              {expandedJobs.has(activeTab) ? 'Show Less' : 'See More'}
            </button>
          {/if}
        </ul>
      </div>
    </div>
  </div>
</section> 