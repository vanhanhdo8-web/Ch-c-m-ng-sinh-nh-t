let datetxt = "6 - 5";
let datatxtletter = "Nhân ngày đặc biệt này, chúc bạn luôn có thật nhiều sức khỏe để theo đuổi những ước mơ của mình, thật nhiều niềm vui để mỗi ngày trôi qua đều là một ngày đáng nhớ, và thật nhiều may mắn để mọi dự định đều thuận lợi. Mong rằng tuổi mới sẽ mang đến cho bạn những cơ hội mới, những trải nghiệm đáng giá và những khoảnh khắc hạnh phúc bên gia đình, bạn bè và những người yêu thương.";

let titleLetter = "Gửi em";
let charArrDate = datetxt.split('');
let charArrDateLetter = datatxtletter.split('');
let charArrTitle = titleLetter.split('');
let currentIndex = 0;
let currentIndexLetter = 0;
let currentIndexTitle = 0;
let date__of__birth = document.querySelector(".date__of__birth span");
let text__letter = document.querySelector(".text__letter p");

const music = document.getElementById("bgMusic");

function startEverything() {
    music.currentTime = 0;
    music.play().then(() => {
        console.log("Music started successfully 🎶");
    }).catch(e => {
        console.log("Music play blocked or failed:", e);
    });

    setTimeout(function () {
        timeDatetxt = setInterval(function () {
            if (currentIndex < charArrDate.length) {
                date__of__birth.textContent += charArrDate[currentIndex];
                currentIndex++;
            }
            else {
                let i = document.createElement("i");
                i.className = "fa-solid fa-star"
                document.querySelector(".date__of__birth").prepend(i)
                document.querySelector(".date__of__birth").appendChild(i.cloneNode(true))
                clearInterval(timeDatetxt)
            }
        }, 100)
    }, 12000)

    if (window.innerWidth < 768) {
        setTimeout(() => {
            fcMobile.timeout("18", document.querySelector(".day"))
        }, 5000)
        setTimeout(() => {
            fcMobile.timeout("6", document.querySelector(".month"))
        }, 6000)
    }

    startSakura();
}

function startSakura() {
    const container = document.getElementById('sakura-container');
    const sakuraCount = 50;
    for (let i = 0; i < sakuraCount; i++) {
        createSakura(container);
    }
}

function createSakura(container) {
    const sakura = document.createElement('img');
    sakura.src = './material/sakura.png';
    sakura.className = 'sakura';
    const left = Math.random() * 100;
    const size = Math.random() * 20 + 10;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 10;
    sakura.style.left = left + '%';
    sakura.style.width = size + 'px';
    sakura.style.height = 'auto';
    sakura.style.animationDuration = duration + 's';
    sakura.style.animationDelay = delay + 's';
    container.appendChild(sakura);
}

$(document).ready(function () {
    $("#gift-overlay").on("click", function () {
        $(this).addClass("hidden");
        $("#wrapper").css({ "opacity": "1", "visibility": "visible" });
        $("body").addClass("started");
        startEverything();
    });
});

var intervalContent;
var intervalTitle;
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let particles = [];
let rockets = [];
let fireworkTimer;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Rocket {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height / 2);
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.velocity = { x: (Math.random() - 0.5) * 2, y: -(Math.random() * 3 + 7) };
        this.alive = true;
    }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.y <= this.targetY) { this.alive = false; explode(this.x, this.y); }
    }
}

class Particle {
    constructor(x, y, color, velocity) {
        this.x = x; this.y = y; this.color = color; this.velocity = velocity;
        this.alpha = 1; this.friction = 0.96; this.gravity = 0.15;
    }
    draw() {
        ctx.save(); ctx.globalAlpha = this.alpha;
        ctx.beginPath(); ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.shadowBlur = 10; ctx.shadowColor = this.color; ctx.fill();
        ctx.restore();
    }
    update() {
        this.velocity.x *= this.friction; this.velocity.y *= this.friction; this.velocity.y += this.gravity;
        this.x += this.velocity.x; this.y += this.velocity.y; this.alpha -= 0.012;
    }
}

function explode(x, y) {
    const count = 120;
    const baseHue = Math.random() * 360;
    for (let i = 0; i < count; i++) {
        const hue = (baseHue + Math.random() * 100) % 360;
        const color = `hsl(${hue}, 100%, 60%)`;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 2;
        particles.push(new Particle(x, y, color, { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }));
    }
}

