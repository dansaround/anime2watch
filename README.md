# Anime2Watch

Anime2Watch is a modern anime library showcasing a dynamic frontend using Next.js and other cutting-edge technologies.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Browse Animes:** View anime cards with essential details (name, format, episodes, categories, image, score, and status).
- **Favorites System:** Add and manage your favorite animes (stored in Local Storage).
- **Search Functionality:** Search and filter anime by name or categories.
- **Detailed View:** Access detailed information for each anime, including studio, summary, and more.
- **User Profiles:** Login and manage profiles using Clerk authentication.
- **SEO Optimized:** Meta tags, Open Graph tags, and SEO-friendly routes.
- **Responsive Design:** Built for all screen sizes with a mobile-first approach.
- **Animations:** Smooth animations powered by Framer Motion.

---

## Technologies

- **Framework:** Next.js
- **Styling:** TailwindCSS, Shadcn
- **Animations:** Framer Motion
- **API Integration:** Apollo GraphQL
- **Authentication:** Clerk
- **Hosting:** Vercel

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anime2watch.git
   cd anime2watch
   pnpm install
   ```

````

3. Set up environment variables:
 - Create a `.env.local` file in the root directory.
 - Add the required environment variables. For example:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-api-key>
   APOLLO_SERVER_URI=<your-graphql-endpoint>
   ```
 - Replace `<your-clerk-api-key>` and `<your-graphql-endpoint>` with the actual values for your project.

4. Run the development server:
 ```bash
 pnpm run dev
 pnpm run build
````

5. Start the production server:
   ```
   bash
   npm run start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Explore the homepage to browse the anime library:
   - View featured content in the banner section.
   - Use pagination to navigate through the anime list.
   - View anime cards with essential details (name, format, episodes, categories, image, score, and status).
3. Add animes to your favorites by clicking the "Add to Favorites" button:
   - Manage your saved favorites on the dedicated Favorites page.
   - Filter your favorites by status or category.
4. Use the search bar to find specific animes:
   - Search by name or use the available filters for more precise results.
5. Click on an anime card to access the Detail Page:
   - View complete information, including studio, summary, and seasonal details.
6. Log in or sign up via Clerk to access user-specific features like profiles.

---

## Project Structure

The project is organized as follows:

anime2watch/ ├── components/ # Reusable UI components such as headers, footers, and cards. ├── pages/ # Next.js pages including home, favorites, and detail views. ├── public/ # Static assets such as images and icons. ├── styles/ # Global styles and TailwindCSS configuration. ├── utils/ # Helper functions and utility methods. ├── graphql/ # Apollo GraphQL queries and mutations for API interactions. ├── .env.local # Environment variables (not included in the repository for security). └── README.md # Documentation for the project.

## Each directory is structured to ensure modularity and maintainability, making it easier to extend or refactor.

## Features

1. **Homepage:**

   - Displays anime cards with basic details such as name, format, episodes, categories, score, and status.
   - Includes a banner section for featured content.
   - Supports pagination for navigating through the anime library.

2. **Favorites System:**

   - Add animes to favorites using Local Storage.
   - Manage and view favorites on a dedicated page.
   - Filter favorites by status or category.

3. **Search Functionality:**

   - Search animes by name.
   - Apply filters to refine search results.

4. **Detail Page:**

   - View detailed information for each anime, including studio, summary, and seasonal details.

5. **Responsive Design:**

   - Fully responsive layout for a seamless experience across desktop, tablet, and mobile devices.

6. **Animations:**

   - Smooth transitions and interactions using Framer Motion.

7. **Authentication:**

   - User login and profile management powered by Clerk.

8. **SEO Optimization:**

   - Meta tags, Open Graph tags, and SEO-friendly routes for better search engine visibility.

9. **Error Handling:**
   - Informative error messages and loading indicators for a smooth user experience.

---

## How to Contribute

We welcome contributions to enhance Anime2Watch. To get started:

1. Fork the repository.
2. Clone the forked repository:
   ```bash
   git clone https://github.com/your-username/anime2watch.git
   cd anime2watch
   ```
3. Create a new branch for your feature or fix:

```
bash
git checkout -b feature-name
```

4. Make your changes and ensure code quality:

- Run linting: npm run lint
- Run tests: npm run test

5. Commit your changes:

```
bash
git commit -m "Add feature or fix description"
```

5. Push the branch to your forked repository:

```
bash
git push origin feature-name
```

7. Open a Pull Request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute this project under the terms of the license. For more details, please refer to the `LICENSE` file included in the repository.

---

## Contact

If you have any questions, feedback, or suggestions, feel free to reach out:

- **GitHub:** [dansaround](https://github.com/dansaround)
- **LinkedIn:** [Daniel Kcomt](https://linkedin.com/in/daniel-kcomt-frontend-developer/)
- **Email:** [your.email@example.com] (Replace with your actual email if you'd like to share it.)

We appreciate your interest in Anime2Watch and look forward to your contributions!

---

## Acknowledgments

- Data sourced from [Anilist](https://anilist.co/) for mock data and inspiration.
- Frameworks and tools used:
  - [Next.js](https://nextjs.org/) for Server-Side Rendering and Static Site Generation.
  - [Apollo GraphQL](https://www.apollographql.com/) for API integration.
  - [TailwindCSS](https://tailwindcss.com/) for styling.
  - [Clerk](https://clerk.dev/) for authentication.
  - [Framer Motion](https://www.framer.com/motion/) for animations.
- Thanks to the open-source community for providing incredible resources and libraries.

---

## Future Improvements

Here are some ideas for future development:

- **Dark Mode:** Add support for a dark theme.
- **Recommendations:** Provide anime suggestions based on user preferences.
- **Advanced Filters:** Include more granular filtering options (e.g., by studio, release year).
- **User Reviews:** Allow users to leave reviews or ratings for their favorite animes.
- **Backend Integration:** Replace mock data with live data from an external API.

Feel free to contribute any of these features or suggest new ones!

---

Thank you for exploring Anime2Watch! 🎉
