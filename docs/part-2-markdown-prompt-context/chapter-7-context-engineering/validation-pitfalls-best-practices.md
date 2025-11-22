---
sidebar_position: 8
lessonId: lesson-7-8-validation-pitfalls
enableTabs: true
---

# Validation, Pitfalls, and Best Practices

## Common Pitfalls

### 1. Context Overload
**Problem**: Loading everything "just in case"
**Result**: Important details lost in noise
**Fix**: Load only what's needed for current task

### 2. Stale Context
**Problem**: Using outdated information
**Result**: Inconsistent code generation
**Fix**: Refresh context after major changes

### 3. Missing Dependencies
**Problem**: Loading a file without its dependencies
**Result**: AI can't understand relationships
**Fix**: Include type definitions and interfaces

### 4. Context Fragmentation
**Problem**: Spreading related info across many messages
**Result**: AI loses track of connections
**Fix**: Consolidate related context together

### 5. Assumption of Persistence
**Problem**: Expecting AI to remember previous sessions
**Result**: AI lacks critical context
**Fix**: Reload essential context each session

## Validation Techniques

### Context Audit
Ask the AI what it knows:
```
What files have you seen in this session?
What do you understand about the project structure?
```

### Sanity Check
Before major changes:
```
Before implementing, summarize:
1. What feature we're building
2. What files you'll modify
3. What patterns you'll follow
```

### Incremental Verification
```
Let's verify step by step:
1. Generate the type definitions first
2. I'll confirm they're correct
3. Then generate the implementation
```

## Best Practices

### 1. Context Hierarchy
Organize from general to specific:
```
Project overview → Feature area → Specific files → Task details
```

### 2. Explicit Loading
Tell the AI what you're providing:
```
I'm sharing three files:
1. types.ts - Type definitions
2. service.ts - Business logic
3. controller.ts - API handler

You'll be modifying controller.ts
```

### 3. Context Checkpoints
For long sessions, periodically refresh:
```
Let's recap our session:
- We're building: user preferences feature
- We've completed: database schema, service layer
- Next up: API endpoints
- Key decisions: using REST, not GraphQL
```

### 4. Clean Handoffs
When switching tasks:
```
We're done with authentication. Now let's work on payments.
Forget the auth context - it's not relevant here.
```
