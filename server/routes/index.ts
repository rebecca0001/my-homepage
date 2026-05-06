import { Router } from 'express';
import { LLMClient, Config } from 'coze-coding-dev-sdk';
import { S3Storage } from 'coze-coding-dev-sdk';

const router = Router();

// 系统提示词
const SYSTEM_PROMPT = `你是部署在我个人主页的专属数字分身，负责解答访客关于我的所有问题。

【核心职责】
- 介绍我的个人情况、工作研究、近期动态、联系方式
- 回答与计算机、人工智能、现代教育技术、教育等相关的问题

【我的信息】
- 身份：高校计算机专业教师，深耕智慧教育领域
- 核心工作：主讲大学人工智能通识课程，高级程序设计语言，指导现代教育技术方向硕士生
- 研究方向：学习分析、教育大模型应用、人机协同教学
- 教育背景：
  - 博士：西南大学，农业资源利用，2005-2009
  - 硕士：西南大学，农业机械化工程，2001-2004
  - 学士：中国人民解放军空军雷达学院，电子信息，1994-1998

【回答要求】
- 语气友好平易近人
- 表达通俗真诚、简洁精炼，不冗余
- 不堆砌专业术语，不刻意装专家

【严格规则】
- 严禁编造经历
- 不清楚的问题直接说明
- 拒绝无关闲聊与个人隐私问题（邮箱联系方式除外）

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

import * as fs from 'fs';
import * as path from 'path';

// 创建本地存储目录
const uploadsDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
console.log('[Storage] Local upload directory:', uploadsDir);

// 头像上传接口
router.post('/api/avatar/upload', async (req, res) => {
  try {
    const { imageData, fileName, mimeType } = req.body as {
      imageData?: string;
      fileName?: string;
      mimeType?: string;
    };

    if (!imageData || !fileName) {
      res.status(400).json({ error: 'Missing imageData or fileName' });
      return;
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const actualMimeType = mimeType || 'image/jpeg';
    if (!allowedTypes.includes(actualMimeType)) {
      res.status(400).json({ error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' });
      return;
    }

    // 解码 base64 数据
    const buffer = Buffer.from(imageData, 'base64');

    // 验证文件大小 (最大 5MB)
    if (buffer.length > 5 * 1024 * 1024) {
      res.status(400).json({ error: 'File too large. Maximum size is 5MB' });
      return;
    }

    // 生成唯一文件名
    const ext = fileName.split('.').pop() || 'jpg';
    const newFileName = `avatar_${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, newFileName);

    // 保存文件到本地
    fs.writeFileSync(filePath, buffer);

    console.log('[Avatar] Uploaded:', filePath);

    // 生成访问 URL
    const avatarUrl = `/uploads/avatars/${newFileName}`;

    res.json({ success: true, key: newFileName, url: avatarUrl });
  } catch (error) {
    console.error('[Avatar] Upload error:', error);
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// 聊天接口 - 使用智谱大模型 API
router.post('/api/chat', async (req, res) => {
  const { message, messages } = req.body;

  console.log('[Chat] Received request:', { message, messagesCount: messages ? messages.length : 0 });

  try {
    // 调用智谱大模型 API
    const apiKey = '3776f64a59fe434098799705baec6185.e2CLP7NjJDpoOYN7'; // 用户提供的智谱 API Key
    const model = 'glm-4-flash'; // 智谱大模型
    const apiEndpoint = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    
    console.log('[Chat] Calling Zhipu AI API...');
    console.log('[Chat] Model:', model);
    console.log('[Chat] API Key:', apiKey.substring(0, 10) + '...'); // 只显示API Key的前10个字符
    
    // 构建请求体
    const requestBody = {
      model: model,
      messages: messages || [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        { role: 'user', content: message }
      ]
    };
    
    console.log('[Chat] Request body prepared:', { model: requestBody.model, messagesCount: requestBody.messages.length });
    
    // 调用 API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('[Chat] API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat] API error response:', errorText);
      throw new Error(`API response was not ok: ${response.status} - ${errorText}`);
    }
    
    // 解析响应
    const data = await response.json();
    console.log('[Chat] API response data:', data);
    
    // 检查响应格式
    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      const content = data.choices[0].message.content;
      console.log('[Chat] AI response:', content);
      res.json({ content: content });
    } else {
      console.error('[Chat] Invalid response format:', data);
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('[Chat] Error:', error);
    
    // 错误时使用智能模拟响应
    const userMessage = message.toLowerCase();
    let mockResponse = '';
    
    if (userMessage.includes('研究方向') || userMessage.includes('研究兴趣')) {
      mockResponse = '我的研究方向是智慧教育，主要研究兴趣包括学习分析、教育大模型应用和人机协同教学。我希望通过这些研究，能够为教育领域带来更多创新和改进。';
    } else if (userMessage.includes('学生') || userMessage.includes('期望') || userMessage.includes('要求')) {
      mockResponse = '我对学生的期望是认真、主动思考、有好奇心。具体技能可以教，但态度要端正。我希望学生能够积极参与课堂讨论，主动探索知识，并且培养解决问题的能力。';
    } else if (userMessage.includes('联系') || userMessage.includes('邮箱') || userMessage.includes('如何联系')) {
      mockResponse = '你可以通过主页留言，或者邮件联系我。我的邮箱是544069255@qq.com。请关注主页底部的联系方式获取更多信息。';
    } else if (userMessage.includes('课程') || userMessage.includes('教授')) {
      mockResponse = '我目前教授的课程有计算与智能技术导论和高级语言程序设计。这些课程旨在帮助学生掌握计算机科学的基础知识和编程技能。';
    } else if (userMessage.includes('教育背景') || userMessage.includes('学历') || userMessage.includes('毕业') || userMessage.includes('学校')) {
      mockResponse = '我的教育背景如下：\n- 博士：西南大学，农业资源利用，2005-2009\n- 硕士：西南大学，农业机械化工程，2001-2004\n- 学士：中国人民解放军空军雷达学院，电子信息，1994-1998\n\n我的教育背景为我现在的研究和教学工作奠定了坚实的基础。';
    } else if (userMessage.includes('你好') || userMessage.includes('嗨') || userMessage.includes('哈喽')) {
      mockResponse = '你好！很高兴见到你。我是WX的数字分身，有什么想了解的可以问我～比如我的研究方向、对学生的期望，或者怎么联系我，都可以聊聊。';
    } else if (userMessage.includes('谢谢') || userMessage.includes('感谢')) {
      mockResponse = '不客气！如果你还有其他问题，随时告诉我。';
    } else if (userMessage.includes('再见') || userMessage.includes('拜拜')) {
      mockResponse = '再见！希望我们下次再聊。';
    } else {
      mockResponse = `你好！我是WX的数字分身。关于你提到的"${message}"，我正在努力学习相关知识。

作为一名大学教师，我的主要研究方向是智慧教育，包括学习分析、教育大模型应用和人机协同教学。如果你有关于这些方面的问题，或者想了解我的教学理念、对学生的期望，以及如何联系我，我很乐意为你提供更详细的信息。`;
    }
    
    console.log('[Chat] Using fallback mock response due to API error');
    res.json({ content: mockResponse });
  }
});

export default router;
