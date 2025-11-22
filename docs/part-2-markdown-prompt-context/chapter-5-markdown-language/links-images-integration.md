---
sidebar_position: 5
lessonId: lesson-5-5-links-images
enableTabs: true
---

# Links, Images, and Integration

## Links

### Inline Links

```markdown
[Link Text](https://example.com)
```

### Reference Links

```markdown
[Link Text][ref]

[ref]: https://example.com
```

### Relative Links

```markdown
[See the API docs](./api/readme.md)
```

## Images

### Basic Image

```markdown
![Alt text](image-url.png)
```

### Image with Title

```markdown
![Alt text](image-url.png "Optional title")
```

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |     R |
```

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> > Nested quotes work too.
```

## Horizontal Rules

```markdown
---
```

## Integration with AI

When writing specifications:

1. Link to related documents
2. Include diagrams as images
3. Use tables for data structures
4. Quote requirements from stakeholders

## Example Specification

```markdown
# Feature: Payment Processing

> "Users should be able to pay with credit card or PayPal"
> — Product Manager

## Data Model

| Field | Type | Required |
|-------|------|----------|
| amount | number | Yes |
| currency | string | Yes |
| method | enum | Yes |

## See Also

- [API Documentation](./api.md)
- [Security Guidelines](./security.md)
```
