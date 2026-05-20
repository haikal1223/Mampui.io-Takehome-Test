# Mampu.io Frontend Take-Home Test

A Next.js users workspace that fetches data from [JSONPlaceholder](https://jsonplaceholder.typicode.com), built for the MID Frontend take-home (v2.0).

## Features

- **Users list** (`/users`) — search, activity filters, sort, pagination, responsive table/cards
- **User details** (`/users/[id]`) — profile, posts, todos, SEO metadata, error boundaries
- **React Query** for client data fetching with 60s cache (`staleTime`)
- **Jest + React Testing Library + MSW** for unit and integration tests

## Prerequisites

- Node.js 20+ recommended (project tested on Node 21)
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and navigate to **Users**.

## Scripts

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Start development server          |
| `npm run build`      | Production build                  |
| `npm run start`      | Run production server             |
| `npm test`           | Run test suite (Jest + RTL + MSW) |
| `npm run test:watch` | Run tests in watch mode           |
| `npm run lint`       | ESLint                            |

## Testing

Tests live in `__tests__/` and use:

- **MSW handlers** — `test/msw/handlers.ts` for JSONPlaceholder routes (used for local/dev mocking; Jest suites use a fetch mock in `test/helpers/mock-fetch.ts` for jsdom compatibility)
- **Fixtures** — `test/fixtures/`
- **Navigation mock** — `test/mocks/next-navigation.ts` for URL state on the list page

```bash
npm test
```

### Test coverage highlights

- Users list: activity columns, search, filters, sort, loading, error, empty state
- User details: profile, posts/todos, loading, error, invalid user id
- API helpers and pure utilities (`activity`, `filter-sort`, `url-state`, `pagination`)

## Project structure

```
app/                 # Next.js App Router pages
components/          # UI and feature components
hooks/               # React Query hooks
lib/                 # API clients, filters, URL state
test/                # MSW handlers, fixtures, test utilities
__tests__/           # Jest test suites
```

## Branch workflow (suggested)

| Branch                   | Task                                  |
| ------------------------ | ------------------------------------- |
| `task-1/setup`           | React Query, Jest, tooling            |
| `task2/users-list`       | Users list, search, sort              |
| `task-3/user-details`    | User detail route                     |
| `task-4/user-operations` | Activity signals, filters, pagination |
| `task-5/styling-ux`      | Responsive polish, skeletons, a11y    |
| `task-6/testing`         | Full test suite + README              |

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- TanStack React Query
- Tailwind CSS v4
- Jest, React Testing Library, MSW
