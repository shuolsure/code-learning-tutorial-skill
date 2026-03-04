const methodsData = {
    methods: [
        {
            id: 'run',
            name: 'run()',
            file: 'nanobot/agent/loop.py',
            line: 25,
            signature: 'async def run() -> None',
            description: '启动 Agent 处理循环',
            category: 'core',
            level: 1,
            socratic: {
                q: "为什么这是一个 async 方法？",
                hint: "考虑一下这个方法内部做了什么...",
                answer: "因为它需要异步等待消息，使用 async 可以不阻塞其他操作",
                followUp: [
                    {
                        q: "如果不用 async 会怎样？",
                        hint: "想想同步等待的后果...",
                        answer: "会阻塞整个线程，无法处理其他任务"
                    }
                ]
            }
        },
        {
            id: 'process_message',
            name: 'process_message()',
            file: 'nanobot/agent/loop.py',
            line: 35,
            signature: 'async def process_message(msg: InboundMessage) -> Response',
            description: '处理单条消息并生成响应',
            category: 'core',
            level: 2,
            socratic: {
                q: "这个方法的主要职责是什么？",
                hint: "看看方法名和参数...",
                answer: "接收消息，调用 LLM，处理工具调用，返回响应",
                followUp: [
                    {
                        q: "为什么需要 InboundMessage 类型提示？",
                        hint: "类型提示有什么好处？",
                        answer: "提供更好的 IDE 支持和代码可读性"
                    }
                ]
            }
        },
        {
            id: 'build_context',
            name: 'build_context()',
            file: 'nanobot/agent/loop.py',
            line: 50,
            signature: 'async def build_context(message: InboundMessage) -> list[dict]',
            description: '构建 LLM 调用所需的上下文',
            category: 'helper',
            level: 3,
            socratic: {
                q: "上下文包含哪些内容？",
                hint: "想想 LLM 需要什么信息...",
                answer: "系统提示、历史消息、当前用户输入",
                followUp: []
            }
        },
        {
            id: 'call_llm',
            name: 'call_llm()',
            file: 'nanobot/agent/loop.py',
            line: 65,
            signature: 'async def call_llm(context: list[dict]) -> LLMResponse',
            description: '调用 LLM API 获取响应',
            category: 'core',
            level: 2,
            socratic: {
                q: "为什么这个方法需要单独封装？",
                hint: "考虑代码复用和测试...",
                answer: "便于切换不同的 LLM 提供商，也方便单元测试",
                followUp: []
            }
        },
        {
            id: 'execute_tool',
            name: 'execute_tool()',
            file: 'nanobot/agent/loop.py',
            line: 80,
            signature: 'async def execute_tool(tool_call: ToolCall) -> ToolResult',
            description: '执行工具调用并返回结果',
            category: 'core',
            level: 2,
            socratic: {
                q: "如何保证工具执行的安全性？",
                hint: "想想可能的风险...",
                answer: "需要验证工具名称、参数，限制执行时间和权限",
                followUp: []
            }
        },
        {
            id: 'publish',
            name: 'publish()',
            file: 'nanobot/bus/queue.py',
            line: 20,
            signature: 'async def publish(message: InboundMessage) -> None',
            description: '发布消息到消息队列',
            category: 'handler',
            level: 2,
            socratic: {
                q: "发布者和订阅者如何解耦？",
                hint: "消息队列的作用...",
                answer: "发布者只管发送消息到队列，不关心谁消费",
                followUp: []
            }
        },
        {
            id: 'receive',
            name: 'receive()',
            file: 'nanobot/bus/queue.py',
            line: 25,
            signature: 'async def receive() -> InboundMessage',
            description: '从消息队列接收消息',
            category: 'handler',
            level: 2,
            socratic: {
                q: "如果队列为空会发生什么？",
                hint: "asyncio.Queue 的行为...",
                answer: "会异步等待，直到有新消息到达",
                followUp: []
            }
        }
    ],
    
    relationships: [
        { from: 'run', to: 'process_message', type: 'calls', label: '循环调用' },
        { from: 'process_message', to: 'build_context', type: 'calls', label: '构建上下文' },
        { from: 'process_message', to: 'call_llm', type: 'calls', label: '调用 LLM' },
        { from: 'process_message', to: 'execute_tool', type: 'calls', label: '执行工具' },
        { from: 'run', to: 'receive', type: 'calls', label: '接收消息' },
        { from: 'receive', to: 'publish', type: 'data_flow', label: '队列连接', style: 'dashed' }
    ],
    
    categories: {
        core: { label: '核心逻辑', color: '#667eea', icon: '🎯' },
        helper: { label: '辅助函数', color: '#48bb78', icon: '🔧' },
        handler: { label: '事件处理', color: '#ed8936', icon: '📡' }
    }
};
