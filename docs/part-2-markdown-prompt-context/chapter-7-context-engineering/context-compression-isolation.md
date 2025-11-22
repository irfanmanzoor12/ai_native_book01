---
sidebar_position: 5
lessonId: lesson-7-5-compression-isolation
enableTabs: true
---

# Context Compression and Isolation

## Context Compression

Techniques to fit more useful information into limited space.

### 1. Summarization

Instead of full code:
```typescript
// UserService: 500 lines
// Key methods: createUser, updateUser, deleteUser
// Uses: UserRepository, EmailService
// Pattern: Repository pattern with caching
```

### 2. Interface-Only

Share interfaces instead of implementations:
```typescript
interface UserService {
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(id: string, data: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
```

### 3. Relevant Excerpts

Extract only the relevant portions:
```typescript
// From src/services/user.ts (lines 45-67)
async function validateEmail(email: string): boolean {
  // ... relevant code
}
```

### 4. Reference Pointers

```
The authentication flow follows the pattern in:
- src/auth/handlers.ts (validateToken function)
- src/middleware/auth.ts (authentication middleware)

You don't need to see these files, just follow the same
error handling pattern.
```

## Context Isolation

Preventing irrelevant context from interfering.

### Task Isolation

```
For this task, ignore:
- Frontend code (we're only working on backend)
- Test files (we'll add tests separately)
- Database migrations (schema is fixed)

Focus only on:
- The UserController class
- The validation logic
```

### Session Reset

When context becomes polluted:
```
Let's start fresh. Forget our previous discussion.
New task: [clear specification]
```

### Explicit Boundaries

```
## In Scope
- User authentication endpoints
- Session management

## Out of Scope (Do not modify)
- User registration
- Password reset
- Email verification
```

## Compression vs Quality Tradeoff

| Compression Level | Pros | Cons |
|-------------------|------|------|
| None | Full context | May exceed limits |
| Light | Key details preserved | Some context lost |
| Heavy | Fits any window | Risk of missing info |

## When to Use Each

- **No compression**: Small projects, simple tasks
- **Light compression**: Medium projects, focused features
- **Heavy compression**: Large codebases, quick questions
