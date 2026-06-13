document.addEventListener('DOMContentLoaded', function() {
    // 1. 主题切换功能
    initThemeToggle();
    
    // 2. 博客文章分类过滤
    initCategoryFilter();
    
    // 3. 评论表单验证
    initFormValidation();
});

// 功能1: 暗黑/亮色模式切换
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('blog-theme');
    
    // 初始化主题
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? '' : 'dark';
        
        if (newTheme) {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('blog-theme', newTheme);
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem('blog-theme');
        }
        
        updateThemeButton(newTheme);
    });
}

function updateThemeButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (theme === 'dark') {
        btn.textContent = '☀️ 切换主题';
    } else {
        btn.textContent = '🌙 切换主题';
    }
}

// 功能2: 博客文章分类过滤
function initCategoryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的激活状态
            filterBtns.forEach(b => b.classList.remove('active'));
            // 给当前按钮添加激活状态
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // 过滤卡片
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // 添加淡入动画效果
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.3s';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 功能3: 评论表单验证
function initFormValidation() {
    const form = document.getElementById('comment-form');
    
    form.addEventListener('submit', function(e) {
        // 阻止表单默认提交
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const commentInput = document.getElementById('comment');
        
        let isValid = true;
        let message = '';
        
        // 验证昵称 (至少2个字符)
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            isValid = false;
            message += '昵称至少需要2个字符！\n';
            nameInput.style.borderColor = 'red';
        } else {
            nameInput.style.borderColor = '';
        }
        
        // 验证邮箱
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            message += '请输入有效的邮箱地址！\n';
            emailInput.style.borderColor = 'red';
        } else {
            emailInput.style.borderColor = '';
        }
        
        // 验证留言内容 (至少10个字符)
        if (!commentInput.value.trim() || commentInput.value.trim().length < 10) {
            isValid = false;
            message += '留言内容至少需要10个字符！\n';
            commentInput.style.borderColor = 'red';
        } else {
            commentInput.style.borderColor = '';
        }
        
        if (isValid) {
            // 模拟提交成功
            alert('留言提交成功！感谢您的反馈！');
            form.reset();
        } else {
            // 显示错误信息
            alert('提交失败！请检查以下内容：\n\n' + message);
        }
    });
}
