---
sidebar_position: 4
lessonId: lesson-6-4-specifying-logic
enableTabs: true
---

# Specifying Logic

## From Intent to Implementation

Your job: Define WHAT and WHY
AI's job: Figure out HOW

## Logic Specification Patterns

### Conditional Logic

```markdown
## Business Rules

When a user submits an order:
1. IF cart is empty → show error "Cart is empty"
2. IF user is not logged in → redirect to login
3. IF payment fails → show error with retry option
4. IF all validations pass → create order and redirect to confirmation
```

### Data Transformations

```markdown
## Data Processing

Input: Raw CSV with columns [name, email, date_joined]

Transform:
- name → capitalize first letter of each word
- email → lowercase, validate format
- date_joined → parse as ISO date, reject if invalid

Output: Array of validated User objects
```

### State Machines

```markdown
## Order States

PENDING → CONFIRMED → SHIPPED → DELIVERED
           ↓            ↓
        CANCELLED    RETURNED

Transitions:
- PENDING → CONFIRMED: when payment succeeds
- PENDING → CANCELLED: when user cancels or payment times out
- CONFIRMED → SHIPPED: when tracking number added
- SHIPPED → DELIVERED: when carrier confirms
- SHIPPED → RETURNED: when return initiated
```

## Precision Tools

### Tables for Rules

| Condition | Action | Error Message |
|-----------|--------|---------------|
| age < 18 | Reject | Must be 18 or older |
| age >= 18 AND verified | Accept | - |
| age >= 18 AND NOT verified | Pending | Verification required |

### Pseudocode

```
FOR each item in cart:
  IF item.stock < item.quantity:
    ADD item to outOfStock list
  ELSE:
    RESERVE item.quantity from inventory

IF outOfStock is not empty:
  RETURN error with outOfStock items
ELSE:
  CREATE order with reserved items
```

## Avoiding Ambiguity

### Ambiguous
> "Handle invalid input appropriately"

### Clear
> "If input is invalid: return 400 status with JSON error object containing field name and validation message"
