---
sidebar_position: 3
lessonId: lesson-5-3-lists
enableTabs: true
---

# Lists and Organization

## Unordered Lists

Use `-`, `*`, or `+` for bullet points:

```markdown
- Item one
- Item two
  - Nested item
  - Another nested
- Item three
```

## Ordered Lists

Use numbers followed by a period:

```markdown
1. First step
2. Second step
3. Third step
```

Numbers auto-correct, so you can use `1.` for all items:

```markdown
1. First
1. Second (will render as 2)
1. Third (will render as 3)
```

## Task Lists

Perfect for specifications and checklists:

```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task
```

## When to Use Each Type

| List Type | Use Case |
|-----------|----------|
| Unordered | Features, requirements, options |
| Ordered | Steps, procedures, priorities |
| Task | Progress tracking, acceptance criteria |

## Lists in AI Specifications

```markdown
## Implementation Tasks

1. [ ] Create database schema
2. [ ] Build API endpoints
3. [ ] Add authentication middleware
4. [ ] Write unit tests
5. [ ] Deploy to staging

## Features
- User registration
- Password reset
- Profile management
```

## Best Practices

- Keep list items concise
- Use parallel structure (start each item the same way)
- Nest sparingly (max 2-3 levels)
- Use task lists for trackable items
