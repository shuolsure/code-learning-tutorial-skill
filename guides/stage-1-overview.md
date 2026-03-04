# Stage 1: Project Overview

Create a comprehensive project overview section that introduces beginners to the codebase.

## Data Collection

```bash
# Count Python files
find . -name "*.py" -not -path "./tests/*" -not -path "./.venv/*" | wc -l

# Count classes
grep -r "^class " --include="*.py" | wc -l

# Count functions  
grep -r "^def \|^async def " --include="*.py" | wc -l

# Find entry point
grep -r "if __name__" --include="*.py" -l
```

## Placeholder Filling Guide

| Placeholder | How to Fill | Tool |
|-------------|-------------|------|
| `PROJECT_NAME` | README.md title or folder name | Read README.md |
| `PROJECT_TAGLINE` | README.md description | Read README.md |
| `CORE_POSITIONING` | What problem does it solve? | Analyze main.py |
| `KEY_FEATURES` | List 3-5 main capabilities | Grep for main functions |
| `TARGET_USERS` | Who benefits from this? | Infer from complexity |
| `LEARNING_VALUE` | What will beginners learn? | Analyze architecture |
| `FILES_COUNT` | Count source files | Glob + wc -l |
| `MODULES_COUNT` | Count top-level folders | LS |
| `METHODS_COUNT` | Count functions/methods | Grep + wc -l |

## HTML Template

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

## Workflow

1. **Read README.md** - Get project name and description
2. **Analyze main.py** - Understand core functionality
3. **Count statistics** - Files, classes, functions
4. **Fill template** - Replace all placeholders
5. **Verify completeness** - Check all sections filled
