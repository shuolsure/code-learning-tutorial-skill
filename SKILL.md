---
name: "code-learning-tutorial"
description: "Creates interactive web tutorials for code learning beginners. Invoke when user wants to create a beginner-friendly tutorial for a codebase or project."
---

# Code Learning Tutorial Creator

This skill helps you create comprehensive, interactive web tutorials for programming beginners to learn codebases from scratch.

## When to Invoke

Invoke this skill when:
- User wants to create a learning tutorial for a codebase
- User mentions "code learning", "beginner tutorial", "interactive tutorial"
- User wants to help beginners understand a project
- User asks for a structured way to teach code to newcomers

## Tutorial Creation Workflow (11 Stages)

Based on proven methodology, follow these 11 stages to create a complete interactive tutorial:

### Stage 1: Project Understanding & Overview

**Goal**: Help beginners understand what the project does and why it exists.

**Actions**:
1. Analyze project structure and core functionality
2. Identify the project's value proposition
3. Explain design philosophy and architecture decisions
4. Create a high-level overview section

**Content to Create**:
- Project description (what it does)
- Key features and benefits
- Target use cases
- Design philosophy explanation

**Example**:
```markdown
## 项目概述

Nanobot 是一个异步多通道 AI 机器人框架，具有以下特点：
- 异步架构：基于 asyncio 的高性能处理
- 多通道支持：统一管理不同平台的消息
- 智能对话：支持上下文感知的多轮对话
```

---

### Stage 2: Code Annotation & Line-by-Line Explanation

**Goal**: Make every line of code understandable to complete beginners.

**Actions**:
1. Add detailed comments to all core files
2. Explain what each line does in simple terms
3. Avoid technical jargon or explain it when necessary
4. Focus on "why" not just "what"

**Comment Style**:
```python
# 导入异步 IO 库，用于处理并发任务
# asyncio 让我们可以同时处理多个消息，提高效率
import asyncio

# 定义一个消息类，用来存储用户发送的消息信息
# 使用 dataclass 可以自动生成初始化方法，减少代码量
@dataclass
class InboundMessage:
    """入站消息：用户发送给机器人的消息"""
    
    # 消息内容：用户实际说的话
    content: str
    
    # 通道标识：消息来自哪个平台（如 CLI、Web、Discord）
    channel: str
    
    # 会话 ID：用来区分不同的对话
    chat_id: str
```

---

### Stage 3: Design Details & Architecture Deep Dive

**Goal**: Help beginners understand the "why" behind design decisions.

**Actions**:
1. Explain architectural choices
2. Describe component responsibilities
3. Show how components work together
4. Provide design rationale

**Content Structure**:
```markdown
## 设计理念

### 为什么选择异步架构？
- **性能考虑**：AI 响应可能需要几秒钟，异步可以同时处理多个请求
- **用户体验**：不会阻塞其他用户的操作
- **资源利用**：充分利用等待时间，提高系统吞吐量

### 为什么使用消息总线？
- **解耦**：消息发送者和接收者不需要直接知道对方
- **扩展性**：可以轻松添加新的消息处理器
- **可靠性**：消息队列保证消息不会丢失
```

---

### Stage 4: Create Interactive Web Tutorial Structure

**Goal**: Build a beginner-friendly interactive learning platform.

**Actions**:
1. Create main HTML structure with navigation
2. Implement search functionality
3. Add progress tracking
4. Design responsive layout

**File Structure**:
```
tutorial-project/
├── index.html          # Main tutorial page
├── css/
│   └── style.css       # Styles
├── js/
│   ├── tutorial.js     # Core interactivity
│   ├── code-data.js    # Code explanations
│   └── search.js       # Search functionality
└── assets/
    └── images/         # Diagrams and screenshots
```

**Key Features**:
- Sidebar navigation
- Search bar
- Progress indicator
- Mobile responsive
- Dark/light mode (optional)

---

### Stage 5: Add Source Code Viewers

**Goal**: Allow beginners to see actual code when learning concepts.

