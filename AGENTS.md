# AGENTS.md
This file captures the project intent and working agreements for future Codex sessions.

## Project Summary


## User Goal


## Source of truth
Before making changes, read:
- docs/ai/coding-standards.md
- docs/ai/testing-conventions.md
- docs/ai/architecture-principles.md
- docs/ai/review-rubric.md
- docs/ai/lessons-learned.md

## Agent workflow
Use three roles when the task is more than a trivial one-line change:
1. Software Architect Agent: assess architecture, component boundaries, dependency choices, clean code, maintainability.
2. Developer Agent: implement the smallest correct change.
3. Test Engineer Agent: test the behavior, add/adjust tests, look for edge cases and regressions.

## Quality gate
A change is not done until:
- relevant tests pass;
- the Test Engineer gives no blocking issues;
- the Software Architect gives no blocking issues;
- any new dependency is justified and accepted;
- the final response lists changed files, test commands run, known risks, and remaining follow-ups.

## Dependency policy
Do not add a new production library unless the Software Architect confirms:
- native platform or existing project utilities are insufficient;
- the library is maintained;
- bundle/runtime impact is acceptable;
- mobile/Safari/PWA behavior is acceptable where relevant;
- accessibility and testability are not degraded.

## Testing policy
Prefer behavior-oriented tests over implementation-detail tests.
Tests should prove user-visible behavior, data transformations, edge cases, and regression risks.
Avoid snapshot tests unless they protect a stable, intentional public contract.

## Lessons learned policy
Do not silently rewrite docs/ai/lessons-learned.md.
When a recurring issue is found, propose a lesson under "Candidate lessons".
Only move it to "Accepted lessons" after explicit user or reviewer approval.

## Chosen Platform

