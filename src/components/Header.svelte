<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
  
    let lastScrollY = 0;
    let isNavVisible = true;
    let hasScrolled = false;
    let isMenuOpen = false;
    let isHeaderMounted = false;
    export let activeSection = '';
  
    $: isActive = (section: string) => {
        return activeSection === section;
    };

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    const handleLinkClick = () => {
        isMenuOpen = false;
    };
  
    onMount(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            isNavVisible = currentScrollY < lastScrollY || currentScrollY < 50;
            hasScrolled = currentScrollY > 50;
            lastScrollY = currentScrollY;
        };
  
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Délai plus long avant le début des animations
        setTimeout(() => {
            isHeaderMounted = true;
        }, 300);
  
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>
  
<style>
    .number {
      color: #FFA33C;  /* Orange très lumineux avec une touche de jaune */
      opacity: 1 !important; /* Force l'opacité à rester à 1 */
    }

    .resume-button {
      color: #FFA33C;
      border-color: #FFA33C;
    }

    .resume-button :global(.fill) {
      background-color: rgba(255, 163, 60, 0.1);
    }

    .active-link {
      color: #FFA33C !important;
    }

    .hamburger {
        display: none;
    }

    .nav-links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3rem;
    }

    @media (max-width: 768px) {
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .hamburger {
            display: block;
            cursor: pointer;
            z-index: 20;
            position: relative;
        }

        .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background-color: rgb(17, 17, 17, 0.97); /* Même couleur que bg-dark avec légère transparence */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            gap: 2rem;
            z-index: 10;
        }

        .nav-links li {
            width: 100%;
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .nav-links.open {
            transform: translateX(0);
        }

        .nav-links.open li {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-links a {
            justify-content: center;
            font-size: 1.25rem;
        }

        .nav-links .resume-button {
            margin-top: 2rem;
            width: fit-content;
        }

        :global(.mobile-menu-overlay) {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease-in-out;
        }

        :global(.mobile-menu-overlay.open) {
            opacity: 1;
            pointer-events: auto;
        }
    }

    .hamburger span {
        @apply bg-[#FFA33C]; /* Utilise la même couleur orange que les autres éléments */
    }
</style>
  
<header 
    class="fixed top-0 left-0 right-0 z-50 bg-dark transition-all duration-300 {hasScrolled ? 'shadow-lg shadow-dark/50' : ''}"
    class:translate-y-[-100%]={!isNavVisible}
    class:opacity-0={!isNavVisible}
>
    <nav class="max-w-screen-2xl mx-auto px-6 md:px-12 py-8 relative">
        <!-- Logo -->
        {#if isHeaderMounted}
            <a 
                href="/" 
                class="absolute left-6 md:left-12 top-1/2 -translate-y-1/2"
                in:fly={{ y: -20, duration: 800 }}
            >
                <img src="ap3labs_logo.webp" alt="Logo" class="w-20 h-20 md:w-24 md:h-24 object-contain" />
            </a>

            <!-- Navigation Links -->
            <ul class="nav-links text-light/60" class:open={isMenuOpen}>
                <li in:fly={{ y: -20, duration: 800, delay: 200 }}>
                    <a 
                        href="/#about" 
                        class="group flex items-center gap-2 hover:text-primary transition-colors"
                        class:active-link={isActive('about')}
                        on:click={handleLinkClick}
                    >
                        <span class="number text-sm">01.</span>
                        <span class="relative">
                            About
                            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </a>
                </li>
                <li in:fly={{ y: -20, duration: 800, delay: 300 }}>
                    <a 
                        href="/#experience" 
                        class="group flex items-center gap-2 hover:text-primary transition-colors"
                        class:active-link={isActive('experience')}
                        on:click={handleLinkClick}
                    >
                        <span class="number text-sm">02.</span>
                        <span class="relative">
                            Experience
                            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </a>
                </li>
                <li in:fly={{ y: -20, duration: 800, delay: 400 }}>
                    <a 
                        href="/#projects" 
                        class="group flex items-center gap-2 hover:text-primary transition-colors"
                        class:active-link={isActive('projects')}
                        on:click={handleLinkClick}
                    >
                        <span class="number text-sm">03.</span>
                        <span class="relative">
                            Work
                            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </a>
                </li>
                <li in:fly={{ y: -20, duration: 800, delay: 500 }}>
                    <a 
                        href="/#contact" 
                        class="group flex items-center gap-2 hover:text-primary transition-colors"
                        class:active-link={isActive('contact')}
                        on:click={handleLinkClick}
                    >
                        <span class="number text-sm">04.</span>
                        <span class="relative">
                            Contact
                            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </a>
                </li>
                <li in:fly={{ y: -20, duration: 800, delay: 600 }}>
                    <a 
                        href="#" 
                        class="cursor-not-allowed opacity-50"
                        on:click|preventDefault
                    >
                        Resume
                    </a>
                </li>
            </ul>
        {/if}

        <!-- Hamburger Menu Button -->
        {#if isHeaderMounted}
            <button 
                class="hamburger"
                on:click={toggleMenu}
                aria-label="Toggle menu"
                in:fly={{ y: -20, duration: 800, delay: 700 }}
            >
                <div class="flex flex-col gap-1.5">
                    <span class="block w-6 h-0.5 bg-[#FFA33C] transition-transform duration-300" class:rotate-45={isMenuOpen} class:translate-y-2={isMenuOpen}></span>
                    <span class="block w-6 h-0.5 bg-[#FFA33C] transition-opacity duration-300" class:opacity-0={isMenuOpen}></span>
                    <span class="block w-6 h-0.5 bg-[#FFA33C] transition-transform duration-300" class:-rotate-45={isMenuOpen} class:-translate-y-2={isMenuOpen}></span>
                </div>
            </button>
        {/if}

        <!-- Mobile Menu Overlay -->
        <div 
            class="mobile-menu-overlay"
            class:open={isMenuOpen}
            on:click={() => isMenuOpen = false}
        ></div>
    </nav>
    <!-- Divider -->
    <div 
        class="h-[1px] w-full bg-light/10 transition-opacity duration-300"
        class:opacity-0={!hasScrolled}
    ></div>
</header> 