**Actions**:
1. Add "View Source Code" buttons to all concepts
2. Create modal dialogs for code display
3. Implement syntax highlighting
4. Show file path and line numbers

**Implementation**:
```javascript
// Create modal for code display
function showCodeModal(filePath, code, explanation) {
  const modal = document.createElement('div');
  modal.className = 'code-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${filePath}</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <pre><code>${highlightCode(code)}</code></pre>
        <div class="explanation">${explanation}</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
```

---

### Stage 6: Interactive Folder Structure

**Goal**: Make file organization clear and explorable.

**Actions**:
1. Create visual folder tree
2. Add click-to-view functionality for each file
3. Explain each file's purpose
4. Show file relationships

**Example Structure**:
```markdown
## 📁 项目结构

nanobot/
├── 📂 agent/              # AI Agent 核心
│   ├── 📄 loop.py        # [点击查看] Agent 处理循环
│   └── 📄 config.py      # [点击查看] Agent 配置
├── 📂 bus/               # 消息总线
│   ├── 📄 queue.py       # [点击查看] 异步队列管理
│   └── 📄 events.py      # [点击查看] 事件定义
```

**Interactive Features**:
- Click folder to expand/collapse
- Click file to view code
- Hover to see brief description
- Show file size and last modified

---

### Stage 7: Socratic Teaching Method

**Goal**: Use questions to guide learning and critical thinking.

**Actions**:
1. Replace direct explanations with thought-provoking questions
2. Guide learners to discover answers themselves
3. Provide hints and learning tips
4. Encourage exploration

**Question Style**:
```markdown
## 🤔 思考：为什么需要会话管理？

### 问题 1：如果机器人不记住之前的对话，会发生什么？
<details>
<summary>💡 点击查看提示</summary>

想象一下：
- 用户："我叫小明"
- 机器人："你好小明！"
- 用户："我叫什么名字？"
- 机器人："抱歉，我不知道..."

这样体验好吗？显然不好！所以我们需要会话管理来记住对话历史。
</details>

### 问题 2：会话管理应该存储哪些信息？
<details>
<summary>💡 点击查看答案</summary>

需要存储：
1. **对话历史**：所有消息记录
2. **用户信息**：用户 ID、名称等
3. **上下文数据**：当前对话状态
4. **时间戳**：消息发送时间
</details>
```

---

### Stage 8: Method Introduction & Relationships

**Goal**: Help beginners understand all methods and how they relate.

**Actions**:
1. List all methods with descriptions
2. Create method hierarchy (pyramid structure)
3. Build knowledge graph showing relationships
4. Explain method purposes and use cases

**Pyramid Structure**:
```
        ┌─────────────┐
        │  系统入口   │  ← 顶层：用户直接调用
        │  run()      │
        └─────────────┘
             ↓
    ┌───────────────────┐
    │   核心处理循环     │  ← 中层：核心业务逻辑
    │  process_loop()   │
    └───────────────────┘
         ↓         ↓
    ┌────────┐  ┌────────┐
    │工具调用│  │LLM生成 │  ← 底层：基础功能
    └────────┘  └────────┘
```

**Knowledge Graph**:
```javascript
const methodGraph = {
  nodes: [
    { id: 'run', label: 'run()', level: 1 },
    { id: 'process', label: 'process_loop()', level: 2 },
    { id: 'tool', label: 'call_tool()', level: 3 },
    { id: 'llm', label: 'generate()', level: 3 }
  ],
  edges: [
    { from: 'run', to: 'process', label: '调用' },
    { from: 'process', to: 'tool', label: '需要时调用' },
    { from: 'process', to: 'llm', label: '调用' }
  ]
};
```

---

### Stage 9: Run Demo & Execution Flow

**Goal**: Show how code actually runs in real scenarios.

**Actions**:
1. Identify core use case scenarios
2. Create step-by-step execution flow diagrams
3. Show code snippets at each step
4. Visualize data flow between components