function animateFireworks() {
    if (document.getElementById('fireworks').style.display === 'none') return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    rockets.forEach((rocket, index) => { rocket.update(); rocket.draw(); if (!rocket.alive) rockets.splice(index, 1); });
    particles.forEach((particle, index) => { if (particle.alpha > 0) { particle.update(); particle.draw(); } else particles.splice(index, 1); });
    requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    canvas.style.display = 'block';
    animateFireworks();
    fireworkTimer = setInterval(() => { if (rockets.length < 5) rockets.push(new Rocket()); }, 400);
}

$("#btn__letter").on("click", function () {
    $(".box__letter").fadeIn(300)
    startFireworks();
    setTimeout(function () { $(".letter__border").slideDown(500); }, 300)
    setTimeout(function () {
        intervalTitle = setInterval(function () {
            if (currentIndexTitle < charArrTitle.length) {
                document.querySelector(".title__letter").textContent += charArrTitle[currentIndexTitle];
                currentIndexTitle++;
            } else clearInterval(intervalTitle)
        }, 100)
    }, 800)
    setTimeout(function () {
        const mewmew = document.querySelector("#mewmew");
        if (mewmew) mewmew.classList.add("animationOp");
    }, 1000)
    setTimeout(function () {
        intervalContent = setInterval(function () {
            if (currentIndexLetter < datatxtletter.length) {
                if (datatxtletter[currentIndexLetter] === "<") {
                    let tagEnd = datatxtletter.indexOf(">", currentIndexLetter);
                    if (tagEnd !== -1) { text__letter.innerHTML += datatxtletter.substring(currentIndexLetter, tagEnd + 1); currentIndexLetter = tagEnd + 1; }
                    else { text__letter.innerHTML += datatxtletter[currentIndexLetter]; currentIndexLetter++; }
                } else { text__letter.innerHTML += datatxtletter[currentIndexLetter]; currentIndexLetter++; }
            } else { clearInterval(intervalContent); $("#btn__start_container").addClass("show"); }
        }, 50)
    }, 1500)
})

$(".close").on("click", function () {
    clearInterval(intervalContent);
    clearInterval(intervalTitle);
    clearInterval(fireworkTimer);
    clearInterval(jumpInterval);
    clearInterval(heartGiftInterval);   // Dừng tim/quà bay
    canvas.style.display = 'none';
    particles = []; rockets = [];
    document.querySelector(".title__letter").textContent = "";
    text__letter.textContent = "";
    currentIndexLetter = 0; currentIndexTitle = 0;
    const mewmew = document.querySelector("#mewmew"); if (mewmew) mewmew.classList.remove("animationOp");
    $("#btn__start_container").removeClass("show"); $("#btn__start").show();
    $("#image-jump-container").empty();
    $(".box__letter").fadeOut();
    $(".letter__border").slideUp();
})

// Biến toàn cục cho ảnh bay
let jumpInterval;
let heartGiftInterval;   // interval cho tim và quà

// Hàm tạo trái tim và quà bay lên (cùng kiểu ảnh)
function createHeartGiftRain() {
    const container = document.getElementById('image-jump-container');
    const items = ['❤️', '🎁', '💝', '💖', '🎀', '✨'];  // kết hợp tim và quà

    heartGiftInterval = setInterval(() => {
        // Tạo 2-3 phần tử mỗi lần để dày đặc hơn
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            const emoji = items[Math.floor(Math.random() * items.length)];
            div.textContent = emoji;
            div.style.position = 'absolute';
            div.style.bottom = '-50px';
            div.style.fontSize = (30 + Math.random() * 40) + 'px';
            div.style.filter = 'drop-shadow(0 0 8px rgba(255,215,0,0.8))';
            div.style.pointerEvents = 'none';
            div.style.zIndex = '302';
            
            // Sử dụng cùng animation và biến CSS như ảnh
            const startX = Math.random() * 80 + 10; // 10-90%
            const endX = startX + (Math.random() * 40 - 20);
            const duration = Math.random() * 3 + 5; // 5-8s
            const midRot = Math.random() * 720 - 360;
            const endRot = midRot + (Math.random() * 720 - 360);

            div.style.setProperty('--start-x', startX + '%');
            div.style.setProperty('--end-x', endX + '%');
            div.style.setProperty('--mid-rot', midRot + 'deg');
            div.style.setProperty('--end-rot', endRot + 'deg');
            div.style.animation = `jumpAnimation ${duration}s forwards linear`;

            container.appendChild(div);
            
            setTimeout(() => { div.remove(); }, duration * 1000);
        }
    }, 400); // tần suất
}

