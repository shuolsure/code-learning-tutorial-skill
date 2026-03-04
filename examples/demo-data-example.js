const demoData = {
    'user-message-flow': {
        title: '用户消息处理流程',
        description: '演示用户消息如何被处理并生成响应',
        steps: [
            {
                id: 1,
                title: '用户发送消息',
                description: '用户通过界面输入消息，消息被封装为 InboundMessage 对象',
                code: `user_input = "帮我写一个Python函数"

message = InboundMessage(
    channel="web",
    content=user_input,
    user_id="user_123"
)`,
                highlight: 'user-input',
                duration: 1500
            },
            {
                id: 2,
                title: '消息入队',
                description: '消息被发布到消息队列，等待 Agent 处理',
                code: `await message_bus.publish(message)
# 消息进入队列，等待被消费`,
                highlight: 'message-bus',
                duration: 1000
            },
            {
                id: 3,
                title: 'Agent 接收消息',
                description: 'Agent 循环从队列中取出消息',
                code: `async def run(self):
    while self.running:
        message = await self.message_bus.receive()
        await self.process_message(message)`,
                highlight: 'agent-loop',
                duration: 1200
            },
            {
                id: 4,
                title: '构建上下文',
                description: '收集系统提示、历史消息等上下文信息',
                code: `context = await self.build_context(message)
# context = [
#     {"role": "system", "content": "You are a helpful assistant"},
#     {"role": "user", "content": "帮我写一个Python函数"}
# ]`,
                highlight: 'build-context',
                duration: 800
            },
            {
                id: 5,
                title: '调用 LLM',
                description: '将上下文发送给 LLM API 获取响应',
                code: `response = await self.call_llm(context)
# response = LLMResponse(
#     content="好的，我来帮你写一个函数...",
#     tool_calls=[]
# )`,
                highlight: 'call-llm',
                duration: 2000
            },
            {
                id: 6,
                title: '返回响应',
                description: '将 LLM 的响应发送回用户',
                code: `await self.send_response(message.channel, response.content)
# 用户看到: "好的，我来帮你写一个函数..."`,
                highlight: 'send-response',
                duration: 1000
            }
        ]
    },
    
    'tool-call-flow': {
        title: '工具调用流程',
        description: '演示 Agent 如何处理工具调用请求',
        steps: [
            {
                id: 1,
                title: 'LLM 请求工具',
                description: 'LLM 决定需要调用工具来完成任务',
                code: `response = LLMResponse(
    content="",
    tool_calls=[
        ToolCall(
            name="read_file",
            arguments={"path": "main.py"}
        )
    ]
)`,
                highlight: 'tool-request',
                duration: 1500
            },
            {
                id: 2,
                title: '执行工具',
                description: 'Agent 调用工具注册表执行工具',
                code: `tool_result = await self.execute_tool(tool_call)
# tool_result = ToolResult(
#     content="def main():\\n    print('Hello')",
#     success=True
# )`,
                highlight: 'execute-tool',
                duration: 2000
            },
            {
                id: 3,
                title: '更新上下文',
                description: '将工具结果添加到上下文中',
                code: `context.append({
    "role": "tool",
    "content": tool_result.content,
    "tool_call_id": tool_call.id
})`,
                highlight: 'update-context',
                duration: 800
            },
            {
                id: 4,
                title: '再次调用 LLM',
                description: '将更新后的上下文发送给 LLM',
                code: `response = await self.call_llm(context)
# LLM 现在有了工具结果，可以生成更好的响应`,
                highlight: 'recall-llm',
                duration: 2000
            }
        ]
    }
};
