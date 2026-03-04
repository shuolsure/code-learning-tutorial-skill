# Stage 2: Core Features with Source Code

Explain core features with interactive source code viewers and Socratic teaching method.

## Feature Identification Process

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

## Socratic Question Templates

### For Design Patterns
```
1. 为什么选择这种设计模式？
   → 分析问题背景和解决方案

2. 这种模式有什么潜在问题？
   → 讨论局限性和权衡

3. 有没有更简单的实现方式？
   → 对比不同复杂度的方案
```

### For Data Structures
```
1. 为什么使用这种数据结构？
   → 分析时间/空间复杂度

2. 如果数据量增大10倍会怎样？
   → 讨论扩展性问题

3. 这种结构适合并发访问吗？
   → 分析线程安全性
```

### For Algorithms
```
1. 这个算法的时间复杂度是多少？
   → 分析性能特征

2. 有没有更优的算法？
   → 对比其他算法

3. 边界情况如何处理？
   → 分析异常处理
```

### For API Design
```
1. 为什么参数这样设计？
   → 分析接口设计理念

2. 如何保证向后兼容？
   → 讨论版本控制

3. 错误如何传递给调用者？
   → 分析错误处理策略
```

## code-data.js Template

```javascript
const codeData = {
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

## How to Extract Related Files

```bash
# Find imports in a file
grep "^from \|^import " path/to/file.py

# Find files that import this module
grep -r "from module_name import\|import module_name" --include="*.py"
```

## HTML Template

```html
<section id="features" class="section">
    <div class="content-card">
        <h1><i class="fas fa-cogs"></i> 核心功能</h1>
        
        <div class="features-grid">
            <div class="feature-card" data-feature="agent-loop">
                <div class="feature-header">
                    <div class="feature-icon">🤖</div>
                    <h3>Agent 循环</h3>
                </div>
                <p class="feature-desc">核心处理引擎，协调各组件完成用户请求</p>
                <div class="feature-points">
                    <div class="point">
                        <i class="fas fa-check-circle"></i>
                        <span>异步消息处理</span>
                    </div>
                    <div class="point">
                        <i class="fas fa-check-circle"></i>
                        <span>工具调用循环</span>
                    </div>
                </div>
                <button class="view-source-btn" onclick="showSourceCode('agent-loop')">
                    <i class="fas fa-code"></i> 查看源码解析
                </button>
            </div>
            <!-- More feature cards -->
        </div>
    </div>
</section>
```

## Workflow

1. **Identify core modules** - LS top-level folders
2. **Find key classes/functions** - Grep in each module
3. **Read implementations** - Get actual code
4. **Generate Socratic questions** - Based on patterns
5. **Find related files** - Via imports
6. **Create code-data.js** - Fill template
