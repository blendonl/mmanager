# Contributing to Money Manager

Thank you for your interest in contributing to Money Manager! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `yarn install`
4. Set up environment: `cp .env.example .env`
5. Start services: `docker-compose up -d postgres redis`
6. Run migrations: `yarn prisma:migrate`

## Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Hotfix: `hotfix/description`
- Documentation: `docs/description`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat(auth): add refresh token functionality
fix(transactions): correct balance calculation
docs(readme): update installation instructions
```

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Run linter before committing: `yarn lint`
- Format code: `yarn format` (if configured)

### Testing

- Write tests for new features
- Ensure all tests pass: `yarn test`
- Maintain or improve code coverage

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linter
4. Update documentation if needed
5. Push to your fork
6. Create a Pull Request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots (for UI changes)

### Code Review

- All PRs require at least one review
- Address review comments
- Keep PRs focused and reasonably sized

## Architecture Guidelines

### Backend (NestJS)

- Use dependency injection
- Follow SOLID principles
- Use DTOs for request/response
- Validate all inputs
- Handle errors appropriately
- Write unit and integration tests

### Mobile (React Native)

- Use functional components and hooks
- Keep components small and focused
- Use React Query for server state
- Use Zustand for client state
- Follow React best practices
- Ensure offline functionality

### Shared Types

- Define all API types in `@money-manager/api-types`
- Keep types synchronized between backend and mobile
- Export types from index files

## Database Changes

When modifying the database schema:

1. Update `prisma/schema.prisma`
2. Create migration: `yarn workspace @money-manager/server prisma migrate dev --name description`
3. Update seed file if needed
4. Test migration on fresh database

## Security

- Never commit secrets or credentials
- Use environment variables
- Follow security best practices
- Report security issues privately

## Questions?

Feel free to open an issue for discussion!
