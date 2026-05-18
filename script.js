// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 自定义鼠标指针逻辑 (PC端)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, .work-card'); // 悬浮变大的目标

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // 监听鼠标移动
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 核心点直接跟随
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // 使用 requestAnimationFrame 让光圈平滑跟随 (产生阻尼感/延迟感)
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();

    // 鼠标悬浮在可点击元素上的放大特效
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // 2. 滚动视差与出现动画 (Intersection Observer API)
    // 监控页面中所有带有 .fade-up 类的元素
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 当元素 15% 进入视口时触发
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加可见类触发 CSS 动画
                entry.target.classList.add('visible');
                // 触发一次后取消观察，提升性能
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
});