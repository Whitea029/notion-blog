# Project: Notion-Hugo Blog

## Project Overview

This project is a personal blog that uses Notion as a Content Management System (CMS) and Hugo as a static site generator. The content is written in Notion, and then a TypeScript script fetches the content from the Notion API, converts it to Markdown, and places it in the `content` directory. Hugo then uses this content to build the static website. The site is deployed to Cloudflare Pages.

The main technologies used are:

*   **Notion:** As the CMS for writing and managing blog posts.
*   **Hugo:** As the static site generator.
*   **TypeScript:** For the script that fetches content from Notion.
*   **Cloudflare Pages:** For hosting the static website.

The project is structured as follows:

*   `notion-hugo.config.ts`: Configuration file for the Notion to Hugo synchronization.
*   `config/_default/config.toml`: Main configuration file for Hugo.
*   `content/`: Directory where the Markdown files generated from Notion are stored.
*   `src/`: Contains the TypeScript source code for fetching and converting Notion content.
*   `themes/`: Contains the Hugo theme used for the website.
*   `.github/workflows/`: Contains the GitHub Actions workflows for continuous integration and deployment.

## Building and Running

To build and run the project locally, you need to have Node.js and Hugo installed.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Fetch content from Notion:**

    Create a `.env` file in the root of the project and add your Notion API token:

    ```
    NOTION_TOKEN=<your_notion_token>
    ```

    Then, run the following command to fetch the content from Notion:

    ```bash
    npm start
    ```

3.  **Run the Hugo server:**

    ```bash
    npm run server
    ```

    This will start the Hugo development server, and you can view the website at `http://localhost:1313`.

## Development Conventions

*   **Content:** All blog posts are written and managed in Notion. To create a new post, add a new page to the Notion database specified in `notion-hugo.config.ts`.
*   **Styling:** The website's styling is primarily controlled by the Hugo theme in the `themes/` directory. Custom CSS can be added to `static/css/custom.css`.
*   **Deployment:** The website is automatically deployed to Cloudflare Pages whenever changes are pushed to the `main` branch. The deployment workflow is defined in `.github/workflows/cd.yml`.
