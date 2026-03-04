---
name: "code-learning-tutorial"
description: "Creates interactive web tutorials for code learning beginners. Invoke when user wants to create a beginner-friendly tutorial for a codebase or project."
---

# Code Learning Tutorial Creator v3.0

This skill helps you create comprehensive, interactive web tutorials for programming beginners to learn codebases from scratch.

## When to Invoke

Invoke this skill when:
- User wants to create a learning tutorial for a codebase
- User mentions "code learning", "beginner tutorial", "interactive tutorial"
- User wants to help beginners understand a project
- User asks for a structured way to teach code to newcomers

---

## 🚀 Quick Start Workflow

### Phase 1: Codebase Analysis (Use Tools)

```
Step 1.1: Get Project Structure
→ Tool: LS (list directory)
→ Goal: Understand folder hierarchy

Step 1.2: Find All Source Files  
→ Tool: Glob (pattern: **/*.py or **/*.js)
→ Goal: Count files, identify file types

Step 1.3: Extract Code Elements
→ Tool: Grep (pattern: "^class |^def |^async def |^function ")
→ Goal: Find all classes and functions

Step 1.4: Read Core Files
→ Tool: Read (entry points, main modules)
→ Goal: Understand core logic

Step 1.5: Find Dependencies
→ Tool: Grep (pattern: "^import |^from ")
→ Goal: Map module relationships
```

### Phase 2: Generate Tutorial Files

Create this directory structure:
```
tutorial/
├── index.html
├── css/
│   ├── style.css
│   ├── demo.css
│   └── socratic.css
├── js/
│   ├── tutorial.js
│   ├── code-data.js
│   ├── methods-data.js
│   ├── demo-data.js
│   ├── demo-flow.js
│   └── demo-controller.js
└── assets/images/
```

---

## 📋 Detailed Implementation Guide

### Stage 1: Project Overview

**Data Collection Steps:**

```bash
# 1. Count Python files
find . -name "*.py" -not -path "./tests/*" -not -path "./.venv/*" | wc -l

# 2. Count classes
grep -r "^class " --include="*.py" | wc -l

# 3. Count functions  
grep -r "^def \|^async def " --include="*.py" | wc -l

# 4. Find entry point
grep -r "if __name__" --include="*.py" -l
```

**Placeholder Filling Guide:**

| Placeholder | How to Fill | Tool |
|-------------|-------------|------|
| `PROJECT_NAME` | From README.md title or folder name | Read README.md |
| `PROJECT_TAGLINE` | From README.md description | Read README.md |
| `CORE_POSITIONING` | What problem does it solve? | Analyze main.py |
| `KEY_FEATURES` | List 3-5 main capabilities | Grep for main functions |
| `TARGET_USERS` | Who benefits from this? | Infer from complexity |
| `LEARNING_VALUE` | What will beginners learn? | Analyze architecture |
| `FILES_COUNT` | Count source files | Glob + wc -l |
| `MODULES_COUNT` | Count top-level folders | LS |
| `METHODS_COUNT` | Count functions/methods | Grep + wc -l |

**HTML Template:**
```html
<section id="overview" class="section">
    <div class="content-card">
        <h1><i class="fas fa-home"></i> 项目概述</h1>
        
        <div class="overview-hero">
            <div class="project-badge">
                <span class="project-icon">{{PROJECT_ICON}}</span>
                <h2>{{PROJECT_NAME}}</h2>
                <p class="tagline">{{PROJECT_TAGLINE}}</p>
            </div>
        </div>

        <div class="overview-grid">
            <div class="overview-item">
                <div class="overview-icon">🎯</div>
                <h3>核心定位</h3>
                <p>{{CORE_POSITIONING}}</p>
            </div>
            <div class="overview-item">
                <div class="overview-icon">⚡</div>
                <h3>主要特点</h3>
                <p>{{KEY_FEATURES}}</p>
            </div>
            <div class="overview-item">
                <div class="overview-icon">👥</div>
                <h3>适用人群</h3>
                <p>{{TARGET_USERS}}</p>
            </div>
            <div class="overview-item">
                <div class="overview-icon">🚀</div>
                <h3>学习价值</h3>
                <p>{{LEARNING_VALUE}}</p>
            </div>
        </div>

        <div class="quick-stats">
            <div class="stat-item">
                <span class="stat-number">{{FILES_COUNT}}</span>
                <span class="stat-label">代码文件</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">{{MODULES_COUNT}}</span>
                <span class="stat-label">功能模块</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">{{METHODS_COUNT}}</span>
                <span class="stat-label">核心方法</span>
            </div>
        </div>
    </div>
</section>
```

