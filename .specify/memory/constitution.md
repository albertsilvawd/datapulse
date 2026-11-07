<!--
Sync Impact Report
- Version change: unratified template -> 1.0.0 (first adopted constitution).
- Modified principles: five placeholder principles -> MVP Focus, Typed App Router,
  Accessible Reusable UI, Verified Changes, and Team Review.
- Added sections: Technical Standards; Development Workflow.
- Removed sections: none; template placeholders were replaced.
- Template review: plan-template.md and spec-template.md align; no change needed.
- Pending: tasks-template.md calls tests optional unless a specification requests them.
  Reconcile this with the verification principle when template edits are permitted.
- Command templates: .specify/templates/commands/ does not exist in this release.
- Runtime guidance: README.md and AGENTS.md reviewed; no changes needed.
- Deferred placeholders: none.
-->
# DataPulse Constitution

## Core Principles

### I. MVP Focus
DataPulse MUST help small business owners understand their key numbers and progress
through clear KPIs and charts. Each feature MUST have a specific user benefit and
testable acceptance criteria. The team MUST prefer the simplest solution that meets
the MVP scope, so work stays achievable and useful.

### II. Typed App Router Architecture
The application MUST use the Next.js App Router and TypeScript strict mode. New code
MUST use explicit, meaningful types and MUST avoid `any`. Pages and components MUST
remain Server Components by default; a Client Component MUST be used only when
interactivity or browser APIs require it. This keeps data boundaries clear and
limits unnecessary client-side JavaScript.

### III. Accessible, Reusable UI
The UI MUST use semantic HTML and reusable components for repeated patterns.
Interactive controls MUST have accessible names, visible keyboard focus, and
keyboard operation. Charts MUST provide text labels or summaries so their meaning
is available without color or visual interpretation alone. Styling MUST use
Tailwind CSS utilities first, with consistent spacing and readable contrast.

### IV. Verified Changes
Each change MUST be checked against its acceptance criteria. KPI calculations and
other nontrivial logic MUST have automated tests when the project has a test
runner; until then, the pull request MUST document reproducible manual checks.
UI changes MUST be checked for keyboard use and common empty, loading, and error
states. ESLint, Prettier, and TypeScript checks MUST pass before review. These
checks catch regressions without requiring a large test setup for the student MVP.

### V. Team Review
Work MUST happen on feature branches. The `main` branch MUST be protected from
direct pushes, and every pull request MUST receive approval from at least one
teammate before merge. Reviewers MUST check the feature behavior, accessibility,
and this constitution. Shared review keeps the MVP consistent across contributors.

## Technical Standards

- Use PascalCase for React components and type names, camelCase for variables and
  functions, and descriptive kebab-case names for route folders and ordinary files.
  Preserve Next.js special file names such as `page.tsx` and `layout.tsx`.
- Keep components and functions focused. Share a component or helper when a real
  pattern repeats, rather than adding abstractions before they are needed.
- Keep secrets and sensitive business data out of client components and the
  repository. Show KPI units, date ranges, and empty states clearly.

## Development Workflow

1. Define the user story and acceptance criteria before implementation.
2. Make a focused change on a feature branch and use descriptive names.
3. Run available lint, formatting, and type checks. Add automated tests where
   supported; otherwise record repeatable manual checks in the pull request.
4. Open a pull request that explains the change, test results, and any known gaps.
   Merge only after one teammate approves and required checks pass.

## Governance

This constitution guides specifications, plans, implementation, and pull request
reviews. A change to these rules MUST be proposed in a pull request, explain its
reason and effect on existing work, and receive at least one teammate approval.
Use semantic versioning for amendments: MAJOR for incompatible rule changes,
MINOR for new or materially expanded rules, and PATCH for clarifications. Review
affected Spec-Kit templates when amending the constitution. Any exception MUST be
documented and justified in the relevant plan or pull request.

**Version**: 1.0.0 | **Ratified**: Pending team approval | **Last Amended**: 2026-11-07
