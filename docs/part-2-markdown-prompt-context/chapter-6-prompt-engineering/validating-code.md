---
sidebar_position: 6
lessonId: lesson-6-6-validating-code
enableTabs: true
---

# Validating AI-Generated Code

## Why Validation Matters

AI generates plausible code that may contain:
- Logic errors
- Security vulnerabilities
- Performance issues
- Incorrect assumptions

## Validation Checklist

### 1. Does It Compile/Run?
```bash
# TypeScript
npx tsc --noEmit

# Python
python -m py_compile file.py
```

### 2. Does It Do What Was Asked?
- Review against original requirements
- Test with expected inputs
- Check edge cases

### 3. Is It Secure?
Common issues to check:
- SQL injection vulnerabilities
- XSS in user input handling
- Exposed secrets or credentials
- Missing authentication checks

### 4. Is It Efficient?
- Avoid N+1 queries
- Check for unnecessary loops
- Review memory usage

### 5. Does It Follow Standards?
- Code style consistency
- Naming conventions
- Error handling patterns

## Validation Prompts

Ask the AI to validate its own work:

```
Review the code you just generated:
1. Are there any security vulnerabilities?
2. What edge cases might fail?
3. How would you test this?
```

## Iterative Refinement

```
Found: The function doesn't handle null input.

Fix: Add null check at the start:
if (!input) {
  throw new Error('Input is required');
}
```

## Red Flags to Watch

| Red Flag | Action |
|----------|--------|
| Hardcoded credentials | Remove immediately |
| `any` types in TypeScript | Request proper typing |
| No error handling | Add try/catch |
| SQL string concatenation | Use parameterized queries |
| Missing input validation | Add validation layer |

## Test-Driven Validation

Ask AI to generate tests, then run them:

```
Generate unit tests for the function you just created.
Include tests for:
- Happy path
- Edge cases
- Error conditions
```
