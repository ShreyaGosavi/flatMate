# Software Development Model Used in FlatMate

---

## TL;DR

FlatMate uses a **hybrid Agile–Kanban model**: Agile principles for incremental development combined with Kanban for workflow visualization. This lightweight approach suits solo development, allows requirements to evolve, and maintains continuous flow without sprint overhead. Tasks are managed via GitHub Projects with clear stages (Backlog → Planned → In Progress → Review → Done).

---

## 1. What is a Software Development Model?

A software development model defines how I plan, design, build, test, and evolve a software system over time.

It provides a structured approach to:
- Handle uncertainty
- Manage scope
- Incorporate feedback
- Reduce development risk

Different models exist to suit different project constraints such as team size, requirement stability, time limitations, and risk tolerance.

---

## 2. Key Models Considered

### Agile Development

An iterative and incremental approach where I:
- Build the system in small, usable increments
- Allow requirements to evolve over time
- Incorporate feedback continuously
- Prioritize working software over rigid upfront planning

Agile emphasizes adaptability, collaboration, and responsiveness to change.

### Kanban

A workflow management method focused on:
- Visualizing work
- Limiting work in progress
- Maintaining continuous flow of tasks

Kanban does not rely on fixed time-boxed iterations. Instead, it emphasizes clarity, focus, and steady progress through defined stages.

---

## 3. Development Model Used in FlatMate

For FlatMate, I am using a **hybrid development approach** that combines:

**Agile principles** for incremental and adaptive development  
**+**  
**Kanban** for task management and workflow visualization

This approach is intentionally lightweight and tailored to the nature of the project and my role as a solo developer.

---

## 4. How This Model is Applied

### Agile Practices I Follow

- Break the project into small, incremental goals rather than building in a single phase
- Allow requirements to evolve as understanding of the problem domain improves
- Prioritize building correct and usable components before expanding feature scope
- Incorporate feedback and reassess decisions continuously during development

This allows FlatMate to grow organically without premature overengineering.

### Kanban Practices I Follow

**Task Management:**
- All tasks managed using a GitHub Project board
- Each task moves through clearly defined states:
    - 📋 Backlog
    - 📝 Planned
    - 🚧 In Progress
    - 👀 In Review
    - ✅ Done

**Workflow Discipline:**
- Avoid working on multiple unrelated tasks simultaneously
- Focus on completing work before starting new tasks
- Maintain continuous flow without sprint boundaries

Kanban helps me maintain focus, transparency, and momentum throughout the 60-day build.

---

## 5. Why I Chose This Model

### a) Nature of the Problem

FlatMate addresses a real-world problem where:
- User needs are not fully predictable upfront
- Product understanding improves with exploration
- Flexibility is essential to avoid building unnecessary features

An iterative model allows me to adapt the system without compromising architectural stability.

### b) Solo Development Context

As a solo developer:
- Heavyweight process models introduce unnecessary overhead
- Strict role-based frameworks are impractical
- Continuous flow is more efficient than time-boxed sprints

Agile combined with Kanban provides discipline without slowing down execution.

### c) Documentation-First Philosophy

Although Agile typically de-emphasizes documentation, I deliberately adopt:
- Early architectural documentation
- Explicit decision records
- Clearly defined boundaries and constraints

This hybrid approach ensures long-term maintainability while retaining Agile flexibility.

### d) Fixed 60-Day Timeline

The 60-day constraint requires:
- Continuous prioritization
- Ability to reorder tasks dynamically
- Incremental progress without sprint disruption

Kanban supports this by allowing work to flow naturally while maintaining visibility and control.

---

## 6. Why I Did Not Choose Other Models

### Waterfall Model

**Not chosen because it:**
- Assumes stable requirements from the beginning
- Delays feedback until late stages
- Leads to high rework costs in exploratory projects

FlatMate requires learning and adjustment during development.

### Spiral Model

**Not chosen because it:**
- Introduces heavy risk analysis cycles
- Better suited for large-scale, high-risk enterprise systems
- Adds unnecessary process complexity for a solo project

The risks in FlatMate are better managed through incremental validation.

### Scrum (Strict Agile Framework)

**Not chosen because it:**
- Enforces fixed-length sprints
- Requires formal ceremonies and defined roles
- Adds overhead not suitable for a single-developer workflow

FlatMate benefits more from continuous flow than rigid sprint structures.

### V-Model

**Not chosen because it:**
- Assumes well-defined requirements
- Tightly couples development and testing phases
- Most suitable for regulated or safety-critical systems

FlatMate prioritizes adaptability over strict phase alignment.

---

## 7. Conclusion

I am using a **hybrid Agile–Kanban development model** for FlatMate to balance:
- Adaptability and control
- Documentation and flexibility
- Engineering discipline and practical execution

This approach aligns with the project's scope, timeline, and my goal of building a maintainable, real-world product from scratch.

---

**Model**: Agile + Kanban | **Timeline**: 60 days | **Management**: GitHub Projects