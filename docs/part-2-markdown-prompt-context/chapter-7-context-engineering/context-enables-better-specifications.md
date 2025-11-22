---
sidebar_position: 9
lessonId: lesson-7-9-better-specifications
enableTabs: true
---

# How Context Enables Better Specifications

## The Connection

Context engineering and specification writing are deeply connected:

- **Better context** → AI understands existing patterns → **Better specifications**
- **Better specifications** → Clearer requirements → **Better implementations**

## Context-Aware Specifications

### Without Project Context
```markdown
## Feature: Add User Search

Create a search endpoint for users.
```

### With Project Context
```markdown
## Feature: Add User Search

Create a search endpoint following our existing patterns:
- Use the existing SearchService base class
- Follow the pagination pattern from /api/products
- Use Prisma's fullTextSearch for the query
- Return results in our standard ApiResponse format
```

## Using AI to Generate Specifications

With good context, AI can help write specs:

```markdown
Given our existing codebase patterns, help me write
a specification for a user notification system.

Consider:
- Our existing event system in src/events
- The email templates in src/templates
- Our preference storage pattern
```

## Specification Templates from Context

Create templates based on your project:

```markdown
## Feature Specification Template

### Overview
[Brief description]

### Related Existing Code
[List files that follow similar patterns]

### Data Model
[Based on existing Prisma schema patterns]

### API Design
[Based on existing endpoint patterns]

### Error Handling
[Based on existing error patterns]
```

## Context-Driven Consistency

When AI has proper context:

1. Code style matches existing code
2. Patterns are consistent
3. Naming follows conventions
4. Error handling is uniform

## The Specification-Context Loop

```
     Context
        ↓
Understand Patterns
        ↓
Write Specification
        ↓
AI Implements
        ↓
Code becomes new Context
        ↓
(Repeat)
```

## Best Practice: Living Documentation

Keep context files updated:

1. After major changes, update CLAUDE.md/GEMINI.md
2. Document new patterns as they emerge
3. Remove outdated information
4. Version control your context files

## Summary

Good context engineering enables:
- More accurate specifications
- Consistent implementations
- Faster iteration cycles
- Higher quality outputs

Master both skills together for maximum effectiveness in AI-driven development.
