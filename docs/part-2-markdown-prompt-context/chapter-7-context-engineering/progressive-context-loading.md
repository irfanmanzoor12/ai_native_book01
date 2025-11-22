---
sidebar_position: 4
lessonId: lesson-7-4-progressive-loading
enableTabs: true
---

# Progressive Context Loading

## The Problem

You can't load everything at once. Projects have:
- Hundreds of files
- Multiple documentation sources
- Complex interdependencies

## Progressive Loading Strategy

Load context in stages based on need:

### Stage 1: Overview
```
Load: Project README, architecture docs
Purpose: Understand the big picture
```

### Stage 2: Domain Focus
```
Load: Specific feature documentation
Purpose: Understand the area you're working in
```

### Stage 3: Implementation Details
```
Load: Relevant source files, tests
Purpose: Get the code context needed
```

### Stage 4: Execution
```
Load: Specific functions, interfaces
Purpose: Implement the actual change
```

## Lazy Loading Patterns

### On-Demand File Loading
```
Instead of:
"Here's my entire codebase..."

Do:
"My project uses React. I'll share relevant
files as needed. Let's start with the
authentication flow. Here's auth.ts..."
```

### Summary-First
```
"We have 50 API endpoints. Here's a summary:
- /api/users/* - User management
- /api/products/* - Product catalog
- /api/orders/* - Order processing

I'm working on user management. Let me share
the relevant endpoints..."
```

## Context Expansion Triggers

Load more context when:
- AI makes incorrect assumptions
- Code references unknown functions
- Errors mention unfamiliar modules
- You're moving to related feature

## Context Refresh

Signs you need to refresh context:
- Long-running session
- Switching between features
- AI outputs become inconsistent
- Style drift in generated code

## Best Practice: Context Manifest

Create a context manifest for your project:

```markdown
# Context Manifest

## Essential (Always Load)
- README.md
- src/types/index.ts
- .cursorrules or CLAUDE.md

## Feature: Authentication
- src/auth/*
- docs/auth-spec.md
- tests/auth.test.ts

## Feature: Payments
- src/payments/*
- docs/payment-spec.md
- tests/payments.test.ts
```
