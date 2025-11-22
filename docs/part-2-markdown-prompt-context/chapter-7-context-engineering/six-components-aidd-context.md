---
sidebar_position: 3
lessonId: lesson-7-3-six-components
enableTabs: true
---

# The Six Components of AIDD Context

## Overview

Effective AIDD context consists of six distinct components, each serving a specific purpose.

## 1. System Context

**What**: Foundational instructions that define AI behavior
**When**: Always present, rarely changes
**Example**:
```
You are a senior TypeScript developer. Follow best practices
for error handling and type safety. Use functional patterns
where appropriate.
```

## 2. Project Context

**What**: Information about the overall project
**When**: Loaded at session start
**Contents**:
- Architecture overview
- Tech stack details
- Coding conventions
- File structure patterns

## 3. Specification Context

**What**: Requirements and design documents
**When**: Loaded for specific features
**Contents**:
- Feature specifications
- API contracts
- Data models
- Business rules

## 4. Code Context

**What**: Relevant existing code
**When**: Loaded for implementation tasks
**Contents**:
- Related functions/classes
- Interfaces/types
- Test files
- Dependencies

## 5. Conversation Context

**What**: History of current session
**When**: Accumulates during interaction
**Contents**:
- Previous prompts
- AI responses
- Decisions made
- Clarifications

## 6. Tool Context

**What**: Available actions and their results
**When**: Dynamic, based on tool usage
**Contents**:
- File contents read
- Command outputs
- Search results
- Error messages

## Context Priority

When space is limited, prioritize:

1. **Critical**: Task requirements, relevant code
2. **Important**: Project conventions, related context
3. **Helpful**: Examples, documentation
4. **Optional**: Background information

## Component Relationships

```
System Context (stable)
     ↓
Project Context (session-level)
     ↓
Specification Context (feature-level)
     ↓
Code Context + Tool Context (task-level)
     ↓
Conversation Context (turn-level)
```
