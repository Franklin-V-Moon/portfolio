# `.ai/`

This directory backs a tool-agnostic AI assistant setup for this repo. It's designed so that all AI coding assistants (e.g. Claude Code, Cursor, Gemini CLI, or any other tool that follows the same open standards) read the same instructions, skills, and MCP config — nothing vendor-specific needs to be duplicated by hand.

## How it fits together

| Concern | Canonical source | How each tool sees it |
|---|---|---|
| Project instructions | `AGENTS.md` (repo root) | Cursor and most agentic tools read it natively. `CLAUDE.md` and `GEMINI.md` are one-line files (`@AGENTS.md`) that import it. |
| Skills | `.agents/skills/` (repo root) | Cursor and Gemini CLI scan `.agents/skills/` natively. `.claude/skills` is a symlink to the same directory. |
| MCP servers | `.ai/mcp.json` | `.mcp.json`, `.cursor/mcp.json`, and `.gemini/settings.json` are all symlinks to this one file. |
| Durable project knowledge | `.ai/context/` | No native mechanism exists across all three tools yet — this is a plain convention. `AGENTS.md` tells every assistant to read and update it. |
| Investigation/spike notes | `.ai/research/` | Same as above — a convention referenced from `AGENTS.md`. |

Why AGENTS.md and Agent Skills specifically: both are genuinely open, cross-vendor standards (not a Claude-specific format wearing a disguise) — see [agents.md](https://agents.md) and [agentskills.io](https://agentskills.io). Building on them means new tools that adopt the same standards pick up this setup for free, with no repo changes.

## Adding things

- **New instruction**: edit `AGENTS.md`, not `CLAUDE.md` or `GEMINI.md`.
- **New skill**: create `.agents/skills/<name>/SKILL.md` (frontmatter: at minimum `name` and `description`, matching the folder name). It's automatically visible to all three tools through the paths above. If a whole-directory symlink for `.claude/skills` ever stops picking up a new skill in Claude Code specifically, symlink the individual skill folder instead: `ln -s ../../.agents/skills/<name> .claude/skills/<name>`.
- **New MCP server**: add it to `.ai/mcp.json`'s `mcpServers` object once; all three tools pick it up.

## Known limitation

`.gemini/settings.json` is currently *only* the MCP config (a full symlink to `.ai/mcp.json`). If Gemini-specific settings unrelated to MCP are needed later (e.g. `contextFileName`), break that symlink and merge the two manually.
