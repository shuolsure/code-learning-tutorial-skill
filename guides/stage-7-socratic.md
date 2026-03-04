# Stage 7: Socratic Teaching Method

Implement Q&A teaching methodology to encourage critical thinking.

## 🔧 Tool Commands (Copy-Paste Ready)

### 7.1 Identify Key Concepts

```
Tool: Grep
Pattern: ^class |^def |^async def 
Output: content, -n: true
Goal: Find all classes and methods to generate questions for

Tool: Read
File: each core file
Limit: 100 lines
Goal: Extract docstrings and understand design decisions
```

### 7.2 Extract Design Rationale

```
Tool: Read
File: README.md, ARCHITECTURE.md (if exists)
Goal: Find design decisions and trade-offs

Tool: Grep
Pattern: TODO|FIXME|HACK|NOTE
Output: content
Goal: Find areas with interesting design decisions
```

---

## 🎯 Three-Level Depth Question Framework

### Level 1: What (理解层) - Basic Understanding

```
Purpose: Ensure learner understands what the code does

Templates:
1. "这个{{类/方法/变量}}做什么？"
   Hint: 看名字和文档...
   Answer: {{DESCRIPTION}}

2. "输入是什么？输出是什么？"
   Hint: 检查参数和返回值...
   Answer: 输入: {{PARAMS}}, 输出: {{RETURN}}
```

### Level 2: Why (分析层) - Design Analysis

```
Purpose: Understand design decisions and trade-offs

Templates:
1. "为什么需要这个{{类/方法}}？"
   Hint: 考虑它解决的问题...
   Answer: {{PROBLEM_IT_SOLVES}}

2. "为什么这样实现？"
   Hint: 分析设计决策...
   Answer: {{DESIGN_RATIONALE}}
```

### Level 3: How (扩展层) - Application & Extension

```
Purpose: Apply knowledge to new scenarios

Templates:
1. "如何优化这个{{方法/算法}}？"
   Hint: 考虑性能、可读性、可维护性...
   Answer: {{OPTIMIZATION_SUGGESTIONS}}

2. "如何扩展功能？"
   Hint: 考虑新需求场景...
   Answer: {{EXTENSION_APPROACH}}
```

---

## �� socratic-data.js Generation Template

```javascript
const socraticData = {
    categories: [
        {
            id: "architecture",
            title: "架构设计",
            icon: "🏗️",
            questions: [
                {
                    id: "async-design",
                    type: "design",
                    level: 2,
                    question: "为什么整个系统采用异步架构？",
                    hint: "考虑同时处理多个用户请求的场景...",
                    answer: "异步架构允许在等待 I/O 操作时处理其他任务，提高并发性能。",
                    followUp: [
                        {
                            question: "如果 LLM API 响应很慢怎么办？",
                            hint: "考虑超时和队列...",
                            answer: "系统设置了超时机制，消息队列可以缓冲请求。"
                        }
                    ]
                }
            ]
        }
    ]
};
```

---

## ✅ Verification Checklist

After generation, verify:
- [ ] Each question has 3 levels (What/Why/How)
- [ ] Hints are helpful but not revealing
- [ ] Answers are accurate and complete
- [ ] Follow-up questions deepen understanding
- [ ] Categories are logically organized
- [ ] Progress tracking works
- [ ] Mobile responsive
- [ ] All toggles work correctly

