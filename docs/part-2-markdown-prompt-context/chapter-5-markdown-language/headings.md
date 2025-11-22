---
sidebar_position: 2
lessonId: lesson-5-2-headings
enableTabs: true
---

# Headings and Document Structure

## The Heading Hierarchy

Markdown uses `#` symbols to create headings:

```markdown
# H1 - Document Title (use once)
## H2 - Major Sections
### H3 - Subsections
#### H4 - Minor sections
##### H5 - Fine details
###### H6 - Rarely used
```

## Why Structure Matters for AI

AI systems use headings to:

- Understand document organization
- Navigate to relevant sections
- Prioritize information
- Generate accurate summaries

## Best Practices

### 1. Single H1

Use only one `# Heading` per document as the main title.

### 2. Logical Nesting

Don't skip levels. Go from H2 to H3, not H2 to H4.

### 3. Descriptive Headings

```markdown
# Bad
## Section 1
## Section 2

# Good
## User Authentication
## Data Processing
```

### 4. Consistent Formatting

Pick a style and stick with it throughout your document.

## For AI Specifications

When writing specs for AI:

```markdown
# Feature: User Login

## Requirements
- Users must provide email and password
- Support social login (Google, GitHub)

## Acceptance Criteria
- Successful login redirects to dashboard
- Failed login shows error message

## Technical Notes
- Use JWT tokens
- Session expires after 7 days
```
