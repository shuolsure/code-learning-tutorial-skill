# Stage 1: Project Overview

Create a comprehensive project overview section that introduces beginners to the codebase.

## 🔧 Tool Commands (Copy-Paste Ready)

### 1.1 Get Project Name & Description

```
Tool: Read
File: README.md
Limit: 20 lines
Goal: Extract project name (line 1) and description (lines 2-5)
```

### 1.2 Count Statistics

```
Tool: Glob
Pattern: **/*.py
Path: project_root
Goal: Count Python files (exclude tests, venv)

Tool: Grep  
Pattern: ^class 
Path: project_root
Output: count
Goal: Count classes

Tool: Grep
Pattern: ^def |^async def 
Path: project_root
Output: count
Goal: Count functions
```

### 1.3 Find Entry Point

```
Tool: Grep
Pattern: if __name__|def main|async def run
Path: project_root
Output: files_with_matches
Goal: Find main entry point
```

### 1.4 Analyze Core Positioning

```
Tool: Read
File: main.py OR __main__.py OR README.md
Limit: 50 lines
Goal: Understand what problem the project solves
```

---

## 📋 Placeholder Filling Table

| Placeholder | Tool | Command | Example Output |
|-------------|------|---------|----------------|
| `{{PROJECT_NAME}}` | Read | README.md line 1 | "Nanobot" |
| `{{PROJECT_TAGLINE}}` | Read | README.md lines 2-5 | "A lightweight AI agent framework" |
| `{{PROJECT_ICON}}` | Infer | Based on project type | 🤖 (AI), 🌐 (Web), 📊 (Data), 📱 (Mobile) |
| `{{CORE_POSITIONING}}` | Read | main.py + README | "Simplifies building AI agents with tool calling" |
| `{{KEY_FEATURES}}` | Grep | Find main functions | "Async message processing, Tool registry, Multi-provider support" |
| `{{TARGET_USERS}}` | Infer | From complexity | "Python developers interested in AI agents" |
| `{{LEARNING_VALUE}}` | Analyze | Architecture | "Async patterns, Message queues, Tool abstraction" |
| `{{FILES_COUNT}}` | Glob | `**/*.py` count | "42" |
| `{{MODULES_COUNT}}` | LS | Top-level folders | "5" |
| `{{METHODS_COUNT}}` | Grep | `^def ` count | "87" |

---

## 🎨 Icon Selection Guide

| Project Type | Icon | Keywords |
|--------------|------|----------|
| AI/ML/LLM | 🤖 | agent, ai, llm, ml, neural |
| Web/API | 🌐 | web, api, http, rest, flask |
| Data/Analytics | 📊 | data, analytics, etl, pipeline |
| CLI/Tools | 🔧 | cli, tool, utility, command |
| Mobile/App | 📱 | mobile, app, ios, android |
| Game | 🎮 | game, engine, graphics |
| DevOps/Infra | 🚀 | deploy, k8s, docker, infra |

---

## 📝 HTML Template

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

## ✅ Verification

After filling, verify:
- [ ] All placeholders replaced (no `{{}}` remaining)
- [ ] Statistics are accurate (manually count a few)
- [ ] Icon matches project type
- [ ] Core positioning is clear and concise