$("#btn__start").on("click", function () {
    // Đóng lá thư
    clearInterval(intervalContent);
    clearInterval(intervalTitle);
    $(".box__letter").fadeOut(300);
    $(".letter__border").slideUp(300);
    
    // Ẩn nút Start
    $(this).fadeOut();
    
    // Khởi động tim và quà bay
    createHeartGiftRain();
    
    // Khởi động ảnh bay (giữ nguyên)
    const container = $("#image-jump-container");
    const maxImages = 32;

    jumpInterval = setInterval(() => {
        const randomImgIndex = Math.floor(Math.random() * maxImages) + 1;
        const img = document.createElement('img');
        img.src = `./img/Anh (${randomImgIndex}).jpg`;
        img.className = 'jumping-image';
        img.dataset.index = randomImgIndex;
        img.style.pointerEvents = 'auto';
        img.style.cursor = 'pointer';

        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = parseInt(this.dataset.index);
            if (typeof window.openGallery === 'function') {
                window.openGallery(index);
            }
        });

        const startX = Math.random() * 80 + 10;
        const endX = startX + (Math.random() * 40 - 20);
        const duration = Math.random() * 3 + 6;
        const midRot = Math.random() * 720 - 360;
        const endRot = midRot + (Math.random() * 720 - 360);

        img.style.setProperty('--start-x', startX + '%');
        img.style.setProperty('--end-x', endX + '%');
        img.style.setProperty('--mid-rot', midRot + 'deg');
        img.style.setProperty('--end-rot', endRot + 'deg');
        img.style.animation = `jumpAnimation ${duration}s forwards linear`;

        container.append(img);
        setTimeout(() => { img.remove(); }, duration * 1000);
    }, 600);
});

// Mobile helpers
function mobile() {
    const app = {
        timeout: function (txt, dom) {
            let currentIndex = 0;
            let charArr = txt.split('');
            intervalMobile = setInterval(function () {
                if (currentIndex < charArr.length) { dom.textContent += charArr[currentIndex]; currentIndex++; }
                else clearInterval(intervalMobile)
            }, 200)
        }
    }
    return app
}
const fcMobile = mobile();

// Slideshow
const imageContainer = document.querySelector('.image');
function initSlideshow() {
    imageContainer.innerHTML = '';
    for (let i = 1; i <= 32; i++) {
        const img = document.createElement('img');
        img.src = `./img/Anh (${i}).jpg`;
        img.alt = `Birthday Image ${i}`;
        if (i === 1) img.classList.add('active');
        imageContainer.appendChild(img);
    }
    let currentImgIndex = 0;
    const images = imageContainer.querySelectorAll('img');
    if (images.length > 0) {
        setInterval(() => {
            images[currentImgIndex].classList.remove('active');
            currentImgIndex = (currentImgIndex + 1) % images.length;
            images[currentImgIndex].classList.add('active');
        }, 3000);
    }
}
document.addEventListener('DOMContentLoaded', initSlideshow);

// ========== GALLERY SYSTEM ==========
let currentGalleryIndex = 1;
const totalImages = 32;
const emotionFallContainer = document.getElementById('emotion-fall-container') || (() => {
    const div = document.createElement('div'); div.id = 'emotion-fall-container'; document.body.appendChild(div); return div;
})();
const emotions = ['❤️', '😍', '🥰', '😘', '🎉', '✨', '🌟', '💖', '💕', '💗', '🌸', '🎂'];

function createGalleryViewer() {
    const viewer = document.createElement('div'); viewer.id = 'gallery-viewer';
    viewer.innerHTML = `
        <div class="gallery-main">
            <img id="gallery-image" src="" alt="Gallery Image">
            <button class="gallery-nav" id="gallery-prev">❮</button>
            <button class="gallery-nav" id="gallery-next">❯</button>
            <button class="gallery-close" id="gallery-close">✕</button>
            <div class="emotion-bar" id="emotion-bar">
                ${emotions.slice(0, 6).map(emoji => `<span class="emotion-icon" data-emoji="${emoji}">${emoji}</span>`).join('')}
            </div>
            <div class="thumbnail-strip" id="thumbnail-strip"></div>
        </div>
    `;
    document.body.appendChild(viewer);
    const strip = document.getElementById('thumbnail-strip');
    for (let i = 1; i <= totalImages; i++) {
        const thumb = document.createElement('img');
        thumb.src = `./img/Anh (${i}).jpg`;
        thumb.className = 'thumbnail' + (i === 1 ? ' active' : ''); thumb.dataset.index = i;
        thumb.addEventListener('click', () => { currentGalleryIndex = i; updateGalleryImage(); });
        strip.appendChild(thumb);
    }
    document.getElementById('gallery-close').addEventListener('click', closeGallery);
    document.getElementById('gallery-prev').addEventListener('click', () => { currentGalleryIndex = currentGalleryIndex > 1 ? currentGalleryIndex - 1 : totalImages; updateGalleryImage(); });
    document.getElementById('gallery-next').addEventListener('click', () => { currentGalleryIndex = currentGalleryIndex < totalImages ? currentGalleryIndex + 1 : 1; updateGalleryImage(); });
    document.querySelectorAll('.emotion-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            const emoji = this.dataset.emoji;
            createFallingEmotion(emoji, e.clientX, e.clientY);
            const clickCount = parseInt(this.dataset.clickCount || '0') + 1; this.dataset.clickCount = clickCount;
            if (clickCount >= 3) {
                for (let i = 0; i < 20; i++) { setTimeout(() => { createFallingEmotion(emoji, Math.random() * window.innerWidth, -50 - Math.random() * 200); }, i * 30); }
                this.dataset.clickCount = '0';
            }
            clearTimeout(this.clickTimeout);
            this.clickTimeout = setTimeout(() => { this.dataset.clickCount = '0'; }, 500);
        });
    });
    document.addEventListener('keydown', handleGalleryKeydown);
    return viewer;
}

