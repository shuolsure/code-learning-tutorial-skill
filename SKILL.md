---
name: "code-learning-tutorial"
description: "Creates interactive web tutorials for code learning beginners. Invoke when user wants to create a beginner-friendly tutorial for a codebase or project."
---

# Code Learning Tutorial Creator v4.0

Create comprehensive, interactive web tutorials for programming beginners to learn codebases from scratch.

## When to Invoke

- User wants to create a learning tutorial for a codebase
- User mentions "code learning", "beginner tutorial", "interactive tutorial"
- User wants to help beginners understand a project
- User asks for a structured way to teach code to newcomers

---

## 🚀 Complete Workflow

### Step 1: Analyze Codebase (MANDATORY - Use Tools)

```
1.1 Get Project Structure
    → Tool: LS(path: project_root)
    → Goal: List top-level folders, identify modules
    → Output: ["agent/", "bus/", "session/", "providers/"]

1.2 Count Source Files
    → Tool: Glob(pattern: "**/*.py", path: project_root)
    → Goal: Count total files, identify file types
    → Output: 42 Python files

1.3 Extract All Code Elements
    → Tool: Grep(pattern: "^class |^def |^async def ", path: project_root, output_mode: "content", -n: true)
    → Goal: Find all classes and functions with line numbers
    → Output: "loop.py:15:class AgentLoop"

1.4 Find Entry Point
    → Tool: Grep(pattern: "if __name__|def main|async def run", path: project_root)
    → Goal: Identify main entry point
    → Output: "main.py" or "__main__.py"

1.5 Map Dependencies
    → Tool: Grep(pattern: "^import |^from ", path: project_root, output_mode: "content")
    → Goal: Build module dependency graph
    → Output: "from agent.loop import AgentLoop"

1.6 Read Core Files
    → Tool: Read(file_path: core_file, limit: 100)
    → Goal: Understand core logic, extract docstrings
    → Output: Class definitions, key methods
```

### Step 2: Generate Tutorial Files

```
2.1 Create Directory Structure
    mkdir -p tutorial/{css,js,assets/images}

2.2 Copy Templates
    - templates/index.html → tutorial/index.html
    - templates/style.css → tutorial/css/style.css
    - templates/demo.css → tutorial/css/demo.css
    - templates/socratic.css → tutorial/css/socratic.css
    - templates/tutorial.js → tutorial/js/tutorial.js

2.3 Generate Data Files
    - js/code-data.js (from code analysis)
    - js/methods-data.js (from function extraction)
    - js/demo-data.js (from execution flow analysis)
```

### Step 3: Fill Placeholders