---

### Stage 2: Core Features with Source Code

**Feature Identification Process:**

```
Step 2.1: Find Core Modules
→ Tool: LS to list top-level modules
→ Example: agent/, bus/, session/, providers/

Step 2.2: Identify Key Functions per Module
→ Tool: Grep "^class |^def " in each module
→ Example: AgentLoop class, MessageBus class

Step 2.3: Read Implementation Details
→ Tool: Read each core file
→ Extract: docstrings, key methods, design patterns

Step 2.4: Generate Socratic Questions
→ Based on: design patterns, trade-offs, alternatives
```

**Socratic Question Generation Guide:**

For each code section, generate 3 questions:

```
Question 1: Design Rationale
- Pattern: "为什么使用 [设计模式/技术]？"
- Answer: Explain the problem it solves

Question 2: Trade-offs  
- Pattern: "有什么替代方案？各有什么优缺点？"
- Answer: Compare alternatives

Question 3: Edge Cases
- Pattern: "如果 [异常情况] 会发生什么？"
- Answer: Explain error handling

Question 4: Extension (Optional)
- Pattern: "如何扩展这个功能？"
- Answer: Show extension points
```

**code-data.js Generation Template:**

```javascript
const codeData = {
    // For each core feature/module
    '{{FEATURE_ID}}': {
        title: '{{FEATURE_NAME}}',
        file: '{{FILE_PATH}}',
        description: '{{ONE_LINE_DESCRIPTION}}',
        sections: [
            {
                name: '核心实现',
                code: `{{ACTUAL_CODE_FROM_FILE}}`,
                explanation: `**苏格拉底式提问**：

1. 为什么这样设计？
   → {{DESIGN_REASON}}

2. 有什么替代方案？
   → {{ALTERNATIVE_SOLUTIONS}}

3. 这样设计的好处？
   → {{BENEFITS}}`
            },
            {
                name: '关键方法',
                code: `{{METHOD_CODE}}`,
                explanation: `**苏格拉底式提问**：

1. 这个方法的作用是什么？
   → {{METHOD_PURPOSE}}

2. 参数和返回值的含义？
   → {{PARAMS_EXPLANATION}}`
            }
        ],
        relatedFiles: ['{{RELATED_FILE_1}}', '{{RELATED_FILE_2}}'],
        tips: ['{{TIP_1}}', '{{TIP_2}}']
    }
};
```

**How to Extract Related Files:**
```bash
# Find imports in a file
grep "^from \|^import " path/to/file.py

# Find files that import this module
grep -r "from module_name import\|import module_name" --include="*.py"
```

---

### Stage 3: System Architecture

**Architecture Analysis Process:**

```
Step 3.1: Identify Modules
→ Tool: LS to get top-level folders
→ Filter: exclude tests/, docs/, config/

Step 3.2: Map Dependencies
→ Tool: Grep "^import \|^from " in each module
→ Build: dependency graph

Step 3.3: Determine Data Flow
→ Tool: Read main entry point
→ Trace: how data moves between modules

Step 3.4: Identify Key Components
→ Tool: Grep "^class " to find main classes
→ Categorize: by responsibility
```

**SVG Architecture Diagram Generator:**

```javascript
// Auto-generate SVG from module analysis
function generateArchitectureSVG(modules) {
    const width = 800;
    const height = 500;
    const nodeWidth = 150;
    const nodeHeight = 60;
    const padding = 50;
    
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="arch-svg">`;
    svg += `<defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
        </marker>
    </defs>`;
    
    // Calculate positions using grid layout
    const cols = Math.ceil(Math.sqrt(modules.length));
    modules.forEach((mod, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = padding + col * (nodeWidth + 50);
        const y = padding + row * (nodeHeight + 80);
        
        // Draw node
        svg += `
            <g class="arch-node" data-module="${mod.name}">
                <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" 
                      rx="8" fill="${mod.color || '#667eea'}" opacity="0.9"/>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 + 5}" 
                      text-anchor="middle" fill="white" font-size="14" font-weight="600">
                    ${mod.name}
                </text>
            </g>`;
    });
    
    // Draw connections based on dependencies
    modules.forEach((mod, i) => {
        mod.dependencies.forEach(dep => {
            const fromIdx = modules.findIndex(m => m.name === mod.name);
            const toIdx = modules.findIndex(m => m.name === dep);
            if (fromIdx !== -1 && toIdx !== -1) {
                svg += drawConnection(fromIdx, toIdx, cols, nodeWidth, nodeHeight, padding);
            }
        });
    });
    
    svg += '</svg>';
    return svg;
}