function createFallingEmotion(emoji, x, y) {
    const emotion = document.createElement('div'); emotion.className = 'falling-emotion'; emotion.textContent = emoji;
    const size = Math.random() * 20 + 25; const duration = Math.random() * 3 + 4;
    emotion.style.left = (x !== undefined ? x : Math.random() * window.innerWidth) + 'px';
    emotion.style.top = (y !== undefined ? y : -50) + 'px';
    emotion.style.fontSize = size + 'px'; emotion.style.animationDuration = duration + 's';
    emotion.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
    emotionFallContainer.appendChild(emotion);
    setTimeout(() => { emotion.remove(); }, duration * 1000);
}

function rainEmotions(emoji, count = 50) {
    for (let i = 0; i < count; i++) { setTimeout(() => { createFallingEmotion(emoji, Math.random() * window.innerWidth, -50 - Math.random() * 300); }, i * 50); }
}

function updateGalleryImage() {
    const galleryImage = document.getElementById('gallery-image');
    if (galleryImage) galleryImage.src = `./img/Anh (${currentGalleryIndex}).jpg`;
    document.querySelectorAll('.thumbnail').forEach((thumb, idx) => { thumb.classList.toggle('active', idx + 1 === currentGalleryIndex); });
}

function openGallery(startIndex = 1) {
    let viewer = document.getElementById('gallery-viewer'); if (!viewer) viewer = createGalleryViewer();
    currentGalleryIndex = startIndex; updateGalleryImage(); viewer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const viewer = document.getElementById('gallery-viewer'); if (viewer) viewer.style.display = 'none';
    emotionFallContainer.innerHTML = ''; document.body.style.overflow = '';
}

function handleGalleryKeydown(e) {
    const viewer = document.getElementById('gallery-viewer'); if (!viewer || viewer.style.display !== 'flex') return;
    if (e.key === 'ArrowLeft') { currentGalleryIndex = currentGalleryIndex > 1 ? currentGalleryIndex - 1 : totalImages; updateGalleryImage(); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { currentGalleryIndex = currentGalleryIndex < totalImages ? currentGalleryIndex + 1 : 1; updateGalleryImage(); e.preventDefault(); }
    else if (e.key === 'Escape') { closeGallery(); e.preventDefault(); }
}

function makeImageClickable() {
    const imageBox = document.querySelector('.box__account .image'); if (!imageBox) return;
    imageBox.style.cursor = 'pointer';
    imageBox.addEventListener('click', () => {
        const activeImg = imageBox.querySelector('img.active'); let index = 1;
        if (activeImg) { const match = activeImg.src.match(/Anh \((\d+)\)\.jpg/); if (match) index = parseInt(match[1]); }
        openGallery(index);
    });
}

document.addEventListener('DOMContentLoaded', function() { setTimeout(() => { makeImageClickable(); }, 500); });
document.addEventListener('click', function(e) { if (e.target.classList.contains('emotion-icon') && e.detail === 2) rainEmotions(e.target.dataset.emoji, 40); });
let touchStartTime;
document.addEventListener('touchstart', function(e) { if (e.target.classList.contains('emotion-icon')) touchStartTime = Date.now(); });
document.addEventListener('touchend', function(e) { if (e.target.classList.contains('emotion-icon') && Date.now() - touchStartTime > 500) rainEmotions(e.target.dataset.emoji, 30); });

window.openGallery = openGallery;
window.rainEmotions = rainEmotions;
