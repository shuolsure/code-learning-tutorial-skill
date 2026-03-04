# Stage 5: Method Introduction with Knowledge Graph

Document all methods and show their relationships with a knowledge graph.

## 🔧 Tool Commands (Copy-Paste Ready)

### 5.1 Extract All Functions

```
Tool: Grep
Pattern: ^def |^async def |^class 
Path: project_root
Output: content, -n: true
Goal: Get all functions/classes with line numbers
Output: "loop.py:45:async def process_message(msg: InboundMessage)"
```

### 5.2 Extract Function Signatures

```
Tool: Read
File: each source file
Limit: 200 lines
Goal: Extract function signatures, parameters, return types, docstrings

Parse Rules:
- def name(params) -> ReturnType:
- async def name(params) -> ReturnType:
- Extract first line of docstring as description
```

### 5.3 Build Call Graph (Automated)

```
Step 1: Find method calls within same file
Tool: Grep
Pattern: self\.\w+\(|await self\.\w+\(|\.(\w+)\(
Output: content, -n: true

Step 2: Find cross-file calls
Tool: Grep
Pattern: from (\w+) import|import (\w+)
Output: content

Step 3: Build relationship matrix
For each method M:
  - Find all calls to other methods
  - Record: {from: M, to: called_method, type: 'calls'}
```

### 5.4 Categorize Methods Automatically

```
Rules:
- Entry points: main, run, start, __main__
- Core logic: process, handle, execute, compute, transform
- Helpers: format, validate, parse, convert, get_, set_
- Handlers: on_message, on_connect, on_event, callback
- Managers: create, destroy, init, cleanup, register
```

---

## 📋 Automatic Relationship Detection

### Call Pattern Detection

```python
# Patterns to detect:
PATTERNS = {
    'direct_call': r'(\w+)\(',                    # method()
    'self_call': r'self\.(\w+)\(',                # self.method()
    'await_call': r'await (\w+)\(',               # await method()
    'await_self': r'await self\.(\w+)\(',         # await self.method()
    'obj_call': r'(\w+)\.(\w+)\(',                # obj.method()
    'class_instantiation': r'(\w+)\(',            # ClassName()
}

# For each pattern, extract:
# - caller: the function containing the call
# - callee: the function being called
# - type: calls, instantiates, delegates
```

### Data Flow Detection

```
Tool: Grep
Pattern: return (\w+)|= (\w+)\(|await (\w+)
Goal: Identify data flow between methods

Rules:
- If method A returns value used by method B → data_flow
- If method A passes parameter to method B → data_flow
- If method A calls method B → calls
```

---

## 📝 methods-data.js Generation Template

```javascript
const methodsData = {
    methods: [
        {
            id: '{{METHOD_ID}}',
            name: '{{METHOD_NAME}}()',
            file: '{{FILE_PATH}}',
            line: {{LINE_NUMBER}},
            signature: '{{FULL_SIGNATURE}}',
            description: '{{DOCSTRING_FIRST_LINE}}',
            category: '{{CATEGORY}}',  // core/helper/handler/manager
            level: {{LEVEL}},          // 1/2/3
            parameters: [
                { name: '{{PARAM_NAME}}', type: '{{PARAM_TYPE}}', desc: '{{PARAM_DESC}}' }
            ],
            returns: { type: '{{RETURN_TYPE}}', desc: '{{RETURN_DESC}}' },
            socratic: generateSocraticQuestions(method)
        }
    ],
    relationships: [
        { from: '{{CALLER}}', to: '{{CALLEE}}', type: 'calls', label: '调用' },
        { from: '{{SOURCE}}', to: '{{TARGET}}', type: 'data_flow', label: '数据流', style: 'dashed' }
    ]
};
```

---

## 🎨 Three-Level Depth Socratic Questions