function drawConnection(fromIdx, toIdx, cols, nodeWidth, nodeHeight, padding) {
    const fromCol = fromIdx % cols;
    const fromRow = Math.floor(fromIdx / cols);
    const toCol = toIdx % cols;
    const toRow = Math.floor(toIdx / cols);
    
    const x1 = padding + fromCol * (nodeWidth + 50) + nodeWidth;
    const y1 = padding + fromRow * (nodeHeight + 80) + nodeHeight/2;
    const x2 = padding + toCol * (nodeWidth + 50);
    const y2 = padding + toRow * (nodeHeight + 80) + nodeHeight/2;
    
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                  stroke="#667eea" stroke-width="2" marker-end="url(#arrowhead)"/>`;
}
```

**Module Card Template:**
```html
<div class="module-card">
    <div class="module-icon">{{ICON}}</div>
    <h3>{{MODULE_NAME}}</h3>
    <p>{{MODULE_DESCRIPTION}}</p>
    <div class="module-responsibilities">
        <span class="resp-tag">{{RESPONSIBILITY_1}}</span>
        <span class="resp-tag">{{RESPONSIBILITY_2}}</span>
    </div>
</div>
```

**Module Icons Reference:**
| Module Type | Icon | Example |
|-------------|------|---------|
| Core/Agent | 🤖 | agent/, core/ |
| Communication | 📡 | bus/, channels/ |
| Data/Storage | 💾 | session/, memory/ |
| External API | 🔌 | providers/, api/ |
| Utilities | 🔧 | utils/, helpers/ |
| Configuration | ⚙️ | config/, settings/ |

---

### Stage 4: Interactive Folder Structure

**Folder Tree Generation Process:**

```
Step 4.1: Get Directory Structure
→ Tool: LS recursively (or use Glob)
→ Build: tree structure object

Step 4.2: Get File Descriptions
→ Tool: Read first 20 lines of each file
→ Extract: docstrings, comments, imports

Step 4.3: Categorize Files
→ Core files: main logic
→ Config files: settings
→ Test files: skip or mark separately
→ Utility files: helpers
```

**Folder Description Auto-Generation:**

```javascript
// Generate description from file content
function generateFileDescription(filePath, content) {
    // 1. Check for module docstring
    const docstringMatch = content.match(/"""([\s\S]*?)"""/);
    if (docstringMatch) {
        return docstringMatch[1].split('\n')[0].trim();
    }
    
    // 2. Check for class/function definitions
    const classMatch = content.match(/class\s+(\w+)/);
    if (classMatch) {
        return `定义 ${classMatch[1]} 类`;
    }
    
    // 3. Check for main functions
    const funcMatches = content.match(/def\s+(\w+)/g);
    if (funcMatches && funcMatches.length > 0) {
        const funcs = funcMatches.slice(0, 3).map(f => f.replace('def ', ''));
        return `包含: ${funcs.join(', ')} 等方法`;
    }
    
    // 4. Default description
    return '辅助模块';
}
```

**JavaScript for Folder Tree:**

```javascript
function generateFolderTree(structure) {
    let html = '<div class="folder-root">';
    
    structure.forEach(item => {
        if (item.type === 'folder') {
            html += `
                <div class="folder-item">
                    <div class="folder-header" onclick="toggleFolder(this)">
                        <i class="fas fa-folder${item.expanded ? '-open' : ''}"></i>
                        <span class="folder-name">${item.name}</span>
                        <span class="folder-desc">${item.description || ''}</span>
                        <i class="fas fa-chevron-${item.expanded ? 'down' : 'right'} folder-toggle"></i>
                    </div>
                    <div class="folder-children" style="display: ${item.expanded ? 'block' : 'none'}">
                        ${generateFolderTree(item.children)}
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="file-item" onclick="showSourceCode('${item.id}')">
                    <i class="fas fa-file-code"></i>
                    <span class="file-name">${item.name}</span>
                    <span class="file-desc">${item.description || ''}</span>
                    <i class="fas fa-arrow-right file-arrow"></i>
                </div>
            `;
        }
    });
    
    html += '</div>';
    return html;
}

function toggleFolder(header) {
    const item = header.parentElement;
    const children = item.querySelector('.folder-children');
    const icon = header.querySelector('.fa-folder, .fa-folder-open');
    const toggle = header.querySelector('.folder-toggle');
    
    if (children.style.display === 'none') {
        children.style.display = 'block';
        icon.classList.replace('fa-folder', 'fa-folder-open');
        toggle.classList.replace('fa-chevron-right', 'fa-chevron-down');
    } else {
        children.style.display = 'none';
        icon.classList.replace('fa-folder-open', 'fa-folder');
        toggle.classList.replace('fa-chevron-down', 'fa-chevron-right');
    }
}
```

---

### Stage 5: Method Introduction with Knowledge Graph

**Method Extraction Process:**

```
Step 5.1: Find All Functions
→ Tool: Grep "^def |^async def " --include="*.py" -n
→ Output: file:line:function_name

Step 5.2: Extract Signatures
→ Tool: Read each file
→ Parse: function name, parameters, return type

Step 5.3: Find Call Relationships
→ Tool: Grep "function_name\(" --include="*.py"
→ Build: who calls whom

Step 5.4: Categorize Methods
→ Core: main business logic
→ Helper: utility functions  
→ Handler: event/message handlers
```

**Method Relationship Analysis:**

```javascript
// Build call graph from grep results
function buildCallGraph(grepResults) {
    const graph = {
        nodes: [],
        edges: []
    };
    
    // Parse function definitions
    const definitions = grepResults.filter(r => r.match(/def\s+\w+/));
    definitions.forEach(def => {
        const match = def.match(/^(.+?):(\d+):.*?def\s+(\w+)\s*\((.*?)\)/);
        if (match) {
            graph.nodes.push({
                id: match[3],
                file: match[1],
                line: parseInt(match[2]),
                params: match[4]
            });
        }
    });
    
    // Find calls (simplified)
    graph.nodes.forEach(node => {
        // Read file and find calls within function body
        // Add edges for each call found
    });
    
    return graph;
}
```

**Knowledge Graph Visualization:**

```javascript
// Generate D3.js or Cytoscape.js compatible graph
function generateKnowledgeGraph(methodsData) {
    return {
        nodes: methodsData.methods.map(m => ({
            id: m.id,
            label: m.name,
            category: m.category,
            level: m.level
        })),
        edges: methodsData.relationships.map(r => ({
            source: r.from,
            target: r.to,
            type: r.type,
            label: r.label
        }))
    };
}
```

**Pyramid Structure for Methods:**

```
Level 1 (Top): Entry Points
├── main(), run(), start()
│
Level 2 (Middle): Core Logic  
├── process(), handle(), execute()
│
Level 3 (Bottom): Utilities
├── helpers, validators, formatters
```

---

### Stage 6: Run Demo with Flow Diagrams

**Demo Scenario Design Process:**

```
Step 6.1: Identify Core Use Cases
→ Tool: Read entry points (main.py, __main__.py)
→ Find: main execution flow

Step 6.2: Trace Execution Path
→ Tool: Read function by function
→ Map: step-by-step flow

Step 6.3: Extract Code at Each Step
→ Tool: Read specific line ranges
→ Format: with context

Step 6.4: Design Data Flow
→ Identify: input/output at each step
→ Show: data transformation
```

**Scenario Template:**

```javascript
const demoData = {
    scenarios: [
        {
            id: 'main_flow',
            title: '主要执行流程',
            description: '展示系统如何处理用户请求',
            icon: 'fa-play-circle',
            steps: [
                {
                    id: 1,
                    node: 'input',
                    title: '步骤 1: 接收输入',
                    description: '系统接收用户消息',
                    icon: 'fa-inbox',
                    color: '#48bb78',
                    dataFlow: {
                        input: { type: 'UserInput', data: '用户消息' },
                        output: { type: 'InboundMessage', data: '消息对象' },
                        transformation: '原始输入 → 消息对象'
                    },
                    code: {
                        file: 'path/to/file.py',
                        functionName: 'receive_message',
                        line: 10,
                        signature: 'def receive_message(content: str) -> InboundMessage',
                        snippet: `def receive_message(content: str) -> InboundMessage:
    """接收用户消息并封装"""
    msg = InboundMessage(
        content=content,
        channel='cli',
        timestamp=datetime.now()
    )
    return msg`
                    }
                },
                // ... more steps
            ]
        }
    ]
};
```

**Flow Diagram SVG Generator:**

```javascript
class FlowDiagramGenerator {
    constructor() {
        this.nodeWidth = 180;
        this.nodeHeight = 70;
        this.horizontalGap = 60;
        this.verticalGap = 40;
    }

    generate(scenario) {
        const steps = scenario.steps;
        const cols = Math.min(3, steps.length);
        const rows = Math.ceil(steps.length / cols);
        
        const width = cols * (this.nodeWidth + this.horizontalGap) + 100;
        const height = rows * (this.nodeHeight + this.verticalGap) + 100;
        
        let svg = `<svg viewBox="0 0 ${width} ${height}" class="flow-svg">`;
        svg += this.generateDefs();
        
        // Generate nodes
        steps.forEach((step, i) => {
            const pos = this.getNodePosition(i, cols);
            svg += this.generateNode(step, pos);
        });
        
        // Generate edges
        for (let i = 0; i < steps.length - 1; i++) {
            const fromPos = this.getNodePosition(i, cols);
            const toPos = this.getNodePosition(i + 1, cols);
            svg += this.generateEdge(fromPos, toPos, steps[i].dataFlow?.transformation);
        }
        
        svg += '</svg>';
        return svg;
    }

    getNodePosition(index, cols) {
        return {
            x: 50 + (index % cols) * (this.nodeWidth + this.horizontalGap),
            y: 50 + Math.floor(index / cols) * (this.nodeHeight + this.verticalGap)
        };
    }

    generateNode(step, pos) {
        return `
            <g class="flow-node" data-step-id="${step.id}" transform="translate(${pos.x}, ${pos.y})">
                <rect width="${this.nodeWidth}" height="${this.nodeHeight}" 
                      rx="8" fill="${step.color}" class="node-bg"/>
                <text x="${this.nodeWidth/2}" y="${this.nodeHeight/2 - 5}" 
                      text-anchor="middle" fill="white" font-size="12" font-weight="600">
                    ${step.title}
                </text>
                <text x="${this.nodeWidth/2}" y="${this.nodeHeight/2 + 12}" 
                      text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="10">
                    ${step.dataFlow?.transformation || ''}
                </text>
            </g>
        `;
    }

    generateEdge(from, to, label) {
        const x1 = from.x + this.nodeWidth;
        const y1 = from.y + this.nodeHeight / 2;
        const x2 = to.x;
        const y2 = to.y + this.nodeHeight / 2;
        
        return `
            <path d="M${x1},${y1} L${x2},${y2}" 
                  stroke="#667eea" stroke-width="2" fill="none" 
                  marker-end="url(#arrow)"/>
            ${label ? `<text x="${(x1+x2)/2}" y="${(y1+y2)/2 - 5}" 
                            text-anchor="middle" fill="#667eea" font-size="10">
                ${label}
            </text>` : ''}
        `;
    }

    generateDefs() {
        return `
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" 
                        refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#667eea"/>
                </marker>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.2"/>
                </filter>
            </defs>
        `;
    }
}
```

---

### Stage 7: Socratic Teaching Implementation

**Question Generation Templates:**

```markdown
## For Design Patterns

1. 为什么选择这种设计模式？
   → 分析问题背景和解决方案

2. 这种模式有什么潜在问题？
   → 讨论局限性和权衡

3. 有没有更简单的实现方式？
   → 对比不同复杂度的方案

## For Data Structures

1. 为什么使用这种数据结构？
   → 分析时间/空间复杂度

2. 如果数据量增大10倍会怎样？
   → 讨论扩展性问题

3. 这种结构适合并发访问吗？
   → 分析线程安全性

## For Algorithms

1. 这个算法的时间复杂度是多少？
   → 分析性能特征

2. 有没有更优的算法？
   → 对比其他算法

3. 边界情况如何处理？
   → 分析异常处理

## For API Design

1. 为什么参数这样设计？
   → 分析接口设计理念

2. 如何保证向后兼容？
   → 讨论版本控制

3. 错误如何传递给调用者？
   → 分析错误处理策略
```

**CSS for Socratic Questions:**

```css
.socratic-container {
    background: linear-gradient(135deg, #f8f9fa 0%, #e8f4f8 100%);
    border-radius: 12px;
    padding: 20px;
    margin: 15px 0;
    border: 1px solid #e1e4e8;
}

.socratic-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #d1d9e6;
}

.socratic-header i {
    font-size: 24px;
    color: #667eea;
}

.socratic-header h4 {
    margin: 0;
    color: #2c3e50;
    font-size: 18px;
    font-weight: 600;
}

.socratic-questions {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.socratic-question {
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-left: 4px solid #667eea;
    transition: transform 0.2s, box-shadow 0.2s;
}

.socratic-question:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.question-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.question-number {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
}

.question-text {
    font-weight: 600;
    color: #2c3e50;
    font-size: 15px;
}

.question-answer {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: 8px;
    padding-left: 38px;
    color: #5a6c7d;
    font-size: 14px;
    line-height: 1.6;
}

.question-answer i {
    color: #667eea;
    font-size: 12px;
    margin-top: 3px;
    flex-shrink: 0;
}

.question-hint {
    background: #fff3cd;
    border-radius: 6px;
    padding: 10px 15px;
    margin: 10px 0 0 38px;
    font-size: 13px;
    color: #856404;
}

.question-hint::before {
    content: '💡 提示: ';
    font-weight: 600;
}
```

---

### Stage 8-10: Complete Templates

**Full HTML Template:** (See Stage 8 in v2.0)

**Full CSS Template:** (See Stage 9 in v2.0)

**Full JavaScript Template:** (See Stage 10 in v2.0)

---

### Stage 11: Deployment

**GitHub Actions Workflow:**

```yaml
name: Deploy Tutorial

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './tutorial'
      - uses: actions/deploy-pages@v4
        id: deployment
```

**Important Files:**
- Create `.nojekyll` in tutorial directory
- Create redirect `index.html` in root if needed

---

## ✅ Quality Checklist

After generating the tutorial, verify:

### Content Quality
- [ ] All placeholders replaced with actual content
- [ ] Code snippets are from actual project files
- [ ] Socratic questions have depth (not just "what is X")
- [ ] Each section has clear learning objectives
- [ ] Related files are correctly linked

### Technical Quality
- [ ] All navigation items work
- [ ] All modals open and close correctly
- [ ] Progress tracking works
- [ ] Search functionality works
- [ ] SVG diagrams render correctly
- [ ] Code syntax highlighting works

### UI/UX Quality
- [ ] Text contrast is readable (WCAG AA)
- [ ] Mobile responsive design works
- [ ] Animations are smooth
- [ ] No layout overflow issues
- [ ] Consistent spacing and typography

### Deployment
- [ ] GitHub Pages deploys successfully
- [ ] All assets load correctly
- [ ] No console errors
- [ ] Performance is acceptable

---

## 📊 Success Metrics

A complete tutorial should have:
- 7+ navigation sections
- 15+ code explanations with Socratic questions
- 40+ documented methods
- 2+ demo scenarios with flow diagrams
- Complete method relationship graph
- Responsive design for all devices
- Working search and progress tracking

---

## 🔧 Troubleshooting

### Common Issues

**Issue: Progress bar exceeds 100%**
- Solution: Update `totalSections` in tutorial.js to match actual nav items

**Issue: SVG not rendering**
- Solution: Check viewBox dimensions and ensure valid SVG syntax

**Issue: Modal not opening**
- Solution: Verify codeData has correct key matching onclick parameter

**Issue: Code not highlighting**
- Solution: Ensure Prism.js is loaded and language class is correct

**Issue: Mobile layout broken**
- Solution: Check CSS media queries and viewport meta tag

---

## 📝 Example Output Structure

```
tutorial/
├── index.html (15KB)
├── css/
│   ├── style.css (8KB)
│   ├── demo.css (3KB)
│   └── socratic.css (2KB)
├── js/
│   ├── tutorial.js (5KB)
│   ├── code-data.js (20KB)
│   ├── methods-data.js (15KB)
│   ├── demo-data.js (10KB)
│   ├── demo-flow.js (4KB)
│   └── demo-controller.js (3KB)
└── assets/
    └── images/
        └── architecture.svg
```

---

## 🎯 Best Practices

1. **Start with Analysis** - Don't skip the codebase analysis phase
2. **Use Real Code** - Always copy actual code from files
3. **Think Like a Beginner** - Explain concepts step by step
4. **Show Relationships** - Connect related concepts and files
5. **Test Interactions** - Verify all interactive elements work
6. **Optimize Performance** - Keep file sizes reasonable
7. **Document Decisions** - Explain why, not just what

---

This skill transforms complex codebases into beginner-friendly tutorials by providing structured templates, intelligent analysis guides, and quality assurance checklists. Follow each stage carefully to create high-quality learning experiences! 🚀
