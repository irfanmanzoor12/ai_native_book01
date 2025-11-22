---
sidebar_position: 2
lessonId: lesson-7-2-context-windows
enableTabs: true
---

# Understanding Context Windows

## What is a Context Window?

The context window is the maximum amount of text an AI model can process at once. Think of it as the model's "working memory."

## Context Window Sizes

| Model | Context Window |
|-------|----------------|
| GPT-4 | 128K tokens |
| Claude 3.5 Sonnet | 200K tokens |
| Gemini 1.5 Pro | 1M+ tokens |

## Tokens vs Characters

- 1 token ≈ 4 characters (English)
- 1 token ≈ 0.75 words
- Code is often less token-efficient

### Example Token Counts

```
"Hello world" = 2 tokens
"function calculateTotal(items)" = 5 tokens
A typical 100-line file = ~500-1000 tokens
```

## Context Window Economics

Your context window must fit:
- System prompts
- Your instructions
- All provided context
- Space for the response

## The Attention Problem

Even with large context windows, AI models don't attend equally to all content:

- **Beginning**: High attention (system prompts)
- **Middle**: Lower attention ("lost in the middle")
- **End**: High attention (recent instructions)

## Strategies for Limited Context

### 1. Prioritize
Put most important information at the beginning and end.

### 2. Summarize
Use summaries instead of full documents where possible.

### 3. Chunk
Break large tasks into smaller context-appropriate pieces.

### 4. Reference
Point to files instead of including entire contents.

## Monitoring Context Usage

Many AI tools show context usage:
- Claude Code: Shows token count
- Cursor: Context indicator
- ChatGPT: May warn when approaching limits

## When Context Runs Out

Signs you're hitting context limits:
- AI "forgets" earlier instructions
- Inconsistent code generation
- Repeated mistakes
- Loss of coding style
