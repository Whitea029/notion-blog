# Project Overview

This project is a statically generated blog that uses Notion as a headless CMS and Hugo for building the site. The content is written in Notion, and then a TypeScript script fetches the content from the Notion API, converts it to Markdown, and places it in the `content` directory for Hugo to process. The site is deployed to Cloudflare Pages.

The main technologies used are:

*   **Notion:** As the content management system (CMS).
*   **Hugo:** As the static site generator.
*   **TypeScript:** For the script that fetches content from Notion.
*   **Cloudflare Pages:** For hosting the static site.

## Building and Running

To build and run the project, you will need to have Node.js and Hugo installed.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Sync content from Notion:**

    Create a `.env` file in the root of the project and add your Notion API token:

    ```
    NOTION_TOKEN=<your-notion-token>
    ```

    Then run the following command to fetch the content from Notion:

    ```bash
    npm start
    ```

3.  **Run the Hugo server:**

    ```bash
    npm run server
    ```

    This will start the Hugo development server, and you can view the site at `http://localhost:1313`.

## Development Conventions

*   The TypeScript code is located in the `src` directory.
*   The main entry point for the Notion sync script is `src/index.ts`.
*   The configuration for the Notion sync is in `notion-hugo.config.ts`.
*   The Hugo configuration is in the `config` directory.
*   The Hugo theme is located in the `themes/dream` directory.
*   The generated Markdown files are placed in the `content` directory.
