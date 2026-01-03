# FlatMate — Folder Structure (v1)

**Version 1 Philosophy:** Clean monolith with clear boundaries, ready for future scaling.

---

## Root Structure
```
FlatMate/
├─ apps/           # Runnable applications
├─ packages/       # Shared logic (placeholder in v1)
├─ docs/           # Documentation
├─ misc/           # Scratch space
├─ logs/           # Runtime logs
├─ .env
├─ package.json
└─ README.md
```

---

## `apps/` — Applications
```
apps/
├─ web/         # Next.js app (frontend + backend + auth)
└─ realtime/    # Socket server (placeholder in v1)
```

### `apps/web`
- **Primary application** in v1
- Handles: frontend, all APIs, authentication
- All MVP logic lives here

### `apps/realtime`
- Empty placeholder for future socket server
- Any realtime logic (if needed) stays in `apps/web` for now

---

## `packages/` — Shared Logic
```
packages/
├─ auth/      # Authentication utilities (future)
├─ db/        # Database schemas & client (future)
├─ mail/      # Email service (future)
└─ config/    # Shared configs (future)
```

**Status in v1:** Structural placeholder only. No implementation yet.

**Purpose:** Prevent duplication when multiple backends are introduced in v2.

---

## `docs/` — Documentation
```
docs/
├─ authentication.md
└─ folder-structure.md
```

Design decisions, feature specs, and architecture notes.

---

## `misc/` — Scratch Space

Rough notes, experiments, temporary scripts. Not imported in production code.

---

## `logs/` — Runtime Logs

Application errors and debug logs. Minimal usage in v1.

---

## What v1 Does NOT Include

- Microservices
- Background workers
- Message queues
- Dedicated analytics
- Heavy monorepo tooling

**These are intentionally deferred.**

---

## Version 2 Preview

- `apps/realtime` becomes active
- Logic migrates from `apps/web` → `packages/`
- Workers for email/notifications
- Split deployments
- Enhanced logging

**v1 → v2 is a shift, not a rewrite.**

---

## Summary

Clean monolith → Disciplined boundaries → No premature complexity → Future-ready