<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { browser } from '$app/environment';
  
    /**
     * Props
     */
    export let activeSection = '';
  
    /**
     * State variables
     */
    let lastScrollY = 0;
    let isNavVisible = true;
    let hasScrolled = false;
    let isMenuOpen = false;
    let isHeaderMounted = false;
  
    /**
     * Checks if a section is currently active
     * @param {string} section - Section identifier
     * @returns {boolean}
     */
    $: isActive = (section: string) => {
        return activeSection === section;
    };

    /**
     * Toggles mobile menu state
     */
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    /**
     * Closes mobile menu when a link is clicked
     */
    const handleLinkClick = () => {
        isMenuOpen = false;
    };

    /**
     * Generates and downloads PDF resume
     */
    const generatePDF = async () => {
        // Only run in browser
        if (!browser) return;
        
        // Dynamically import html2pdf only on client side
        const html2pdf = (await import('html2pdf.js')).default;
        
        // Create PDF content
        // Get the photo from static folder
        const photoUrl = `${window.location.origin}/alexis-peron.jpeg`;
        
        const resumeContent = document.createElement('div');
        resumeContent.innerHTML = `
            <style>
                body, html { 
                    background: linear-gradient(135deg, rgba(255, 163, 60, 0.03) 0%, rgba(240, 240, 245, 0.5) 100%);
                    margin: 0;
                    padding: 0;
                }
                a { color: #FFA33C; text-decoration: none; }
                a:hover { text-decoration: underline; opacity: 0.8; }
            </style>
            <div style="font-family: Arial, sans-serif; padding: 40px; color: #0a192f; max-width: 210mm;">
                <!-- Header with Photo and About -->
                <div style="margin-bottom: 20px;">
                    <!-- Top section: Photo + Social Links + Info + First paragraph -->
                    <div style="display: flex; gap: 25px; margin-bottom: 15px;">
                        <!-- Photo + Social Links -->
                        <div style="flex-shrink: 0;">
                            <img src="${photoUrl}" alt="Alexis Péron" style="width: 200px; height: 200px; border-radius: 12px; object-fit: cover; border: 3px solid #FFA33C; margin-bottom: 12px;" />
                            
                            <!-- Social Links under photo -->
                            <div style="display: flex; gap: 10px; justify-content: center;">
                                <a href="https://x.com/alexis_ap3labs" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 2px solid #FFA33C; border-radius: 6px; text-decoration: none; color: #FFA33C; transition: background-color 0.3s;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/alexis-peron/" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 2px solid #FFA33C; border-radius: 6px; text-decoration: none; color: #FFA33C; transition: background-color 0.3s;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                                <a href="https://github.com/alexis-ap3labs" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 2px solid #FFA33C; border-radius: 6px; text-decoration: none; color: #FFA33C; transition: background-color 0.3s;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                                        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://resume.ap3labs.com" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 2px solid #FFA33C; border-radius: 6px; text-decoration: none; color: #FFA33C; transition: background-color 0.3s;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Info and About paragraphs -->
                        <div style="flex: 1;">
                            <h1 style="color: #FFA33C; font-size: 28px; margin-bottom: 5px; margin-top: 0;">Alexis Péron</h1>
                            <p style="font-size: 16px; color: #64748b; margin-bottom: 8px; font-weight: 600;">DeFi Builder</p>
                            <p style="font-size: 12px; color: #64748b; margin-bottom: 15px;">alexis@ap3labs.com | ap3labs.com</p>
                            
                            <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin: 0;">
                                As a long-time DeFi builder, I work across end-to-end onchain systems: from strategy and risk to vault infrastructure, protocol integrations, APIs, and user-facing products.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Experience -->
                <div style="margin-bottom: 25px;">
                    <h2 style="color: #FFA33C; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #FFA33C; padding-bottom: 5px;">Experience</h2>
                    
                    <div style="margin-bottom: 20px; page-break-inside: avoid;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">DeFi Ops & Account Management @ <a href="https://merkl.xyz/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">Merkl</a></h3>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">October 2024 — Present</p>
                        <ul style="font-size: 13px; color: #64748b; line-height: 1.6; padding-left: 20px;">
                            <li>Parsed Merkl API data to validate incentive campaigns (eligibility conditions + reward computations).</li>
                            <li>Scoped integrations with partners to translate their incentive goals into campaign specs.</li>
                            <li>Supported partners through rollout, troubleshooting issues and ensuring smooth attribution + distribution.</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px; page-break-inside: avoid;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Full Stack Developer @ <a href="https://ap3labs.com" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">AP3 Labs</a></h3>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">September 2023 — Present</p>
                        <ul style="font-size: 13px; color: #64748b; line-height: 1.6; padding-left: 20px;">
                            <li>Built <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">DeTrade</a>: ERC-4626 yield platform with vault integrations and monitoring/oracles.</li>
                            <li>Designed proprietary NAV oracle aggregating positions across lending, perps, and concentrated liquidity.</li>
                            <li>Contributed to perp DEX core mechanisms and liquidity pool design.</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px; page-break-inside: avoid;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Index Research Analyst @ <a href="https://www.kaiko.com/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">Kaiko</a></h3>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">August 2022 — August 2023</p>
                        <ul style="font-size: 13px; color: #64748b; line-height: 1.6; padding-left: 20px;">
                            <li>Developed and maintained market-cap-weighted cryptocurrency indices.</li>
                            <li>Built quantitative models to estimate token supply for top 100 digital assets.</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px; page-break-inside: avoid;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Co-founder @ <span style="color: #0a192f;">CryptoGuys</span></h3>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">July 2021 — August 2022</p>
                        <ul style="font-size: 13px; color: #64748b; line-height: 1.6; padding-left: 20px;">
                            <li>Designed automated crypto trading infrastructure connecting multiple exchanges.</li>
                            <li>Developed trading strategies integrating technical analysis and sentiment indicators.</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px; page-break-inside: avoid;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Various Roles @ <a href="https://www.coinhouse.com/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">Coinhouse</a></h3>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">May 2018 — July 2021</p>
                        <ul style="font-size: 13px; color: #64748b; line-height: 1.6; padding-left: 20px;">
                            <li>Progressed from Customer Success to Portfolio Management.</li>
                            <li>Designed investment strategies for high-net-worth individuals and corporate clients.</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px; page-break-inside: avoid;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Business Development Specialist @ <a href="https://www.advancedblockchain.com/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">Advanced Blockchain</a></h3>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">January 2019 — March 2019</p>
                        <ul style="font-size: 13px; color: #64748b; line-height: 1.6; padding-left: 20px;">
                            <li>Developed strategic partnerships in the blockchain ecosystem.</li>
                            <li>Created market analysis reports and technical documentation.</li>
                        </ul>
                    </div>
                </div>

                <!-- Skills -->
                <div style="margin-bottom: 25px; margin-top: 30px; page-break-inside: avoid;">
                    <h2 style="color: #FFA33C; font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid #FFA33C; padding-bottom: 5px;">Technical Stack</h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px 15px; font-size: 13px; color: #64748b;">
                        <span>▹ Svelte / SvelteKit</span>
                        <span>▹ TypeScript</span>
                        <span>▹ Python</span>
                        <span>▹ EVM (RPCs, ABIs, transactions)</span>
                        <span>▹ MongoDB</span>
                        <span>▹ GitHub Actions (automation)</span>
                    </div>
                </div>

                <!-- Education -->
                <div style="margin-bottom: 25px; page-break-inside: avoid;">
                    <h2 style="color: #FFA33C; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #FFA33C; padding-bottom: 5px;">Education</h2>
                    
                    <div style="margin-bottom: 15px;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 3px;">M2 Finance Tech Data</h3>
                        <p style="font-size: 14px; color: #64748b; margin-bottom: 3px;"><a href="https://www.pantheonsorbonne.fr/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">Panthéon-Sorbonne</a></p>
                        <p style="font-size: 12px; color: #94a3b8;">2020 - 2021</p>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 3px;">MBA, Business Administration and Management</h3>
                        <p style="font-size: 14px; color: #64748b; margin-bottom: 3px;"><a href="https://www.fdc.edu.br/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">Fundação Dom Cabral</a></p>
                        <p style="font-size: 12px; color: #94a3b8;">2019 - 2020 | Belo Horizonte, Brazil</p>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 3px;">MBA, Business Administration and Management</h3>
                        <p style="font-size: 14px; color: #64748b; margin-bottom: 3px;"><a href="https://www.skema-bs.fr/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">SKEMA Business School</a></p>
                        <p style="font-size: 12px; color: #94a3b8;">2019 - 2020</p>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 3px;">Certification AMF</h3>
                        <p style="font-size: 14px; color: #64748b; margin-bottom: 3px;"><a href="https://www.afg.asso.fr/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">AFG - Association Française de la Gestion financière</a></p>
                        <p style="font-size: 12px; color: #94a3b8;">Issued Dec 2019 | Credential ID: 500187485</p>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 3px;">Préparation aux Grandes Écoles</h3>
                        <p style="font-size: 14px; color: #64748b; margin-bottom: 3px;"><a href="https://www.lfv.at/" target="_blank" rel="noopener noreferrer" style="color: #FFA33C; text-decoration: none;">Lycée Français de Vienne</a></p>
                        <p style="font-size: 12px; color: #94a3b8;">2016 | Economics and Social Sciences</p>
                    </div>
                </div>

                <!-- Hobbies & Interests -->
                <div style="margin-bottom: 25px; page-break-inside: avoid;">
                    <h2 style="color: #FFA33C; font-size: 20px; margin-bottom: 10px; border-bottom: 2px solid #FFA33C; padding-bottom: 5px;">Hobbies & Interests</h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px 15px; font-size: 13px; color: #64748b;">
                        <span>▹ Hiking & Trekking</span>
                        <span>▹ Racket Sports</span>
                        <span>▹ Real Estate Investing</span>
                        <span>▹ Sports & Fitness</span>
                        <span>▹ AI Curiosity</span>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="font-size: 12px; color: #94a3b8;">Generated from resume.ap3labs.com</p>
                </div>
            </div>
        `;

        const opt = {
            margin: 0,
            filename: 'Alexis_Peron_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            await html2pdf().set(opt).from(resumeContent).save();
            handleLinkClick(); // Close mobile menu after download
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
  
    /**
     * Initializes header animations and scroll behavior
     */
    onMount(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            isNavVisible = currentScrollY < lastScrollY || currentScrollY < 50;
            hasScrolled = currentScrollY > 50;
            lastScrollY = currentScrollY;
        };
  
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Delay header animations
        setTimeout(() => {
            isHeaderMounted = true;
        }, 300);
  
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>
  
<style>
    /* Section number styling */
    .number {
      color: var(--color-orange);
      opacity: 1 !important;
    }

    /* Resume button styling */
    .resume-button {
      color: var(--color-orange);
      border-color: var(--color-orange);
    }

    .resume-button :global(.fill) {
      background-color: var(--color-orange-10);
    }

    /* Active link styling */
    .active-link {
      color: var(--color-orange) !important;
    }

    /* Mobile menu styles */
    .hamburger {
        display: none;
    }

    .nav-links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3rem;
    }

    /* Mobile responsive styles */
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
            position: absolute;
            right: 1.5rem;  /* 24px from the right edge */
            top: 50%;      /* Center vertically */
            transform: translateY(-50%);
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
        @apply bg-[var(--color-orange)];
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
              href="https://ap3labs.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="absolute left-6 md:left-12 top-1/2 -translate-y-1/2"
              in:fly={{ y: -20, duration: 800 }}
            >
              <img src="ap3labs_logo.webp" alt="Logo" class="w-20 h-20 md:w-24 md:h-24 object-contain" />
            </a>
        {/if}

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
                    href="/#education" 
                    class="group flex items-center gap-2 hover:text-primary transition-colors"
                    class:active-link={isActive('education')}
                    on:click={handleLinkClick}
                >
                    <span class="number text-sm">03.</span>
                    <span class="relative">
                        Education
                        <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                </a>
            </li>
            <li in:fly={{ y: -20, duration: 800, delay: 500 }}>
                <a 
                    href="/#projects" 
                    class="group flex items-center gap-2 hover:text-primary transition-colors"
                    class:active-link={isActive('projects')}
                    on:click={handleLinkClick}
                >
                    <span class="number text-sm">04.</span>
                    <span class="relative">
                        Work
                        <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                </a>
            </li>
            <li in:fly={{ y: -20, duration: 800, delay: 600 }}>
                <a 
                    href="/#contact" 
                    class="group flex items-center gap-2 hover:text-primary transition-colors"
                    class:active-link={isActive('contact')}
                    on:click={handleLinkClick}
                >
                    <span class="number text-sm">05.</span>
                    <span class="relative">
                        Contact
                        <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                </a>
            </li>
            <li in:fly={{ y: -20, duration: 800, delay: 700 }}>
                <button
                    on:click={generatePDF}
                    class="resume-button group relative inline-block px-4 py-2 rounded border overflow-hidden transition-colors duration-300"
                >
                    <span class="fill absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                    <span class="relative z-10">Resume</span>
                </button>
            </li>
        </ul>

        <!-- Hamburger Menu Button -->
        {#if isHeaderMounted}
            <button 
                class="hamburger"
                on:click={toggleMenu}
                aria-label="Toggle menu"
                in:fly={{ y: -20, duration: 800, delay: 800 }}
            >
                <div class="flex flex-col gap-1.5">
                    <span class="block w-6 h-0.5 bg-[var(--color-orange)] transition-transform duration-300" class:rotate-45={isMenuOpen} class:translate-y-2={isMenuOpen}></span>
                    <span class="block w-6 h-0.5 bg-[var(--color-orange)] transition-opacity duration-300" class:opacity-0={isMenuOpen}></span>
                    <span class="block w-6 h-0.5 bg-[var(--color-orange)] transition-transform duration-300" class:-rotate-45={isMenuOpen} class:-translate-y-2={isMenuOpen}></span>
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