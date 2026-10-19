# Dependabot Dashboard

A Next.js dashboard for monitoring Dependabot pull requests across repositories. It displays pull request and repository summary counts, reports repository-level errors, and lets you refresh the results or clear the backend cache. The dashboard also supports light, dark, and system themes.

The UI is a client for an external API; the backend is not included in this repository.

## Requirements

- Node.js (use a version supported by Next.js 15)
- npm
- Access to a backend that implements the API described below

## Getting started

Install dependencies and configure the API URL:

```bash
npm ci
```

Create `.env.local` in the project root:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Set the value to the backend's base URL, without a trailing slash. Because this value is exposed to the browser, use a URL the browser can reach. For a backend hosted on another origin, configure it to allow requests from the dashboard's origin.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server with Turbopack |
| `npm run build` | Create a production build with Turbopack |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test -- --run` | Run the Vitest suite once |
| `npm run test:ui` | Open the Vitest UI |
| `npm run test:coverage` | Run tests and collect coverage |

For production, set `NEXT_PUBLIC_API_BASE_URL` to the backend URL before building, then run:

```bash
npm run build
npm run start
```

## API

The frontend calls these endpoints at `NEXT_PUBLIC_API_BASE_URL`:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/prs` | Return pull requests, repository errors, and summary information |
| `DELETE` | `/api/cache` | Clear the backend cache |

`GET /api/prs` should return JSON matching this shape:

```json
{
  "data": [
    {
      "id": 123,
      "title": "Bump example from 1.0.0 to 1.0.1",
      "url": "https://github.com/example/project/pull/123",
      "repo": "example/project",
      "createdAt": "2025-01-01T12:00:00Z",
      "updatedAt": "2025-01-02T12:00:00Z"
    }
  ],
  "errors": [
    {
      "repo": "example/another-project",
      "error": "Unable to retrieve pull requests",
      "code": "optional-error-code"
    }
  ],
  "count": 1,
  "fromCache": false,
  "generatedAt": "2025-01-02T12:00:00Z",
  "summary": {
    "totalReposQueried": 2,
    "successfulRepos": 1,
    "failedRepos": 1
  }
}
```

The `errors` array can be empty, and each repository error may include an optional `code`. Both endpoints must return a successful HTTP status when the operation succeeds; the frontend displays an error when a request fails.

## Project structure

```text
src/
  app/                 Next.js App Router entry point and global styles
  components/
    atoms/             Buttons, status indicators, and theme toggle
    molecules/         Pull request cards, summaries, and error lists
    organisms/         Dashboard and pull request list
    providers/         Theme context and persistence
    templates/         Dashboard page layout
  lib/api.ts           External API client
  types/apiTypes.ts    API response types
__tests__/             Vitest and React Testing Library component tests
```

The dashboard loads data on page entry. Use **Refresh** to fetch it again or **Clear Cache** to request cache invalidation and reload. Theme selection is stored in browser local storage.