**Scenario Structure**:
```javascript
const scenario = {
  id: 'message-processing',
  title: '📨 消息处理流程',
  steps: [
    {
      id: 1,
      title: '步骤 1: 用户发送消息',
      description: '用户通过 CLI 或其他通道发送消息',
      code: {
        file: 'bus/queue.py',
        snippet: 'await message_bus.publish_inbound(...)',
        explanation: '消息被发布到入站队列'
      },
      dataFlow: {
        input: { type: 'User Input', content: '你好' },
        output: { type: 'InboundMessage', content: '你好' },
        transformation: '用户输入 → 消息对象'
      }
    },
    // ... more steps
  ]
};
```

**Flow Diagram**:
```javascript
function renderFlowDiagram(steps) {
  // Create SVG flow diagram
  // Show nodes for each step
  // Draw arrows showing data flow
  // Add click interaction to show details
}
```

---

### Stage 10: UI/UX Optimization

**Goal**: Ensure the tutorial is visually appealing and easy to use.

**Actions**:
1. Ensure good contrast (text vs background)
2. Fix interactive element issues
3. Optimize for mobile devices
4. Add loading states and feedback

**Common UI Issues to Fix**:
- ❌ White text on white background
- ❌ Purple text on purple background
- ❌ Icons shaking on hover
- ❌ Missing connection lines in diagrams
- ❌ Poor mobile responsiveness

**Solutions**:
```css
/* Fix contrast issues */
.code-block {
  background: #1e1e1e;
  color: #abb2bf;  /* Light gray text on dark background */
}

/* Smooth hover effects */
.node:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* Clear connection lines */
.flow-line {
  stroke: #667eea;
  stroke-width: 2;
  stroke-dasharray: 5, 5;
}
```

---

### Stage 11: Deployment & Publishing

**Goal**: Make the tutorial accessible online.

**Actions**:
1. Create project documentation (README, LICENSE)
2. Set up Git repository
3. Configure GitHub Pages deployment
4. Add CI/CD for automatic deployment

**Documentation Checklist**:
- ✅ README.md with project overview
- ✅ Installation instructions
- ✅ Usage examples
- ✅ Contributing guidelines
- ✅ LICENSE file
- ✅ .gitignore

**GitHub Actions Workflow**:
```yaml
name: Deploy Tutorial to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './tutorial'
      - uses: actions/deploy-pages@v4
```

**Important Files**:
- `.nojekyll` - Disable Jekyll rendering for static HTML
- `index.html` - Entry point with auto-redirect if needed

---

## Best Practices

### For Beginners
1. **Start Simple**: Begin with project overview, don't overwhelm with details
2. **Use Analogies**: Compare code concepts to real-world examples
3. **Visual Learning**: Use diagrams, flowcharts, and visualizations
4. **Interactive**: Let learners click, explore, and discover
5. **Progressive Disclosure**: Show basics first, details on demand

### For Code Explanation
1. **Line-by-Line**: Explain every line, even imports
2. **Why Not Just What**: Explain reasoning behind decisions
3. **Show Examples**: Provide concrete usage examples
4. **Highlight Patterns**: Point out common patterns and best practices

### For Interactive Features
1. **Clear Navigation**: Always know where you are
2. **Search Functionality**: Make finding content easy
3. **Progress Tracking**: Show learning progress
4. **Mobile Friendly**: Work on all devices

### For Socratic Teaching
1. **Ask Before Telling**: Use questions to guide thinking
2. **Provide Hints**: Give clues before showing answers
3. **Encourage Exploration**: Link to related concepts
4. **Real Scenarios**: Use practical examples

---

## File Templates

### Basic Tutorial Structure
```
tutorial/
├── index.html              # Main page
├── css/
│   ├── style.css          # Main styles
│   ├── components.css     # Component styles
│   └── responsive.css     # Mobile styles
├── js/
│   ├── tutorial.js        # Core functionality
│   ├── code-data.js       # Code explanations
│   ├── methods-data.js    # Method documentation
│   ├── demo-data.js       # Demo scenarios
│   ├── demo-flow.js       # Flow diagram renderer
│   └── demo-controller.js # Demo interactions
└── assets/
    ├── images/            # Diagrams
    └── icons/             # Icons
```

