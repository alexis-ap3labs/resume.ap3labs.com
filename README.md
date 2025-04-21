# Personal Portfolio

<div align="center">

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## Overview

Developer focused on DeFi integration with a background in finance and a deep understanding of crypto systems. This portfolio showcases my journey as a developer, built with modern web technologies including SvelteKit and Tailwind CSS for a smooth, responsive experience.

## Features

- Modern Design - Clean and professional user interface
- Fully Responsive - Perfect display on all devices
- Fast Performance - Optimized loading and smooth transitions
- Dynamic Content - Easy to update and maintain
- Dark Mode - Comfortable viewing experience
- Contact Form - Direct way to reach out

## Tech Stack

- Frontend Framework: SvelteKit
- Styling: Tailwind CSS
- Animations: Svelte Transitions
- Deployment: Vercel

## Development

1. Clone the repository
```bash
git clone https://github.com/your-username/portfolio.git
```

2. Install dependencies
```bash
cd portfolio
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── About.svelte
│   │   ├── Experience.svelte
│   │   ├── Projects.svelte
│   │   └── Contact.svelte
│   ├── routes/
│   └── static/
└── static/
    └── resume.pdf
```

## Screenshots

[Add screenshots of your portfolio here]

## Live Demo

[Add your deployed portfolio link here]

## Contact

Feel free to reach out if you have any questions or just want to connect!

- GitHub: [alexis-ap3labs](https://github.com/alexis-ap3labs)
- LinkedIn: [alexispierreprn](https://www.linkedin.com/in/alexispierreprn/)
- Email: [alexis@ap3labs.com](mailto:alexis@ap3labs.com)

## License

This project is open source and available under the MIT License.

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Configure SvelteKit adapter in `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter()
  }
};
```

3. Deploy to Vercel:
```bash
vercel
```

---
<div align="center">
Made with SvelteKit
</div>
