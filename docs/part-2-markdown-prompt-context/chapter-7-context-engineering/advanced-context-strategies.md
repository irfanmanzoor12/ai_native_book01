---
sidebar_position: 6
lessonId: lesson-7-6-advanced-strategies
enableTabs: true
---

# Advanced Context Strategies

## Context Files

Many AI tools support project-level context files:

### Claude: CLAUDE.md
```markdown
# Project: E-commerce Platform

## Tech Stack
- Frontend: Next.js 14, TypeScript
- Backend: Node.js, Express
- Database: PostgreSQL with Prisma

## Conventions
- Use functional components
- Error handling: Result pattern
- Naming: camelCase for functions, PascalCase for types

## Key Files
- src/types/index.ts - Shared types
- src/lib/db.ts - Database client
```

### Cursor: .cursorrules
```
You are a senior developer working on a Next.js application.
Always use TypeScript with strict mode.
Prefer Server Components unless client interactivity needed.
Use Tailwind CSS for styling.
```

## RAG (Retrieval-Augmented Generation)

Some tools automatically retrieve relevant context:

1. You write a prompt
2. Tool searches codebase
3. Relevant files added to context
4. AI generates with full context

## Multi-File Context Patterns

### Dependency Chain
```
Loading context for UserController:
1. UserController.ts (the target)
2. UserService.ts (direct dependency)
3. UserRepository.ts (service dependency)
4. User.ts (shared types)
```

### Feature Slice
```
Loading context for checkout feature:
- controllers/checkout.ts
- services/checkout.ts
- components/CheckoutForm.tsx
- types/checkout.ts
```

## Context Caching

For repeated operations:

```markdown
## Cached Context

I've already shared these files:
- src/types/index.ts
- src/config/database.ts

Reference them without resharing.
```

## Dynamic Context Assembly

```markdown
## Context Loading Script

When working on API endpoints:
1. Load route handler
2. Load associated service
3. Load relevant types
4. Load existing tests

When working on UI components:
1. Load component file
2. Load hooks used
3. Load style definitions
4. Load test file
```

## Context Debugging

When AI outputs are wrong:

1. **Check what's loaded**: What files did the AI see?
2. **Check what's missing**: What crucial info was absent?
3. **Check for conflicts**: Is there contradictory information?
4. **Check ordering**: Is important info in low-attention zones?
