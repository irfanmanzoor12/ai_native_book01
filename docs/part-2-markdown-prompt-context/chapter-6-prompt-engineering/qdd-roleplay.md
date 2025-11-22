---
sidebar_position: 7
lessonId: lesson-6-7-qdd-roleplay
enableTabs: true
---

# QDD: Question-Driven Development Roleplay

## What is QDD?

Question-Driven Development is a prompt engineering technique where you have the AI ask clarifying questions before implementation.

## The Problem

When you give a vague requirement:
```
Build a user authentication system
```

The AI makes assumptions that may not match your needs.

## The QDD Approach

Instead of accepting the first output, ask:

```
Before implementing a user authentication system,
what questions would you need answered to build it correctly?
```

## Sample QDD Session

**You**: I need a notification system for my app.

**AI Questions**:
1. What types of notifications? (email, push, in-app, SMS)
2. Should notifications be real-time or batched?
3. Do users need notification preferences?
4. What's the expected volume?
5. Are there priority levels for notifications?
6. What happens if delivery fails?

**You**:
- In-app and email only
- Real-time for in-app, batched daily for email
- Yes, users can opt out of non-critical notifications
- ~10,000 users, ~5 notifications per user per day
- Yes: critical, important, informational
- Retry 3 times, then log failure

**AI**: Now implementing with these specifications...

## Benefits of QDD

1. **Better Specifications**: Forces you to think through requirements
2. **Fewer Iterations**: Get it right the first time
3. **Documentation**: The Q&A becomes documentation
4. **Learning**: Discover edge cases you hadn't considered

## QDD Prompt Template

```markdown
I want to build [feature].

Before you implement anything:
1. List all the questions you would need answered
2. Group them by category (technical, UX, business logic)
3. Suggest sensible defaults where appropriate

Wait for my answers before proceeding.
```

## When to Use QDD

- Complex features
- Ambiguous requirements
- New domains you're unfamiliar with
- Critical systems where mistakes are costly
