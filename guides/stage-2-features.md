# Stage 2: Core Features with Source Code

Explain core features with interactive source code viewers and Socratic teaching method.

## 🔧 Tool Commands (Copy-Paste Ready)

### 2.1 Identify Core Modules

```
Tool: LS
Path: project_root
Goal: List top-level folders
Output: ["agent/", "bus/", "session/", "providers/"]

Filter: Exclude tests/, docs/, config/, .venv/
```

### 2.2 Find Main Classes per Module

```
Tool: Grep
Pattern: ^class \w+
Path: each module folder
Output: content, -n: true
Output: "loop.py:15:class AgentLoop"
```

### 2.3 Read Class Implementation

```
Tool: Read
File: each class file
Limit: 100 lines
Goal: Extract class docstring, key methods, design patterns
```

### 2.4 Find Related Files

```
Tool: Grep
Pattern: ^from {module}|^import {module}
Path: project_root
Output: files_with_matches
Goal: Find files that import this module
```

---

## 📋 Feature Card Generation

### Step-by-Step Process

```
1. For each module folder:
   a. Grep "^class " to find main classes
   b. Read each class file (limit 100 lines)
   c. Extract docstring as description
   d. Find 2-3 key methods
   e. Find related files via imports

2. Generate feature card HTML:
   - Icon: Choose based on module type
   - Title: Class name
   - Description: First line of docstring
   - Points: Key method names
   - onclick: showSourceCode('{module_id}')
```

### Icon Selection for Modules

| Module Type | Icon | Examples |
|-------------|------|----------|
| Agent/Core | 🤖 | agent, core, engine |
| Communication | 📡 | bus, channel, queue |
| Data/Storage | 💾 | session, memory, cache |
| External API | 🔌 | provider, api, client |
| Utilities | 🔧 | utils, helpers, tools |
| Configuration | ⚙️ | config, settings |

---

## 🎨 Socratic Question Generation

### For Classes

```
Template:
1. 为什么需要这个类？
   → Analyze: What problem does it solve?
   
2. 这个类与其他类如何协作？
   → Analyze: Check imports and method calls
   
3. 如何扩展这个类？
   → Analyze: Check inheritance and composition
```

### For Methods

```
Template:
1. 这个方法做什么？
   → Extract from docstring or code logic
   
2. 参数的含义是什么？
   → Analyze parameter types and usage
   
3. 返回值代表什么？
   → Analyze return type and usage
   
4. 有什么边界情况？
   → Analyze error handling and edge cases
```

### For Design Patterns

```
Template:
1. 为什么选择这种设计模式？
   → Analyze problem context and solution
   
2. 这种模式有什么潜在问题？
   → Discuss limitations and trade-offs
   
3. 有没有更简单的实现方式？
   → Compare different complexity approaches
```

---

## 📝 code-data.js Template

```javascript
const codeData = {
    '{{MODULE_ID}}': {
        title: '{{CLASS_NAME}}',
        file: '{{FILE_PATH}}',
        description: '{{FIRST_LINE_DOCSTRING}}',
        sections: [
            {
                name: '核心实现',
                code: `{{ACTUAL_CODE_FROM_READ_TOOL}}`,
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
        tips: [
            '{{TIP_FROM_DOCSTRING_OR_CODE}}',
            '{{BEST_PRACTICE}}'
        ]
    }
};
```

---

## 📝 HTML Template for Features Section

```html
<section id="features" class="section">
    <div class="content-card">
        <h1><i class="fas fa-cogs"></i> 核心功能</h1>
        
        <div class="features-grid">
            <!-- For each module, generate: -->
            <div class="feature-card" data-feature="{{MODULE_ID}}">
                <div class="feature-header">
                    <div class="feature-icon">{{ICON}}</div>
                    <h3>{{CLASS_NAME}}</h3>
                </div>
                <p class="feature-desc">{{DESCRIPTION}}</p>
                <div class="feature-points">
                    <div class="point">
                        <i class="fas fa-check-circle"></i>
                        <span>{{KEY_METHOD_1}}</span>
                    </div>
                    <div class="point">
                        <i class="fas fa-check-circle"></i>
                        <span>{{KEY_METHOD_2}}</span>
                    </div>
                </div>
                <button class="view-source-btn" onclick="showSourceCode('{{MODULE_ID}}')">
                    <i class="fas fa-code"></i> 查看源码解析
                </button>
            </div>
        </div>
    </div>
</section>
```

---

## ✅ Verification

After generation, verify:
- [ ] Each feature card has unique `data-feature` ID
- [ ] `onclick` matches `codeData` key
- [ ] Related files exist (check paths)
- [ ] Socratic questions have depth (not just "what is X")
- [ ] Code snippets are from actual files (not invented)