### Level 1: What (理解层)
```
Q: 这个方法做什么？
Hint: 看方法名和参数...
Answer: {{DESCRIPTION_FROM_DOCSTRING}}

Q: 输入是什么？输出是什么？
Hint: 检查参数和返回值...
Answer: 输入: {{PARAMS}}, 输出: {{RETURN}}
```

### Level 2: Why (分析层)
```
Q: 为什么需要这个方法？
Hint: 考虑它解决的问题...
Answer: {{PROBLEM_IT_SOLVES}}

Q: 为什么这样实现？
Hint: 分析设计决策...
Answer: {{DESIGN_RATIONALE}}

Q: 有什么替代方案？
Hint: 考虑其他实现方式...
Answer: {{ALTERNATIVES}}
```

### Level 3: How (扩展层)
```
Q: 如何优化这个方法？
Hint: 考虑性能、可读性、可维护性...
Answer: {{OPTIMIZATION_SUGGESTIONS}}

Q: 如何扩展功能？
Hint: 考虑新需求场景...
Answer: {{EXTENSION_APPROACH}}

Q: 有什么边界情况？
Hint: 考虑异常输入、极端情况...
Answer: {{EDGE_CASES}}
```

---

## 📊 Knowledge Graph Visualization

### D3.js Implementation

```javascript
function renderKnowledgeGraph(data) {
    const width = 800;
    const height = 500;
    
    const svg = d3.select('#knowledgeGraph')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Color by category
    const colors = {
        core: '#667eea',
        helper: '#48bb78',
        handler: '#ed8936',
        manager: '#9f7aea'
    };
    
    // Create nodes
    const nodes = svg.selectAll('.node')
        .data(data.methods)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);
    
    nodes.append('rect')
        .attr('width', 120)
        .attr('height', 40)
        .attr('rx', 6)
        .attr('fill', d => colors[d.category]);
    
    nodes.append('text')
        .attr('x', 60)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(d => d.name);
    
    // Create edges
    const edges = svg.selectAll('.edge')
        .data(data.relationships)
        .enter()
        .append('line')
        .attr('class', d => `edge ${d.type}`)
        .attr('stroke', '#667eea')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', d => d.style === 'dashed' ? '5,5' : 'none');
}
```

---

## 📝 HTML Template

```html
<section id="methods" class="section">
    <div class="content-card">
        <h1><i class="fas fa-code"></i> 方法介绍</h1>
        
        <div class="methods-stats">
            <div class="stat">
                <span class="stat-number">{{TOTAL_METHODS}}</span>
                <span class="stat-label">总方法数</span>
            </div>
            <div class="stat">
                <span class="stat-number">{{CORE_METHODS}}</span>
                <span class="stat-label">核心方法</span>
            </div>
        </div>
        
        <div class="methods-pyramid">
            <div class="pyramid-level level-1">
                <h3>🎯 入口方法</h3>
                <div class="method-cards">
                    {{ENTRY_METHODS_HTML}}
                </div>
            </div>
            <div class="pyramid-level level-2">
                <h3>⚙️ 核心逻辑</h3>
                <div class="method-cards">
                    {{CORE_METHODS_HTML}}
                </div>
            </div>
            <div class="pyramid-level level-3">
                <h3>🔧 辅助工具</h3>
                <div class="method-cards">
                    {{HELPER_METHODS_HTML}}
                </div>
            </div>
        </div>
        
        <div class="knowledge-graph-section">
            <h2><i class="fas fa-project-diagram"></i> 方法关系图</h2>
            <div id="knowledgeGraph" class="knowledge-graph"></div>
        </div>
    </div>
</section>
```

---

## ✅ Verification Checklist

After generation, verify:
- [ ] All methods have unique IDs
- [ ] Categories are correctly assigned
- [ ] Relationships are valid (methods exist)
- [ ] Socratic questions have 3 levels
- [ ] Knowledge graph renders correctly
- [ ] Method cards are clickable
- [ ] Search works for methods
