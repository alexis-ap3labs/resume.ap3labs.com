<script lang="ts">
  import { fade } from 'svelte/transition';
  export let isOpen = false;
  export let onClose: () => void;

  let name = '';
  let email = '';
  let message = '';
  let isLoading = false;
  let errorMessage = '';

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isLoading = true;
    errorMessage = '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      
      // Réinitialiser le formulaire
      name = '';
      email = '';
      message = '';
      
      onClose();
      alert('Message sent successfully!');
    } catch (error: unknown) {
      errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again.';
    } finally {
      isLoading = false;
    }
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
    transition:fade
    on:click={onClose}
  >
    <div
      class="bg-[#171717] rounded-lg p-6 w-full max-w-md border border-light/10"
      on:click|stopPropagation
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-light">Get in Touch</h2>
        <button
          class="text-light/50 hover:text-light/80 transition-colors"
          on:click={onClose}
        >
          ✕
        </button>
      </div>

      <form on:submit={handleSubmit} class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-light/80">Name</label>
          <input
            type="text"
            id="name"
            bind:value={name}
            required
            class="mt-1 block w-full rounded-md bg-[#171717] border-light/10 text-light shadow-sm 
                   focus:border-[#FFA33C] focus:ring-[#FFA33C] focus:ring-opacity-50"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-light/80">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            class="mt-1 block w-full rounded-md bg-[#171717] border-light/10 text-light shadow-sm 
                   focus:border-[#FFA33C] focus:ring-[#FFA33C] focus:ring-opacity-50"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-light/80">Message</label>
          <textarea
            id="message"
            bind:value={message}
            required
            rows="4"
            class="mt-1 block w-full rounded-md bg-[#171717] border-light/10 text-light shadow-sm 
                   focus:border-[#FFA33C] focus:ring-[#FFA33C] focus:ring-opacity-50"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          class="w-full contact-button group relative inline-block px-6 py-3 rounded border
                 overflow-hidden transition-colors duration-300 {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
        >
          <!-- Effet de remplissage -->
          <span class="fill absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
          
          <!-- Effet de brillance -->
          <span class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                       translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
          
          <!-- Texte -->
          <span class="relative z-10">
            {isLoading ? 'Sending...' : 'Send Message'}
          </span>
        </button>
      </form>

      {#if errorMessage}
        <p class="mt-2 text-red-500 text-sm">{errorMessage}</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .contact-button {
    color: #FFA33C;
    border-color: #FFA33C;
  }

  .contact-button :global(.fill) {
    background-color: rgba(255, 163, 60, 0.1);
  }
</style> 