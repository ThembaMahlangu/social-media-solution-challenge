# ArticleAI Pro

## Overview

ArticleAI Pro is a platform designed to streamline the process of generating social media content from news articles. Users can register or log in, enter a link to an article from a news website, and the system will analyze and process the content. After review, users can generate social media posts tailored for LinkedIn, Twitter, and Facebook. These posts can then be directly posted to linked social media accounts via the AyrShare API.

## Features

- **User Authentication:** Secure login and registration system.
- **Article Analysis:** Input a news article link for the system to analyze.
- **Social Media Post Generation:** AI-generated posts for LinkedIn, Twitter, and Facebook using OpenAI.
- **Direct Posting:** Post the generated content directly to social media accounts via AyrShare API.
- **Dashboard:** User-friendly interface with a dashboard to manage links and posts.

## Tech Stack

- **Framework:** Next.js (v14.2.4)
- **Database:** MongoDB for user storage
- **AI Integration:** OpenAI API for generating social media posts
- **Web Scraping:** Puppeteer for extracting content from news articles
- **Styling:** Tailwind CSS and Shadcn/UI for a modern and responsive UI

## Installation

### Prerequisites

- **Git:** For cloning the repository
- **Node.js:** Ensure Node.js is installed on your machine
- **AyrshareAPI** Create an account to get your api key at https://www.ayrshare.com
- **OpenAI API Key** Create an account and get your api key at https://platform.openai.com

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd social-media-solution-challenge
   ```

2. **Install dependencies:**
   - Using npm:
     ```bash
     npm install
     ```
   - Or using bun:
     ```bash
     bun install
     ```

3. **Run the project locally:**
   - Using npm:
     ```bash
     npm run dev
     ```
   - Or using bun:
     ```bash
     bun run dev
     ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

- `OPENAI_API_KEY`
- `MONGODB_URI`
- `DB_NAME`
- `JWT_SECRET`
- `AYRSHARE_API_KEY`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
