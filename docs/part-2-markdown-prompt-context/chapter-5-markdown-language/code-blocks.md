---
sidebar_position: 4
lessonId: lesson-5-4-code-blocks
enableTabs: true
---

# Code Blocks

## Inline Code

Use backticks for inline code:

```markdown
Use the `console.log()` function for debugging.
```

## Fenced Code Blocks

Use triple backticks with optional language identifier:

````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

## Language Identifiers

Common identifiers for syntax highlighting:

| Language | Identifier |
|----------|------------|
| JavaScript | `javascript` or `js` |
| TypeScript | `typescript` or `ts` |
| Python | `python` or `py` |
| JSON | `json` |
| Bash | `bash` or `sh` |
| SQL | `sql` |
| Markdown | `markdown` or `md` |

## Why Code Blocks Matter for AI

When you use proper code blocks:

1. AI recognizes code vs prose
2. Syntax highlighting aids review
3. Copy-paste works correctly
4. Language context helps AI understand intent

## Showing File Content

Include filename for context:

````markdown
```typescript title="src/auth.ts"
export function validateToken(token: string): boolean {
  // Implementation
}
```
````

## Diff Blocks

Show changes with diff syntax:

````markdown
```diff
- const oldValue = 'previous';
+ const newValue = 'updated';
```
````

## Best Practices

- Always specify the language
- Keep code blocks focused
- Add comments for complex logic
- Use consistent formatting
