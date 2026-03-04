---
name: "code-learning-tutorial"
description: "Creates interactive web tutorials for code learning beginners. Invoke when user wants to create a beginner-friendly tutorial for a codebase or project."
---

# Code Learning Tutorial Creator v3.0

Create comprehensive, interactive web tutorials for programming beginners to learn codebases from scratch.

## When to Invoke

- User wants to create a learning tutorial for a codebase
- User mentions "code learning", "beginner tutorial", "interactive tutorial"
- User wants to help beginners understand a project
- User asks for a structured way to teach code to newcomers

---

## Quick Start

### Phase 1: Analyze Codebase
```
1. LS - Get project structure
2. Glob - Find all source files (**/*.py or **/*.js)
3. Grep - Extract code elements (^class |^def |^async def )
4. Read - Understand core files
5. Grep - Map dependencies (^import |^from )
```

### Phase 2: Generate Tutorial
```
tutorial/
├── index.html
├── css/{style.css, demo.css, socratic.css}
├── js/{tutorial.js, code-data.js, methods-data.js, demo-data.js}
└── assets/images/
```

---

## Available Guides

| Stage | Guide | Description |
|-------|-------|-------------|
| 1 | [Project Overview](guides/stage-1-overview.md) | Create comprehensive project overview |
| 2 | [Core Features](guides/stage-2-features.md) | Explain features with source code |
| 3 | [Architecture](guides/stage-3-architecture.md) | Visualize system architecture |
| 4 | [Folder Structure](guides/stage-4-folder-structure.md) | Interactive folder tree |
| 5 | [Methods](guides/stage-5-methods.md) | Method documentation & knowledge graph |
| 6 | [Run Demo](guides/stage-6-demo.md) | Execution flow demonstrations |
| 7 | [Socratic Teaching](guides/stage-7-socratic.md) | Q&A teaching methodology |

---

## Templates

| Template | File | Usage |
|----------|------|-------|
| HTML | [templates/index.html](templates/index.html) | Main tutorial page structure |
| CSS | [templates/style.css](templates/style.css) | Complete styling |
| JavaScript | [templates/tutorial.js](templates/tutorial.js) | Core functionality |

---

## Generators

| Generator | File | Purpose |
|-----------|------|---------|
| SVG Architecture | [generators/svg-architecture.js](generators/svg-architecture.js) | Auto-generate architecture diagrams |
| Flow Diagram | [generators/flow-diagram.js](generators/flow-diagram.js) | Create execution flow diagrams |
| Folder Tree | [generators/folder-tree.js](generators/folder-tree.js) | Generate interactive folder tree |

---

## Examples

| Example | File | Description |
|---------|------|-------------|
| code-data.js | [examples/code-data-example.js](examples/code-data-example.js) | Code explanations structure |
| methods-data.js | [examples/methods-data-example.js](examples/methods-data-example.js) | Method documentation structure |
| demo-data.js | [examples/demo-data-example.js](examples/demo-data-example.js) | Demo scenarios structure |

---

## Quality Checklist

### Content Quality
- [ ] All placeholders replaced
- [ ] Code snippets from actual files
- [ ] Socratic questions have depth
- [ ] Related files correctly linked

### Technical Quality
- [ ] Navigation works
- [ ] Modals open/close
- [ ] Progress tracking works
- [ ] SVG diagrams render
- [ ] Syntax highlighting works

### UI/UX Quality
- [ ] Text contrast readable (WCAG AA)
- [ ] Mobile responsive
- [ ] Smooth animations
- [ ] Consistent typography

---

## Success Metrics

A complete tutorial should have:
- 7+ navigation sections
- 15+ code explanations
- 40+ documented methods
- 2+ demo scenarios
- Complete method relationship graph
- Responsive design
- Working search and progress tracking

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Progress bar > 100% | Update `totalSections` in tutorial.js |
| SVG not rendering | Check viewBox dimensions |
| Modal not opening | Verify codeData key matches onclick |
| Code not highlighting | Ensure Prism.js loaded correctly |
| Mobile layout broken | Check CSS media queries |

---

## Best Practices

1. **Start with Analysis** - Don't skip codebase analysis
2. **Use Real Code** - Copy actual code from files
3. **Think Like a Beginner** - Explain step by step
4. **Show Relationships** - Connect related concepts
5. **Test Interactions** - Verify all elements work
6. **Optimize Performance** - Keep file sizes reasonable
7. **Document Decisions** - Explain why, not just what
