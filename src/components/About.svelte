<script lang="ts">
  /**
   * Array of technologies/skills to be displayed in the component
   * @type {string[]}
   */
  const technologies = [
    'Svelte/SvelteKit',
    'TypeScript',
    'Python/FastAPI',
    'Web3 Integration',
    'DeFi Protocols',
    'Smart Contracts'
  ];
</script>

<style>
  /* Styling for numbered sections */
  .number {
    color: var(--color-orange);
    opacity: 1;
  }

  /* Arrow bullet points styling */
  .arrow {
    color: var(--color-orange);
    opacity: 1;
  }

  /* Image hover effect styles */
  .image-overlay {
    background-color: var(--color-orange);
    opacity: 0.4;
    mix-blend-mode: color;
    transition: opacity 300ms ease;
  }

  .image-container:hover .image-overlay {
    opacity: 0;
  }

  /* Company link styles with animated underline */
  .company-link {
    color: var(--color-orange);
    position: relative;
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
</style>

<section id="about" class="pt-0 pb-16 bg-dark scroll-mt-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <div class="flex flex-col gap-8">
      <!-- Titre avec ligne -->
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-mono whitespace-nowrap">
          <span class="number">01.</span>
          <span class="text-light">About Me</span>
        </h2>
        <div class="h-[1px] w-32 bg-light/20"></div>
      </div>

      <!-- Contenu principal -->
      <div class="flex flex-col md:flex-row md:gap-16 gap-12">
        <!-- Image pour Mobile -->
        <div class="relative md:hidden flex justify-center w-full mb-0">
          <div class="relative w-full aspect-square max-w-[500px] rounded-lg overflow-hidden image-container">
            <img 
              src="profile.jpg" 
              alt="Alexis Péron"
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
            <div class="absolute inset-0 image-overlay"></div>
            <div class="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10"></div>
          </div>
        </div>

        <!-- Texte -->
        <div class="space-y-4 text-light/70 md:max-w-xl">
          <p 
            class="text-base md:text-lg leading-relaxed"
          >
            With a <span class="font-bold">background in finance</span>, I discovered blockchain technology and was immediately drawn to its potential. 
            This unique perspective led me to <span class="font-bold">development</span>, where I could actively contribute to building the systems I was studying.
          </p>

          <p 
            class="text-base md:text-lg leading-relaxed"
          >
            My journey includes working with 
            <a href="https://www.coinhouse.com" target="_blank" rel="noopener noreferrer" class="company-link inline">
              a leading crypto broker
              <span class="underline"></span>
            </a> and 
            <a href="https://www.kaiko.com" target="_blank" rel="noopener noreferrer" class="company-link inline">
              the crypto industry's most trusted data provider
              <span class="underline"></span>
            </a>.
            These experiences enhanced my <span class="font-bold">technical and financial expertise</span> in the crypto space.
          </p>

          <p 
            class="text-base md:text-lg leading-relaxed mb-8"
          >
            Here are some of the key technologies I work with:
          </p>

          <!-- Liste des technologies -->
          <ul 
            class="grid grid-cols-2 gap-2 text-sm md:text-base"
          >
            {#each technologies as tech}
              <li class="flex items-center gap-2">
                <span class="arrow">▹</span>
                {tech}
              </li>
            {/each}
          </ul>
        </div>

        <!-- Image pour Desktop (inchangée) -->
        <div class="relative hidden md:flex justify-start w-auto">
          <div class="relative w-[340px] h-[340px] rounded-lg overflow-hidden image-container">
            <img 
              src="profile.jpg" 
              alt="Alexis Péron"
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
            <div class="absolute inset-0 image-overlay"></div>
            <div class="absolute inset-0 border-2 border-primary rounded-lg translate-x-5 translate-y-5 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 