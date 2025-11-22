---
sidebar_position: 3
lessonId: lesson-6-3-providing-context
enableTabs: true
---

# Providing Context Effectively

## Why Context Matters

AI agents make decisions based on available information. More relevant context = better outputs.

## Types of Context

### 1. Project Context
- Tech stack (React, Node, etc.)
- Architecture patterns
- Coding conventions
- File structure

### 2. Task Context
- What you're trying to accomplish
- Why you need this change
- Related features or systems

### 3. Code Context
- Relevant existing code
- Dependencies
- Data models

### 4. Constraint Context
- Performance requirements
- Security considerations
- Backwards compatibility

## Context Loading Strategies

### Direct Inclusion
```
Given this database schema:
[paste schema]

Create a query that...
```

### File References
```
Look at src/models/User.ts for the user model.
The API routes are in src/api/routes/.
```

### Pattern Description
```
We follow the repository pattern.
All database access goes through repository classes.
```

## Context Priority

Not all context is equal. Prioritize:

1. **Essential**: Must have for correct output
2. **Helpful**: Improves quality
3. **Nice-to-have**: Minor improvements
4. **Irrelevant**: Can confuse or distract

## Anti-Patterns

### Too Little Context
```
Write a function to process the data
```
Problem: What data? What processing?

### Too Much Context
```
[Dumps entire codebase]
Now add a button
```
Problem: Overwhelms the context window

### Wrong Context
```
Here's our marketing plan...
Now fix the database query
```
Problem: Irrelevant information

## Context Template

```markdown
## Project Overview
[1-2 sentences about the project]

## Relevant Files
- `path/to/file1.ts` - [purpose]
- `path/to/file2.ts` - [purpose]

## Current Behavior
[What happens now]

## Desired Behavior
[What should happen]

## Constraints
[Any limitations]
```
