# FlatMate Database Design

## Overview

- This document describes the **initial database design** for FlatMate.
- The schema is **normalized (BCNF-oriented)** and aligned with the MVP scope.
- This is **not the final schema**, but a **clear and stable starting point**.
- The design is intended to evolve as the product grows.

---

## Database Diagram

![FlatMate Database Schema](./images/databaseDesign_v1.png)

This diagram represents the current understanding of:
- entities,
- relationships,
- and cardinality.

---

## Design Goals

- Clear representation of the domain
- Avoid data duplication
- Simple and understandable relationships
- Support MVP features without overdesign
- Allow safe future extension

---

## Core Entities

### Users & Profiles
- `users` → authentication and account identity
- `user_profiles` → personal and optional user information

**Design choice**
- Auth data and profile data are separated.
- Each user has exactly one profile.

---

### Properties
- `properties` → core listing information
- `property_details` → descriptive attributes
- `property_amenities` → multi-valued amenities
- `property_images` → listing images

**Design choice**
- Listing identity is separated from details.
- Amenities are modeled as a relation, not columns.

---

### Communities
- `communities` → college or office groups
- `community_members` → membership relation
- `community_posts` → posts inside a community

**Design choice**
- No comments or reactions in MVP.
- Community feed is intentionally simple.

---

### Chat (1:1 Only)
- `conversations` → one conversation per user pair
- `chat_messages` → messages within a conversation

**Design choice**
- Chat is strictly 1:1.
- Group chat is intentionally excluded.

---

### Notifications
- `notifications` → system-generated user alerts

**Design choice**
- Generic structure to support future use cases.

---

## Cardinality Summary

- One user → many properties
- Users ↔ communities → many-to-many
- One community → many posts
- One conversation → exactly two users
- One conversation → many messages

---

## Normalization

- No duplicated data
- No transitive dependencies
- Multi-valued fields modeled separately
- Entity data and process data kept separate

---

## Conscious Omissions

The following are **intentionally not included** in the MVP:

- payments
- bookings
- reviews
- search indexes
- read receipts or typing indicators

---

## Status

- Schema is **final for MVP clarity**
- Schema is **not final for the product**
- Changes will be incremental and intentional

---

## Summary

- This database design provides a **clean mental model** of FlatMate.
- It prioritizes correctness, simplicity, and clarity.
- It serves as a **foundation**, not a constraint.
