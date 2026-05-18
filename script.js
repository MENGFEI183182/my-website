document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 首页文字遮罩入场动画
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 100); // 稍微延迟，确保渲染完成

    // 2. 自定义鼠标平滑跟随
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateCursor() {
        // 利用线性插值 (Lerp) 实现如丝般顺滑的跟随阻尼感
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 3. 高级交互：磁性吸附 (Magnetic Effect)
    const magnetics = document.querySelectorAll('.magnetic');
    
    magnetics.forEach(btn => {
        // 鼠标悬停放大光标
        btn.addEventListener('mouseenter', () => {
            follower.classList.add('hovering');
        });
        btn.addEventListener('mouseleave', () => {
            follower.classList.remove('hovering');
            // 鼠标移出时归位
            btn.style.transform = 'translate(0px, 0px)';
        });

        // 核心磁性逻辑
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            // 计算鼠标在元素内部的相对中心坐标
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            // 移动元素本身 (乘以一个系数降低移动幅度，显得高级)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        });
    });

    // 为所有可点击元素添加鼠标悬停状态
    document.querySelectorAll('a, .work-card').forEach(el => {
        if(!el.classList.contains('magnetic')) {
            el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
        }
    });

    // 4. 滚动动画 (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 5. 高级交互：图片视差滚动 (Parallax Scrolling)
    const parallaxImages = document.querySelectorAll('.parallax-img');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        parallaxImages.forEach(img => {
            // 获取图片容器离页面顶部的距离
            const imgTop = img.parentElement.offsetTop;
            // 计算视差偏移量，数值越小视差越弱，越自然
            const yPos = (scrollY - imgTop) * 0.15; 
            
            // 为了防止图片滚出容器，我们使用 transformY，配合 CSS 中 120% 的高度
            img.style.transform = `translateY(${yPos}px)`;
        });
    });
});