# Skill Usage in This Repo

Use local skills only when task intent matches their trigger conditions.

## Available System Skills
- `skill-creator`: create or update a Codex skill package.
- `skill-installer`: install skills from curated sources or GitHub paths.

## Rules
1. Do not invoke skills for regular feature/bug/test tasks in this repo.
2. Use `skill-creator` only when the request is to design or revise a reusable Codex skill.
3. Use `skill-installer` only when the request is to discover/install skills.
4. If a skill is not needed, continue with standard `AGENTS.md` + `agents/` workflow.
