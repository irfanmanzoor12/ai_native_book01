---
sidebar_position: 1
lessonId: lesson-7-1-what-is-context
enableTabs: true
---

# What is Context Engineering?

## Definition

Context engineering is the practice of strategically selecting, organizing, and presenting information to AI systems to optimize their performance on development tasks.

## The Context Problem

AI models don't have persistent memory. Each interaction starts fresh unless you provide context. This creates challenges:

- What information does the AI need?
- How do you provide it efficiently?
- How do you avoid overwhelming the system?

## Context vs Prompts

| Prompts | Context |
|---------|---------|
| What you want done | Background information |
| Instructions | Supporting data |
| Short-term | Session-spanning |
| Action-oriented | Reference-oriented |

## Types of Context

### 1. Project Context
Overall project information that rarely changes:
- Architecture documentation
- Coding standards
- Tech stack details

### 2. Session Context
Information relevant to current work session:
- Files being modified
- Recent changes
- Current goals

### 3. Task Context
Specific to the current task:
- Requirements
- Related code
- Test cases

## The Context Engineering Mindset

Think of yourself as a briefing officer:
1. What does the AI need to know to succeed?
2. What information is essential vs nice-to-have?
3. How can you present it clearly?

## Impact on Development

Good context engineering leads to:
- Fewer iterations needed
- More accurate code generation
- Better understanding of existing patterns
- Consistent output quality
