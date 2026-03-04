# Stage 7: Socratic Teaching Method

Implement Q&A teaching methodology to encourage critical thinking.

## Socratic Teaching Principles

1. **Ask Before Telling** - Guide learners to discover answers
2. **Provide Hints** - Give clues before revealing answers
3. **Link Concepts** - Connect related ideas
4. **Use Examples** - Concrete scenarios over abstract explanations
5. **Encourage Exploration** - "What if?" questions

## Question Categories

### Design Questions
```javascript
{
    type: 'design',
    template: {
        q: "为什么选择这种设计？",
        hint: "考虑问题背景和解决方案...",
        answer: "{{DESIGN_RATIONALE}}",
        followUp: [
            {
                q: "有什么潜在问题？",
                hint: "考虑边界情况...",
                answer: "{{LIMITATIONS}}"
            }
        ]
    }
}
```

### Implementation Questions
```javascript
{
    type: 'implementation',
    template: {
        q: "这个方法是如何工作的？",
        hint: "追踪数据流...",
        answer: "{{IMPLEMENTATION_DETAILS}}",
        followUp: [
            {
                q: "如何优化性能？",
                hint: "考虑时间/空间复杂度...",
                answer: "{{OPTIMIZATION}}"
            }
        ]
    }
}
```

### Trade-off Questions
```javascript
{
    type: 'tradeoff',
    template: {
        q: "这种方案有什么权衡？",
        hint: "考虑优点和缺点...",
        answer: "{{TRADEOFFS}}",
        followUp: [
            {
                q: "在什么情况下会选择替代方案？",
                hint: "考虑不同场景...",
                answer: "{{ALTERNATIVE_SCENARIOS}}"
            }
        ]
    }
}
```

### Extension Questions
```javascript
{
    type: 'extension',
    template: {
        q: "如果要添加新功能，如何扩展？",
        hint: "考虑现有架构...",
        answer: "{{EXTENSION_APPROACH}}",
        followUp: [
            {
                q: "需要修改哪些现有代码？",
                hint: "考虑影响范围...",
                answer: "{{MODIFICATIONS_NEEDED}}"
            }
        ]
    }
}
```

## Socratic Component HTML

```html
<div class="socratic-question">
    <div class="question-header">
        <i class="fas fa-question-circle"></i>
        <span class="question-type">设计思考</span>
    </div>
    
    <div class="question-body">
        <h4 class="question-text">为什么使用异步编程模式？</h4>
        
        <div class="hint-section">
            <button class="hint-btn" onclick="toggleHint(this)">
                <i class="fas fa-lightbulb"></i> 提示
            </button>
            <div class="hint-content" style="display: none;">
                <p>考虑一下：如果同时有多个用户发送消息会怎样？</p>
            </div>
        </div>
        
        <div class="answer-section">
            <button class="answer-btn" onclick="toggleAnswer(this)">
                <i class="fas fa-eye"></i> 查看答案
            </button>
            <div class="answer-content" style="display: none;">
                <p>异步编程允许在等待 I/O 操作（如 API 调用）时处理其他任务，提高并发性能。</p>
            </div>
        </div>
        
        <div class="follow-up-section">
            <h5><i class="fas fa-arrow-right"></i> 延伸思考</h5>
            <div class="follow-up-question">
                <p>如果 LLM API 响应很慢怎么办？</p>
                <button class="mini-hint-btn" onclick="toggleMiniHint(this)">提示</button>
                <div class="mini-hint" style="display: none;">
                    考虑超时处理...
                </div>
            </div>
        </div>
    </div>
</div>
```

## Socratic CSS Styles

```css
.socratic-question {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    color: white;
}

.question-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.question-type {
    background: rgba(255,255,255,0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
}

.question-text {
    font-size: 18px;
    margin-bottom: 15px;
}

.hint-section, .answer-section {
    margin: 10px 0;
}

.hint-btn, .answer-btn {
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
}

.hint-btn:hover, .answer-btn:hover {
    background: rgba(255,255,255,0.3);
}

.hint-content, .answer-content {
    margin-top: 10px;
    padding: 15px;
    background: rgba(0,0,0,0.2);
    border-radius: 8px;
}

.follow-up-section {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid rgba(255,255,255,0.2);
}

.follow-up-question {
    background: rgba(255,255,255,0.1);
    padding: 12px;
    border-radius: 8px;
    margin: 10px 0;
}
```

## JavaScript for Socratic Interactions

```javascript
function toggleHint(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.classList.replace('fa-lightbulb', 'fa-lightbulb-on');
        btn.innerHTML = '<i class="fas fa-lightbulb-on"></i> 隐藏提示';
    } else {
        content.style.display = 'none';
        icon.classList.replace('fa-lightbulb-on', 'fa-lightbulb');
        btn.innerHTML = '<i class="fas fa-lightbulb"></i> 提示';
    }
}

function toggleAnswer(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> 隐藏答案';
    } else {
        content.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-eye"></i> 查看答案';
    }
}

function toggleMiniHint(btn) {
    const hint = btn.nextElementSibling;
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}
```

## Question Generation Guidelines

### For Classes
```
1. 这个类负责什么？
2. 为什么需要这个类？
3. 它与其他类如何协作？
4. 如何扩展这个类？
```

### For Functions
```
1. 这个函数做什么？
2. 参数的含义是什么？
3. 返回值代表什么？
4. 有什么边界情况？
```

### For Data Structures
```
1. 为什么选择这种结构？
2. 时间复杂度是多少？
3. 空间复杂度是多少？
4. 适合什么场景？
```

### For Algorithms
```
1. 算法的核心思想是什么？
2. 时间复杂度是多少？
3. 有没有更优的算法？
4. 如何处理边界情况？
```

## Workflow

1. **Identify key concepts** - From code analysis
2. **Categorize questions** - By type
3. **Generate Q&A pairs** - Use templates
4. **Add to code explanations** - In code-data.js
5. **Create standalone sections** - For complex topics
6. **Test interactions** - Verify all toggles work
