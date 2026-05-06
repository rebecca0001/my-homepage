import './index.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 默认头像 URL（本地生成的）
const DEFAULT_AVATAR_TEXT = 'WX';

// 存储当前头像状态
let currentAvatar: { type: 'text' | 'image'; value: string } = { type: 'text', value: DEFAULT_AVATAR_TEXT };

// 渲染页面
function renderPage(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const avatarHtml = currentAvatar.type === 'image'
    ? `<img src="${currentAvatar.value}" alt="头像" class="avatar-img" />`
    : `<span>${currentAvatar.value}</span>`;

  app.innerHTML = `
    <div class="app-container">
      <!-- 头部区域 -->
      <header class="header">
        <div class="profile-section">
          <div class="avatar-wrapper">
            <div class="avatar" id="avatarContainer">
              ${avatarHtml}
            </div>
            <button class="avatar-upload-btn" id="avatarUploadBtn" title="上传头像">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </button>
            <input type="file" id="avatarInput" accept="image/jpeg,image/png,image/gif,image/webp" style="display: none;" />
          </div>
          <div class="profile-info">
            <h1>WX</h1>
            <p class="tagline">一个正在探索AI与教育教学深度融合的大学教师</p>
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
              <span class="info-value">智慧教育</span>
            </div>
            <div class="info-item">
              <span class="info-label">研究兴趣</span>
              <div class="interest-tags">
                <span class="tag">学习分析</span>
                <span class="tag">教育大模型应用</span>
                <span class="tag">人机协同教学</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-label">教授课程</span>
              <span class="info-value">计算与智能技术导论 高级语言程序设计</span>
            </div>
            <div class="info-item">
              <span class="info-label">教育背景</span>
              <div class="education-list">
                <div class="education-item">
                  <div class="education-degree">博士</div>
                  <div class="education-school">西南大学</div>
                  <div class="education-major">农业资源利用</div>
                  <div class="education-year">2005-2009</div>
                </div>
                <div class="education-item">
                  <div class="education-degree">硕士</div>
                  <div class="education-school">西南大学</div>
                  <div class="education-major">农业机械化工程</div>
                  <div class="education-year">2001-2004</div>
                </div>
                <div class="education-item">
                  <div class="education-degree">学士</div>
                  <div class="education-school">中国人民解放军空军雷达学院</div>
                  <div class="education-major">电子信息</div>
                  <div class="education-year">1994-1998</div>
                </div>
              </div>
            </div>
            <div class="highlight">
              <span class="info-label">一个特点</span>
              <span class="info-value">温和、耐心，喜欢把复杂问题讲成人听得懂的话</span>
            </div>
          </div>
        </section>

        <!-- 主要研究项目 -->
        <section class="card research-card">
          <h2 class="card-title">主要研究项目</h2>
          <div class="projects-list">
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">基于GIS与知识发现的山地作物种植区划研究</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">重庆市科技局</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">竹片粗铣连续化定向进料系统研发</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">委托研发</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">基于移动终端的家校通系统研发</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">委托研发</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">竹种病害图像数据集的构建与优化</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">委托研发</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">镁合金板材垂直度在线检测系统研发</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">委托研发</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">实验用品管理系统研发</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">委托研发</div>
            </div>
          </div>
        </section>

        <!-- 主要教改项目 -->
        <section class="card projects-card">
          <h2 class="card-title">主要教改项目</h2>
          <div class="projects-list">
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">数智化赋能的跨学科人工智能通识课程分层递进式实验教学体系重构与实践研究</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">西南大学教改项目</div>
              <div class="project-code">SWU260622</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">基于学习者职业能力提升为导向的高等继续教育《专业英语》课程案例库建设</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">西南大学网络与继续教育教学研究项目</div>
              <div class="project-code">SWU1908039</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">基于项目驱动的电子商务课程教学改革与实践</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">西南大学教改项目</div>
              <div class="project-code">2015JY029</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">基于CBI的专业英语网络协作教学模式研究与实践</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">西南大学教改项目</div>
              <div class="project-code">2009JY046</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">企业电子商务管理网络辅助课程建设</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">西南大学教改项目</div>
              <div class="project-code">2007JY021</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">微型计算机接口技术实验教学改革</span>
                <span class="project-role">主持</span>
              </div>
              <div class="project-org">西南大学教改项目</div>
              <div class="project-code">2005-1-18</div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <span class="project-name">基于Wiki技术的高校计算机公共课教学模式研究与实践</span>
                <span class="project-role">主研</span>
              </div>
              <div class="project-org">重庆市教委教改项目</div>
              <div class="project-code">09-3-028</div>
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
          <div class="quick-questions">
            <button class="quick-question-btn" data-question="我的研究方向">我的研究方向</button>
            <button class="quick-question-btn" data-question="对学生的期望">对学生的期望</button>
            <button class="quick-question-btn" data-question="如何联系我">如何联系我</button>
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
        <a href="mailto:544069255@qq.com" class="contact-btn" title="发邮件联系我">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </a>
      </footer>
    </div>
  `;

  // 初始化头像上传功能
  initAvatarUpload();
  // 初始化聊天功能
  initChat();
}

