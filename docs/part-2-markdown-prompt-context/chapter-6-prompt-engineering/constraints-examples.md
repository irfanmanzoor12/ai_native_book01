---
sidebar_position: 5
lessonId: lesson-6-5-constraints-examples
enableTabs: true
---

# Constraints and Examples

## The Power of Constraints

Constraints narrow the solution space, leading to more predictable outputs.

## Types of Constraints

### Technical Constraints
```markdown
- Must use TypeScript strict mode
- No external dependencies except those in package.json
- Must support Node.js 20+
- Response time < 100ms for API calls
```

### Style Constraints
```markdown
- Follow existing code patterns in the codebase
- Use functional components, not class components
- Prefer async/await over .then() chains
- Maximum function length: 30 lines
```

### Output Constraints
```markdown
- Return JSON with structure: { success: boolean, data?: T, error?: string }
- Log all errors to console with timestamp
- Include JSDoc comments for public functions
```

## The Power of Examples

Examples are often clearer than descriptions.

### Input/Output Examples

```markdown
## Function: formatCurrency

Input: 1234.5
Output: "$1,234.50"

Input: 1000000
Output: "$1,000,000.00"

Input: 0.99
Output: "$0.99"
```

### Code Style Examples

```markdown
## Preferred Style

Instead of:
```typescript
const x = arr.filter(i => i > 0).map(i => i * 2);
```

Use:
```typescript
const positiveItems = arr.filter(item => item > 0);
const doubledItems = positiveItems.map(item => item * 2);
```
```

### Error Handling Examples

```markdown
## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email format is invalid",
    "field": "email"
  }
}
```
```

## Combining Constraints and Examples

```markdown
## API Endpoint Specification

### Constraints
- RESTful design
- JWT authentication required
- Rate limit: 100 requests/minute

### Example Request
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}

### Example Response (Success)
201 Created
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

### Example Response (Error)
400 Bad Request
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email already exists"
  }
}
```
