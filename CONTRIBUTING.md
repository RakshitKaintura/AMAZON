# Contributing to GoCart

Thanks for your interest in contributing! This project is aimed at being a polished portfolio piece and a useful open-source starter. Please follow the guidelines below to make collaboration smooth.

## How to contribute

- Fork the repo and create a feature branch: `git checkout -b feat/your-feature`
- Keep changes small and focused; one logical change per PR.
- Open an issue first for larger features or breaking changes and discuss the design.
- Make commits descriptive and squash/fixup locally before opening the PR.

## Development checklist

- Pull the latest `main` and rebase before creating a PR.
- Run the app locally and ensure core user flows work:

```bash
npm install
npm run dev
```

- Run linting: `npm run lint`.
- If a change affects the database schema, update Prisma migrations and include instructions in the PR.

## PR template suggestions

- **Summary**: Short explanation of what changed and why.
- **Related issues**: Link any issues addressed.
- **Testing**: Steps to reproduce and verify the change locally.
- **Notes**: Any deployment or migration notes.

## Code style

- Use modern JavaScript/TypeScript practices consistent with the repo.
- Keep UI and business logic separated when possible.

## Welcome

We welcome contributions of all sizes. If you need help, open an issue and tag `help wanted` — we'll guide you through the process.