See: [Placeholder Filling Guide](#placeholder-filling-guide) below

### Step 4: Verify & Test

See: [Verification Checklist](#verification-checklist) below

---

## 📋 Placeholder Filling Guide

### index.html Placeholders

| Placeholder | How to Fill | Tool/Source |
|-------------|-------------|-------------|
| `{{PROJECT_NAME}}` | README.md title or folder name | Read README.md line 1 |
| `{{PROJECT_TAGLINE}}` | README.md description | Read README.md line 2-5 |
| `{{PROJECT_ICON}}` | Choose based on project type | 🤖 for AI, 🌐 for web, 📊 for data |
| `{{CORE_POSITIONING}}` | What problem does it solve? | Analyze main.py + README |
| `{{KEY_FEATURES}}` | List 3-5 main capabilities | Grep main functions |
| `{{TARGET_USERS}}` | Who benefits? | Infer from complexity |
| `{{LEARNING_VALUE}}` | What will beginners learn? | Analyze architecture |
| `{{FILES_COUNT}}` | Count source files | Glob + wc -l |
| `{{MODULES_COUNT}}` | Count top-level folders | LS |
| `{{METHODS_COUNT}}` | Count functions/methods | Grep + wc -l |
| `{{FEATURES_CARDS}}` | Generate feature cards HTML | See Stage 2 Guide |
| `{{ARCHITECTURE_SVG}}` | Generate SVG diagram | Use generators/svg-architecture.js |
| `{{MODULE_CARDS}}` | Generate module cards HTML | See Stage 3 Guide |
| `{{FOLDER_TREE}}` | Generate folder tree HTML | Use generators/folder-tree.js |
| `{{METHODS_PYRAMID}}` | Generate methods pyramid | See Stage 5 Guide |
| `{{KNOWLEDGE_GRAPH}}` | Generate relationship graph | See Stage 5 Guide |
| `{{DEMO_BUTTONS}}` | Generate demo selector buttons | See Stage 6 Guide |
| `{{DEMO_FLOW_SVG}}` | Generate flow diagram SVG | Use generators/flow-diagram.js |
| `{{SOCRATIC_QUESTIONS}}` | Generate Q&A sections | See Stage 7 Guide |

### code-data.js Generation

```javascript
// For each core module, generate:
{
    '{{MODULE_ID}}': {
        title: '{{MODULE_NAME}}',
        file: '{{FILE_PATH}}',
        description: '{{FIRST_LINE_DOCSTRING}}',
        sections: [
            {
                name: '核心实现',
                code: `{{ACTUAL_CODE_FROM_FILE}}`,  // Use Read tool
                explanation: generateSocraticExplanation(code)
            }
        ],
        relatedFiles: findRelatedFiles(file),  // Use Grep imports
        tips: extractTipsFromDocstrings(code)
    }
}
```

### methods-data.js Generation

```javascript
// Extract from Grep output:
{
    methods: [
        {
            id: '{{FUNCTION_NAME}}',
            name: '{{FUNCTION_NAME}}()',
            file: '{{FILE_PATH}}',
            line: {{LINE_NUMBER}},
            signature: extractSignature(code),  // Parse from code
            description: '{{DOCSTRING_FIRST_LINE}}',
            category: categorizeMethod(name),   // core/helper/handler
            level: determineLevel(name),        // 1/2/3
            socratic: generateSocraticQuestions(code, context)
        }
    ],
    relationships: buildCallGraph(methods)  // Analyze function calls
}
```

### demo-data.js Generation

```javascript
// Design 2-4 scenarios based on main use cases:
{
    '{{SCENARIO_ID}}': {
        title: '{{SCENARIO_NAME}}',
        description: '{{WHAT_IT_DEMONSTRATES}}',
        steps: traceExecutionPath(entryPoint)  // Read code, trace calls
    }
}
```

---

## ✅ Verification Checklist

### After Generation, Run These Checks:

```bash
# 1. Open tutorial in browser
open tutorial/index.html

# 2. Check navigation (click each nav item)
- [ ] Overview loads
- [ ] Features loads
- [ ] Architecture loads
- [ ] Folder Structure loads
- [ ] Methods loads
- [ ] Demo loads
- [ ] Socratic loads

# 3. Check interactions
- [ ] Click "查看源码" → Modal opens
- [ ] Modal tabs work
- [ ] Code syntax highlighting works
- [ ] Related files links work

# 4. Check Demo
- [ ] Play button starts animation
- [ ] Pause button works
- [ ] Reset button works
- [ ] Step forward works
- [ ] Flow diagram highlights correctly

# 5. Check Progress
- [ ] Progress bar updates on scroll
- [ ] Progress percentage correct

# 6. Check Mobile
- [ ] Resize browser to mobile width
- [ ] Sidebar responsive
- [ ] Content readable
```

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Modal not opening | codeData key mismatch | Check onclick matches codeData key |
| SVG not rendering | Invalid viewBox | Check SVG generator output |
| Progress > 100% | totalSections wrong | Update in tutorial.js: `const totalSections = 7;` |
| Code not highlighting | Prism.js not loaded | Check script tags |
| Missing CSS styles | CSS files not copied | Copy demo.css, socratic.css |

---

## ⚠️ Edge Cases

### If Project Has No main.py

```
1. Check for __main__.py
2. Check for __init__.py with main() function
3. Check README.md for usage instructions
4. If library (not app):
   - Focus on API design
   - Show usage examples
   - Explain design patterns
```

### If Project Is a Library

```
1. Overview: Explain library purpose
2. Features: Show key APIs
3. Architecture: Show module structure
4. Methods: Document public APIs
5. Demo: Show usage examples
6. Socratic: Ask about API design choices
```

### If Project Has Multiple Entry Points

```
1. Document each entry point
2. Create separate demo scenarios
3. Show how they interact
```

### If Code Is Minified/Compiled

```
1. Look for source maps
2. Check for src/ directory
3. Use README for understanding
```

---

## 📚 Available Guides

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

## 📁 Templates

| Template | File | Usage |
|----------|------|-------|
| HTML | [templates/index.html](templates/index.html) | Main tutorial page structure |
| CSS Main | [templates/style.css](templates/style.css) | Core styling |
| CSS Demo | [templates/demo.css](templates/demo.css) | Demo section styling |
| CSS Socratic | [templates/socratic.css](templates/socratic.css) | Q&A section styling |
| JavaScript | [templates/tutorial.js](templates/tutorial.js) | Core functionality |

---

## 🔧 Generators

| Generator | File | Purpose |
|-----------|------|---------|
| SVG Architecture | [generators/svg-architecture.js](generators/svg-architecture.js) | Auto-generate architecture diagrams |
| Flow Diagram | [generators/flow-diagram.js](generators/flow-diagram.js) | Create execution flow diagrams |
| Folder Tree | [generators/folder-tree.js](generators/folder-tree.js) | Generate interactive folder tree |

---

## 📝 Examples

| Example | File | Description |
|---------|------|-------------|
| code-data.js | [examples/code-data-example.js](examples/code-data-example.js) | Code explanations structure |
| methods-data.js | [examples/methods-data-example.js](examples/methods-data-example.js) | Method documentation structure |
| demo-data.js | [examples/demo-data-example.js](examples/demo-data-example.js) | Demo scenarios structure |

---

## 🎯 Success Metrics

A complete tutorial should have:
- ✅ 7 navigation sections
- ✅ 15+ code explanations with Socratic questions
- ✅ 40+ documented methods
- ✅ 2+ demo scenarios with flow diagrams
- ✅ Complete method relationship graph
- ✅ Responsive design (mobile-friendly)
- ✅ Working search and progress tracking
- ✅ All modals functional
- ✅ All SVG diagrams rendering

---

## 💡 Best Practices

1. **Analyze First** - Always run Step 1 completely before generating
2. **Use Real Code** - Copy actual code from files, don't invent
3. **Deep Socratic** - Ask "why" 3 levels deep
4. **Trace Real Paths** - Demo scenarios should trace actual code execution
5. **Test Everything** - Run verification checklist
6. **Mobile First** - Ensure responsive design works
7. **Performance** - Keep JS files under 100KB each