### Essential HTML Structure
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>项目教程</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Sidebar Navigation -->
  <nav class="sidebar">
    <div class="search-box">
      <input type="text" placeholder="搜索...">
    </div>
    <ul class="nav-menu">
      <li><a href="#overview">项目概述</a></li>
      <li><a href="#features">核心功能</a></li>
      <li><a href="#architecture">系统架构</a></li>
      <li><a href="#structure">文件夹结构</a></li>
      <li><a href="#methods">方法介绍</a></li>
      <li><a href="#demo">运行演示</a></li>
    </ul>
  </nav>

  <!-- Main Content -->
  <main class="content">
    <section id="overview">
      <h1>项目概述</h1>
      <!-- Content -->
    </section>
    <!-- More sections -->
  </main>

  <!-- Code Modal -->
  <div id="code-modal" class="modal">
    <!-- Modal content -->
  </div>

  <script src="js/tutorial.js"></script>
</body>
</html>
```

---

## Success Metrics

A successful tutorial should:
- ✅ Be understandable by complete beginners
- ✅ Explain all core concepts with code examples
- ✅ Use Socratic method to encourage thinking
- ✅ Provide interactive exploration
- ✅ Show real execution scenarios
- ✅ Be accessible online
- ✅ Work on mobile devices
- ✅ Have clear navigation and search

---

## Common Pitfalls to Avoid

1. **Too Technical Too Soon**: Start with basics, add complexity gradually
2. **No Code Examples**: Always show actual code when explaining concepts
3. **Passive Learning**: Make it interactive, not just reading
4. **Poor UI/UX**: Test on different devices and screen sizes
5. **Missing Deployment**: Make sure it's accessible online
6. **No Progress Tracking**: Let learners know how far they've come
7. **Broken Links**: Verify all code links and references work

---

## Tools & Libraries Recommendations

### For Syntax Highlighting
- Prism.js - Lightweight and extensible
- Highlight.js - Auto language detection

### For Diagrams
- Mermaid.js - Flowcharts and sequence diagrams
- D3.js - Custom interactive visualizations
- SVG - For simple diagrams

### For Search
- Lunr.js - Client-side search
- Fuse.js - Fuzzy search

### For Deployment
- GitHub Pages - Free hosting
- Vercel - Automatic deployments
- Netlify - Continuous deployment

---

## Example Projects

Successful tutorials created with this methodology:
- **Nanobot Tutorial**: https://shuolsure.github.io/nanobot-weblearn/
  - 4 core feature modules
  - Method pyramid and knowledge graph
  - 4 interactive demo scenarios
  - Complete code explanations with Socratic method

---

## Quick Start Checklist

When creating a new tutorial:

- [ ] Stage 1: Analyze project and create overview
- [ ] Stage 2: Add detailed code comments
- [ ] Stage 3: Explain design philosophy
- [ ] Stage 4: Create HTML structure with navigation
- [ ] Stage 5: Add source code viewers
- [ ] Stage 6: Create interactive folder structure
- [ ] Stage 7: Implement Socratic teaching method
- [ ] Stage 8: Add method introduction with relationships
- [ ] Stage 9: Create run demo scenarios
- [ ] Stage 10: Optimize UI/UX
- [ ] Stage 11: Deploy to GitHub Pages

---

## Final Notes

Creating a beginner-friendly tutorial is about **empathy** - understanding what it's like to not know something. Always:

1. **Start from zero** - Assume no prior knowledge
2. **Explain the obvious** - What's obvious to you isn't to beginners
3. **Use simple language** - Avoid jargon or explain it
4. **Show, don't just tell** - Use examples and visuals
5. **Make it interactive** - Let learners explore
6. **Test with beginners** - Get feedback from actual beginners

The goal is to transform complex code into an enjoyable learning journey! 🚀