// 头像上传功能
function initAvatarUpload(): void {
  const uploadBtn = document.getElementById('avatarUploadBtn') as HTMLButtonElement;
  const avatarInput = document.getElementById('avatarInput') as HTMLInputElement;
  const avatarContainer = document.getElementById('avatarContainer');

  if (!uploadBtn || !avatarInput || !avatarContainer) return;

  // 点击上传按钮触发文件选择
  uploadBtn.addEventListener('click', () => {
    avatarInput.click();
  });

  // 文件选择后处理上传
  avatarInput.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('请选择 JPG、PNG、GIF 或 WebP 格式的图片');
      return;
    }

    // 显示上传中状态
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<span class="upload-loading">压缩中...</span>';

    try {
      // 压缩并转换为 base64
      const { base64, resized } = await compressImage(file);

      // 如果图片被压缩，显示"上传中..."
      if (resized) {
        uploadBtn.innerHTML = '<span class="upload-loading">上传中...</span>';
      }

      // 上传到服务器
      const response = await fetch('/api/avatar/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: base64,
          fileName: file.name,
          mimeType: 'image/jpeg',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '上传失败');
      }

      const data = await response.json();

      // 更新头像显示
      currentAvatar = { type: 'image', value: data.url };
      avatarContainer.innerHTML = `<img src="${data.url}" alt="头像" class="avatar-img" />`;

      // 保存到本地存储以便刷新后保持
      localStorage.setItem('userAvatarUrl', data.url);

      console.log('头像上传成功');
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试');
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      `;
      // 清空 input 以允许重复选择同一文件
      avatarInput.value = '';
    }
  });

  // 检查本地存储中是否有已保存的头像
  const savedAvatarUrl = localStorage.getItem('userAvatarUrl');
  if (savedAvatarUrl) {
    currentAvatar = { type: 'image', value: savedAvatarUrl };
    avatarContainer.innerHTML = `<img src="${savedAvatarUrl}" alt="头像" class="avatar-img" />`;
  }
}

// 将文件转换为 base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // 去掉 data:image/...;base64, 前缀
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 压缩图片并转换为 base64
function compressImage(file: File): Promise<{ base64: string; resized: boolean }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // 头像最大尺寸 400x400
        const maxSize = 400;
        let width = img.width;
        let height = img.height;

        // 计算缩放比例
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        // 创建画布并压缩
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建画布上下文'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // 压缩为 JPEG，质量 0.8
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64 = dataUrl.split(',')[1];

        resolve({
          base64,
          resized: width < img.width || height < img.height,
        });
      };
      img.onerror = () => reject(new Error('无法加载图片'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('无法读取文件'));
    reader.readAsDataURL(file);
  });
}

// 聊天功能
let conversationHistory: Message[] = [];

function initChat(): void {
  const chatMessagesEl = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput') as HTMLInputElement;
  const sendBtn = document.getElementById('sendBtn');
  const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');

  if (!chatMessagesEl || !chatInput || !sendBtn) return;

  const chatMessages = chatMessagesEl;

  // 绑定快捷问题按钮事件
  quickQuestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      if (question) {
        chatInput.value = question;
        sendMessage();
      }
    });
  });

  // 智能本地响应系统
  function getSmartResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // 问候语
    if (lowerMessage.includes('你好') || lowerMessage.includes('嗨') || lowerMessage.includes('哈喽') || lowerMessage.includes('您好') || lowerMessage.includes('嗨') || lowerMessage.includes('hi')) {
      return '你好！很高兴见到你。我是WX的数字分身，有什么想了解的可以问我～';
    }
    
    // 感谢语
    if (lowerMessage.includes('谢谢') || lowerMessage.includes('感谢') || lowerMessage.includes('多谢') || lowerMessage.includes('谢了')) {
      return '不客气！如果你还有其他问题，随时告诉我。';
    }
    
    // 告别语
    if (lowerMessage.includes('再见') || lowerMessage.includes('拜拜') || lowerMessage.includes('bye') || lowerMessage.includes('下次见')) {
      return '再见！希望我们下次再聊。';
    }
    
    // 研究方向
    if (lowerMessage.includes('研究方向') || lowerMessage.includes('研究兴趣') || lowerMessage.includes('研究领域') || lowerMessage.includes('研究内容')) {
      return '我的研究方向是智慧教育，主要研究兴趣包括学习分析、教育大模型应用和人机协同教学。我希望通过这些研究，能够为教育领域带来更多创新和改进。';
    }
    
    // 学生期望
    if (lowerMessage.includes('学生') && (lowerMessage.includes('期望') || lowerMessage.includes('要求') || lowerMessage.includes('希望') || lowerMessage.includes('标准'))) {
      return '我对学生的期望是认真、主动思考、有好奇心。具体技能可以教，但态度要端正。我希望学生能够积极参与课堂讨论，主动探索知识，并且培养解决问题的能力。';
    }
    
    // 联系方式
    if (lowerMessage.includes('联系') || lowerMessage.includes('邮箱') || lowerMessage.includes('如何联系') || lowerMessage.includes('联系方式') || lowerMessage.includes('电话')) {
      return '你可以通过主页留言，或者邮件联系我。我的邮箱是544069255@qq.com。请关注主页底部的联系方式获取更多信息。';
    }
    
    // 课程信息
    if (lowerMessage.includes('课程') || lowerMessage.includes('教授') || lowerMessage.includes('教学') || lowerMessage.includes('上课')) {
      return '我目前教授的课程有计算与智能技术导论和高级语言程序设计。这些课程旨在帮助学生掌握计算机科学的基础知识和编程技能。';
    }
    
    // 教育背景
    if (lowerMessage.includes('教育背景') || lowerMessage.includes('学历') || lowerMessage.includes('毕业') || lowerMessage.includes('学位') || lowerMessage.includes('学校')) {
      return '我拥有西南大学的博士学位，专业是农业资源利用。之前还获得了西南大学的硕士学位和中国人民解放军空军雷达学院的学士学位。我的教育背景为我现在的研究和教学工作奠定了坚实的基础。';
    }
    
    // 关于AI在教育中的应用
    if ((lowerMessage.includes('ai') || lowerMessage.includes('人工智能') || lowerMessage.includes('大模型') || lowerMessage.includes('智能')) && (lowerMessage.includes('教育') || lowerMessage.includes('教学') || lowerMessage.includes('学习'))) {
      return '我认为人工智能在教育中有着巨大的潜力。它可以帮助个性化学习、自动化评估、提供智能辅导等。但同时，我们也需要注意平衡技术与人文关怀，确保AI能够真正服务于教育的本质目标。';
    }
    
    // 关于未来教育
    if (lowerMessage.includes('未来') && (lowerMessage.includes('教育') || lowerMessage.includes('教学') || lowerMessage.includes('学习'))) {
      return '我认为未来教育会更加个性化、智能化和全球化。技术将在教育中发挥更大的作用，但教师的角色仍然不可替代，他们将更多地成为学习的引导者和促进者。';
    }
    
    // 关于个人兴趣
    if (lowerMessage.includes('兴趣') || lowerMessage.includes('爱好') || lowerMessage.includes('喜欢') || lowerMessage.includes('热爱')) {
      return '我的主要兴趣是智慧教育研究，包括学习分析、教育大模型应用和人机协同教学。此外，我也喜欢探索新技术在教育中的应用，以及与学生交流和分享知识。';
    }
    
    // 关于职业规划
    if (lowerMessage.includes('职业') || lowerMessage.includes('规划') || lowerMessage.includes('发展') || lowerMessage.includes('未来计划')) {
      return '我的职业规划是继续深入研究智慧教育领域，探索AI与教育教学的深度融合，为教育创新做出贡献。同时，我也希望能够培养更多优秀的学生，帮助他们实现自己的学术和职业目标。';
    }
    
    // 关于教学方法
    if (lowerMessage.includes('教学方法') || lowerMessage.includes('教学理念') || lowerMessage.includes('教学方式') || lowerMessage.includes('教学风格')) {
      return '我的教学理念是注重培养学生的思维能力和实践能力，鼓励学生主动思考和探索。我喜欢将复杂的概念讲得通俗易懂，通过实际案例和互动式教学来提高学生的学习兴趣和效果。';
    }
    
    // 关于学术成就
    if (lowerMessage.includes('学术') || lowerMessage.includes('成就') || lowerMessage.includes('成果') || lowerMessage.includes('论文') || lowerMessage.includes('研究成果')) {
      return '我在智慧教育领域有一些研究成果，主要集中在学习分析、教育大模型应用和人机协同教学方面。我希望通过持续的研究，能够为教育领域带来更多有价值的贡献。';
    }
    
    // 关于教育技术
    if (lowerMessage.includes('教育技术') || lowerMessage.includes('技术应用') || lowerMessage.includes('教育工具') || lowerMessage.includes('教学技术')) {
      return '我认为教育技术是推动教育创新的重要力量。我关注学习分析技术、教育大模型、智能辅导系统等新兴技术在教育中的应用，希望能够通过技术手段提高教学效果和学习体验。';
    }
    
    // 通用问题 - 根据关键词生成更具体的回复
    if (lowerMessage.includes('什么') || lowerMessage.includes('为什么') || lowerMessage.includes('如何') || lowerMessage.includes('怎样') || lowerMessage.includes('？')) {
      return `你好！关于你提到的"${message}"，我正在努力学习相关知识。作为一名大学教师，我的主要研究方向是智慧教育，包括学习分析、教育大模型应用和人机协同教学。如果你有关于这些方面的问题，或者想了解我的教学理念、对学生的期望，以及如何联系我，我很乐意为你提供更详细的信息。`;
    }
    
    // 其他问题
    return `你好！我是WX的数字分身。关于"${message}"这个话题，我正在不断学习和探索中。作为一名专注于智慧教育研究的大学教师，我很乐意与你分享我在学习分析、教育大模型应用和人机协同教学方面的见解。如果你有任何关于教育、技术或我的研究领域的问题，都可以随时问我。`;
  }

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
      // 使用服务器端代理来避免 CORS 问题
      console.log('Sending request to server-side proxy...');
      console.log('User message:', message);
      
      // 构建系统提示词
      const systemPrompt = `你是部署在我个人主页的专属数字分身，负责解答访客关于我的所有问题。

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
      
      // 构建消息列表
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ];
      
      // 调用服务器端代理
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          messages: messages
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      // 移除加载指示器
      typingDiv.remove();

      // 解析 JSON 响应
      const data = await response.json();
      console.log('Response data:', data);
      
      // 检查是否有有效内容
      if (data.content) {
        const content = data.content;
        console.log('AI response:', content);
        // 添加 AI 响应
        addMessage('assistant', content);
        // 保存到历史
        conversationHistory.push({ role: 'assistant', content: content });
      } else {
        console.error('Invalid response format:', data);
        // 显示错误信息
        const errorResponse = '抱歉，AI 服务暂时不可用，请稍后再试。';
        addMessage('assistant', errorResponse);
        conversationHistory.push({ role: 'assistant', content: errorResponse });
      }
    } catch (error) {
      console.error('Chat error:', error);
      typingDiv.remove();
      // 显示错误信息
      const errorResponse = '调用失败，请检查Key或网络';
      addMessage('assistant', errorResponse);
      conversationHistory.push({ role: 'assistant', content: errorResponse });
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
