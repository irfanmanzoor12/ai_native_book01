---
sidebar_position: 2
lessonId: lesson-6-2-clear-commands
enableTabs: true
---

# Writing Clear Commands

## The CLEAR Framework

**C** - Context: Set the scene
**L** - Language: Use precise terminology
**E** - Examples: Show what you want
**A** - Actions: Specify exact steps
**R** - Results: Describe expected output

## Bad vs Good Prompts

### Bad Prompt
```
Make the login work
```

### Good Prompt
```
Create a login form component with:
- Email input with validation
- Password input (min 8 chars)
- Submit button that calls /api/auth/login
- Error display for invalid credentials
- Redirect to /dashboard on success
```

## Specificity Spectrum

```
Vague ←————————————————————→ Specific

"Fix the bug"
"Fix the authentication bug"
"Fix the bug where users can't login with Google"
"Fix the OAuth callback handler in auth.ts that returns
 500 error when Google returns an empty email field"
```

## Command Structure

```markdown
## Task
[What you want done]

## Context
[Relevant background]

## Requirements
- [Specific requirement 1]
- [Specific requirement 2]

## Constraints
- [Limitation 1]
- [Limitation 2]

## Expected Output
[What success looks like]
```

## Action Verbs

Use precise action verbs:

| Vague | Precise |
|-------|---------|
| Fix | Debug, Patch, Refactor |
| Make | Create, Build, Generate |
| Change | Update, Modify, Replace |
| Add | Insert, Append, Include |

## Practice

Transform this vague prompt into a clear command:

> "Make the user profile better"

Think about: What specifically needs improvement? What does "better" mean?
