const codeData = {
    'agent-loop': {
        title: 'Agent 循环处理',
        file: 'nanobot/agent/loop.py',
        description: '核心处理引擎，协调各组件完成用户请求',
        sections: [
            {
                name: '核心实现',
                code: `class AgentLoop:
    """Agent处理循环，负责消息处理和工具调用"""
    
    def __init__(self, config: Config):
        self.config = config
        self.message_bus = MessageBus()
        self.tool_registry = ToolRegistry()
        self.running = False
    
    async def run(self):
        """启动处理循环"""
        self.running = True
        while self.running:
            message = await self.message_bus.receive()
            await self.process_message(message)`,
                explanation: `**苏格拉底式提问**：

1. 为什么使用 \`async/await\`？
   → 因为需要处理 I/O 密集型操作（如 LLM API 调用），异步可以提高并发性能

2. 为什么使用 \`while self.running\` 而不是 \`while True\`？
   → 提供可控的退出机制，便于优雅关闭

3. 如果 \`process_message\` 抛出异常会怎样？
   → 需要添加异常处理，否则整个循环会崩溃`
            },
            {
                name: '消息处理',
                code: `async def process_message(self, message: InboundMessage):
    """处理单条消息"""
    # 1. 构建上下文
    context = await self.build_context(message)
    
    # 2. 调用 LLM
    response = await self.call_llm(context)
    
    # 3. 处理工具调用
    while response.tool_calls:
        tool_result = await self.execute_tool(response.tool_calls[0])
        context.append(tool_result)
        response = await self.call_llm(context)
    
    # 4. 发送响应
    await self.send_response(message.channel, response.content)`,
                explanation: `**苏格拉底式提问**：

1. 为什么工具调用使用 \`while\` 循环？
   → 因为一个工具调用的结果可能触发另一个工具调用

2. 如果 LLM 返回空响应怎么办？
   → 需要添加空响应处理逻辑

3. \`build_context\` 做了什么？
   → 收集历史消息、系统提示等上下文信息`
            }
        ],
        relatedFiles: ['nanobot/bus/queue.py', 'nanobot/tools/registry.py'],
        tips: [
            '异步编程可以提高 I/O 密集型任务的性能',
            '工具调用循环需要设置最大次数限制，防止无限循环'
        ]
    },
    
    'message-bus': {
        title: '消息总线',
        file: 'nanobot/bus/queue.py',
        description: '消息队列管理，实现组件间通信',
        sections: [
            {
                name: '队列实现',
                code: `class MessageBus:
    """消息总线，管理消息队列"""
    
    def __init__(self):
        self._queue = asyncio.Queue()
        self._subscribers = []
    
    async def publish(self, message: InboundMessage):
        """发布消息到队列"""
        await self._queue.put(message)
    
    async def receive(self) -> InboundMessage:
        """从队列接收消息"""
        return await self._queue.get()`,
                explanation: `**苏格拉底式提问**：

1. 为什么使用 \`asyncio.Queue\` 而不是 Python 内置的 \`queue.Queue\`？
   → \`asyncio.Queue\` 支持异步操作，不会阻塞事件循环

2. 如果队列满了会怎样？
   → \`put\` 方法会等待直到有空位

3. \`_subscribers\` 列表的作用是什么？
   → 用于实现发布-订阅模式，通知多个监听者`
            }
        ],
        relatedFiles: ['nanobot/agent/loop.py'],
        tips: [
            '消息队列实现了解耦，生产者和消费者不需要直接交互'
        ]
    }
};
