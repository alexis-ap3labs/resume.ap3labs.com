<script lang="ts">
  const technologies = [
    'JavaScript',
    'TypeScript',
    'Svelte',
    'Python',
    'HTML',
    'CSS'
  ];
</script>

<style>
  .number {
    color: #FFA33C;  /* Orange très lumineux avec une touche de jaune */
    opacity: 1;
  }

  .arrow {
    color: #FFA33C;
    opacity: 1;
  }

  .image-overlay {
    background-color: #FFA33C;
    opacity: 0.4;
    mix-blend-mode: color;
    transition: opacity 300ms ease;
  }

  .image-container:hover .image-overlay {
    opacity: 0;
  }

  /* Modification des styles pour les liens */
  .company-link {
    color: #FFA33C;
    position: relative;
    display: inline-block;
  }

  .company-link :global(.underline) {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #FFA33C;
    transition: width 0.3s ease;
  }

  .company-link:hover :global(.underline) {
    width: 100%;
  }
</style>

<section id="about" class="pt-0 pb-24 bg-dark scroll-mt-20">
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
        <!-- Texte -->
        <div class="space-y-4 text-light/70 md:max-w-xl">
          <p 
            class="text-base md:text-lg leading-relaxed"
          >
            Starting with a strong financial background, I gradually developed a deep fascination for the technical aspects 
            of blockchain systems. This dual perspective led me to naturally evolve into development, as I wanted to understand 
            and build the very mechanisms I was analyzing.
          </p>

          <p 
            class="text-base md:text-lg leading-relaxed"
          >
            Throughout my career, I've had the opportunity to work with 
            <a href="https://www.coinhouse.com" target="_blank" rel="noopener noreferrer" class="company-link">
              a leading crypto broker
              <span class="underline"></span>
            </a> and 
            <a href="https://www.kaiko.com" target="_blank" rel="noopener noreferrer" class="company-link">
              the industry's most trusted data provider
              <span class="underline"></span>
            </a>. 
            Each role has enriched my understanding of both the technical and financial aspects of decentralized systems, 
            allowing me to bridge the gap between complex DeFi mechanisms and practical applications at 
            <span class="text-light/70">AP3 Labs</span>.
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

        <!-- Image -->
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