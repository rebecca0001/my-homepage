import { Router } from 'express';
import { LLMClient, Config } from 'coze-coding-dev-sdk';

const router = Router();

// 系统提示词
const SYSTEM_PROMPT = `你是WX的数字分身。WX是一个正在学习将AI与教育教学深度融合的大学教师，目前在教授人工智能通识课程，同时培养现代教育技术方向的硕士生。

【WX的基本信息】
- 名字：WX
- 职业：大学教师
- 当前状态：正在搭自己的个人主页
- 擅长方向：AI应用、智慧教育

【WX的性格特点】
- 温和、耐心
- 喜欢把复杂问题讲成人听得懂的话
- 说话风格亲切自然，不端着

【WX的个人兴趣】
- 智慧教育
- 影视剧（尤其熟悉日本影视剧）
- 看花样滑冰

【别人最可能问WX的3个问题】
1. 你现在主要研究方向是什么？
→ 人工智能通识课程教学、AI与教育融合、智慧学习环境
2. 你对学生有什么要求？
→ 认真、主动思考、有好奇心。具体技能可以教，但态度要端正
3. 怎么联系你？
→ 可以通过主页留言，或者邮件（可以提到请关注主页底部的联系方式）

【回答原则】
- 用第一人称"我"回答，就像WX本人在说话
- 语言温和亲切，像朋友聊天
- 避免过于学术化的表达，多用通俗易懂的话
- 如果不确定的问题，坦诚说明，不要瞎编
- 保持简短精炼，每次回复一般不超过200字
- 不要重复自我介绍（用户已经知道你是WX）

现在开始对话。`;

// API 路由示例
router.get('/api/hello', (_req, res) => {
  res.json({
    message: 'Hello from Express + Vite!',
    timestamp: new Date().toISOString(),
  });
});

router.post('/api/data', (req, res) => {
  const requestData = req.body;
  res.json({
    success: true,
    data: requestData,
    receivedAt: new Date().toISOString(),
  });
});

// 健康检查接口
router.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    env: process.env.COZE_PROJECT_ENV,
    timestamp: new Date().toISOString(),
  });
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// 聊天接口 - 流式输出
router.post('/api/chat', async (req, res) => {
  const { messages } = req.body as { messages: ChatMessage[] };

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Invalid messages format' });
    return;
  }

  console.log('[Chat] Received request with', messages.length, 'messages');

  // 构建完整的消息列表（包含系统提示词）
  const fullMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ];

  try {
    const config = new Config();
    const client = new LLMClient(config);

    console.log('[Chat] Starting invoke...');

    // 使用 invoke 方法（非流式）
    const response = await client.invoke(fullMessages, {
      model: 'doubao-seed-2-0-lite-260215',
      temperature: 0.7,
    });

    console.log('[Chat] Invoke completed, response length:', response.content.length);

    res.json({ content: response.content });
  } catch (error) {
    console.error('[Chat] Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

export default router;
