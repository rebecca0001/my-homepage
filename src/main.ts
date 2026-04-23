import './index.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 渲染页面
function renderPage(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="app-container">
      <!-- 头部区域 -->
      <header class="header">
        <div class="profile-section">
          <div class="avatar">WX</div>
          <div class="profile-info">
            <h1>WX</h1>
            <p class="tagline">一个正在学习将AI与教育教学深度融合的大学教师</p>
          </div>
        </div>
      </header>

      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 关于我 -->
        <section class="card about-card">
          <h2 class="card-title">关于我</h2>
          <div class="about-content">
            <div class="info-item">
              <span class="info-label">研究方向</span>
              <span class="info-value">人工智能通识课程教学 & 现代教育技术</span>
            </div>
            <div class="info-item">
              <span class="info-label">当前工作</span>
              <span class="info-value">本科AI通识课教学 & 硕士生培养</span>
            </div>
            <div class="info-item">
              <span class="info-label">个人兴趣</span>
              <div class="interest-tags">
                <span class="tag">智慧教育</span>
                <span class="tag">日本影视剧</span>
                <span class="tag">花样滑冰</span>
              </div>
            </div>
            <div class="highlight">
              <span class="info-label">一个特点</span>
              <span class="info-value">温和、耐心，喜欢把复杂问题讲成人听得懂的话</span>
            </div>
          </div>
        </section>

        <!-- 数字分身聊天区 -->
        <section class="card chat-section">
          <h2 class="card-title">和我的数字分身聊聊</h2>
          <div class="chat-messages" id="chatMessages">
            <div class="message assistant">
              你好！我是WX的数字分身，有什么想了解的可以问我～ 比如我的研究方向、对学生的期望，或者怎么联系我，都可以聊聊。
            </div>
          </div>
          <div class="chat-input-container">
            <input 
              type="text" 
              class="chat-input" 
              id="chatInput" 
              placeholder="输入你的问题..."
              autocomplete="off"
            />
            <button class="send-btn" id="sendBtn">发送</button>
          </div>
        </section>
      </main>

      <!-- 页脚 -->
      <footer class="footer">
        <p>期待与你交流 | AI教育探索中</p>
      </footer>
    </div>
  `;

  // 初始化聊天功能
  initChat();
}

// 聊天功能
let conversationHistory: Message[] = [];

function initChat(): void {
  const chatMessagesEl = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput') as HTMLInputElement;
  const sendBtn = document.getElementById('sendBtn');

  if (!chatMessagesEl || !chatInput || !sendBtn) return;

  // 确保 chatMessages 不为 null
  const chatMessages = chatMessagesEl;

  // 发送消息
  const sendMessage = async (): Promise<void> => {
    const message = chatInput.value.trim();
    if (!message) return;

    // 清空输入框
    chatInput.value = '';

    // 添加用户消息
    addMessage('user', message);
    conversationHistory.push({ role: 'user', content: message });

    // 显示加载状态
    const typingDiv = addTypingIndicator();

    try {
      // 调用后端 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // 移除加载指示器
      typingDiv.remove();

      // 解析 JSON 响应
      const data = await response.json();
      const fullContent = data.content || '抱歉，我没有得到有效回复。';

      // 添加 AI 响应
      addMessage('assistant', fullContent);

      // 保存到历史
      conversationHistory.push({ role: 'assistant', content: fullContent });
    } catch (error) {
      console.error('Chat error:', error);
      typingDiv.remove();
      addMessage('assistant', '抱歉，出了点小问题，请稍后再试。');
    }
  };

  // 添加消息到聊天区域
  function addMessage(role: 'user' | 'assistant', content: string): HTMLDivElement {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
  }

  // 添加加载指示器
  function addTypingIndicator(): HTMLDivElement {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    return typingDiv;
  }

  // 滚动到底部
  function scrollToBottom(): void {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 绑定事件
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

// 导出初始化函数
export function initApp(): void {
  renderPage();
}
