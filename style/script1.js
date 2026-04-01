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

// Logic to start everything after clicking the gift
function startEverything() {
    music.currentTime = 0; // Start music from the beginning
    music.play().then(() => {
        console.log("Music started successfully 🎶");
    }).catch(e => {
        console.log("Music play blocked or failed:", e);
    });

    // Typing date of birth
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

    // Mobile specific typing
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
    const sakuraCount = 50; // Total number of petals

    for (let i = 0; i < sakuraCount; i++) {
        createSakura(container);
    }
}

function createSakura(container) {
    const sakura = document.createElement('img');
    sakura.src = './style/material/sakura.png';
    sakura.className = 'sakura';

    // Random properties
    const left = Math.random() * 100; // 0-100%
    const size = Math.random() * 20 + 10; // 10-30px
    const duration = Math.random() * 5 + 5; // 5-10s
    const delay = Math.random() * 10; // 0-10s

    sakura.style.left = left + '%';
    sakura.style.width = size + 'px';
    sakura.style.height = 'auto';
    sakura.style.animationDuration = duration + 's';
    sakura.style.animationDelay = delay + 's';

    container.appendChild(sakura);
}

// Gift Box Click Handler
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
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: - (Math.random() * 3 + 7)
        };
        this.alive = true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.y <= this.targetY) {
            this.alive = false;
            explode(this.x, this.y);
        }
    }
}

class Particle {
    constructor(x, y, color, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.friction = 0.96; // Slightly less friction for longer spread
        this.gravity = 0.15;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.012; // Slower fade for larger radius
    }
}

function explode(x, y) {
    const count = 120; // More particles for bigger effect
    const baseHue = Math.random() * 360;

    for (let i = 0; i < count; i++) {
        // Multi-colored explosion
        const hue = (baseHue + Math.random() * 100) % 360;
        const color = `hsl(${hue}, 100%, 60%)`;

        // Circular expansion with randomized speed for "wider" effect
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 2; // Up to 17 initial velocity

        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };

        particles.push(new Particle(x, y, color, velocity));
    }
}

function animateFireworks() {
    if (document.getElementById('fireworks').style.display === 'none') return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rockets.forEach((rocket, index) => {
        rocket.update();
        rocket.draw();
        if (!rocket.alive) {
            rockets.splice(index, 1);
        }
    });

    particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
            particle.update();
            particle.draw();
        } else {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    canvas.style.display = 'block';
    animateFireworks();
    fireworkTimer = setInterval(() => {
        if (rockets.length < 5) {
            rockets.push(new Rocket());
        }
    }, 400);
}

$("#btn__letter").on("click", function () {
    $(".box__letter").fadeIn(300)
    startFireworks(); // Trigger fireworks
    setTimeout(function () {
        $(".letter__border").slideDown(500);
    }, 300)
    setTimeout(function () {
        intervalTitle = setInterval(function () {
            if (currentIndexTitle < charArrTitle.length) {
                document.querySelector(".title__letter").textContent += charArrTitle[currentIndexTitle];
                let i = document.createElement("i");
                document.querySelector(".title__letter").appendChild(i)
                currentIndexTitle++;
            }
            else {
                clearInterval(intervalTitle)
            }
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
                    if (tagEnd !== -1) {
                        text__letter.innerHTML += datatxtletter.substring(currentIndexLetter, tagEnd + 1);
                        currentIndexLetter = tagEnd + 1;
                    } else {
                        text__letter.innerHTML += datatxtletter[currentIndexLetter];
                        currentIndexLetter++;
                    }
                } else {
                    text__letter.innerHTML += datatxtletter[currentIndexLetter];
                    currentIndexLetter++;
                }
            }
            else {
                clearInterval(intervalContent);
                $("#btn__start_container").addClass("show");
            }
        }, 50)
    }, 1500)
})

$(".close").on("click", function () {
    clearInterval(intervalContent);
    clearInterval(intervalTitle);
    clearInterval(fireworkTimer); // Stop firework generator
    clearInterval(jumpInterval); // Stop image jumping
    canvas.style.display = 'none'; // Hide fireworks
    particles = []; // Clear particles
    rockets = []; // Clear rockets
    document.querySelector(".title__letter").textContent = "";
    text__letter.textContent = "";
    currentIndexLetter = 0;
    currentIndexTitle = 0;
    currentJumpImageIndex = 1;

    const mewmew = document.querySelector("#mewmew");
    if (mewmew) mewmew.classList.remove("animationOp");

    $("#btn__start_container").removeClass("show");
    $("#btn__start").show();
    $("#image-jump-container").empty();
    $(".box__letter").fadeOut();
    $(".letter__border").slideUp();
})

// Image Jump Logic
let jumpInterval;
$("#btn__start").on("click", function () {
    $(this).fadeOut(); // Hide button after click
    const container = $("#image-jump-container");
    const maxImages = 32;

    jumpInterval = setInterval(() => {
        // Pick a random image each time
        const randomImgIndex = Math.floor(Math.random() * maxImages) + 1;
        const img = document.createElement('img');
        img.src = `./style/img/Anh (${randomImgIndex}).jpg`;
        img.className = 'jumping-image';

        // Random properties for animation
        const startX = Math.random() * 80 + 10; // 10% to 90%
        const endX = startX + (Math.random() * 40 - 20); // Move -20% to +20%
        const duration = Math.random() * 3 + 6; // 6-9s (Slower)
        const midRot = Math.random() * 720 - 360;
        const endRot = midRot + (Math.random() * 720 - 360);

        img.style.setProperty('--start-x', startX + '%');
        img.style.setProperty('--end-x', endX + '%');
        img.style.setProperty('--mid-rot', midRot + 'deg');
        img.style.setProperty('--end-rot', endRot + 'deg');
        img.style.animation = `jumpAnimation ${duration}s forwards linear`;

        container.append(img);

        // Clean up DOM after animation
        setTimeout(() => {
            img.remove();
        }, duration * 1000);
    }, 600); // New image every 0.6s
});


//mobile

function mobile() {
    const app = {
        timeout: function (txt, dom) {
            let currentIndex = 0;
            let charArr = txt.split('')
            intervalMobile = setInterval(function () {
                if (currentIndex < charArr.length) {
                    dom.textContent += charArr[currentIndex];
                    currentIndex++;
                }
                else {
                    clearInterval(intervalMobile)
                }
            }, 200)
        }
    }
    return app
}
const fcMobile = mobile()

// Slideshow logic
const imageContainer = document.querySelector('.image');
function initSlideshow() {
    imageContainer.innerHTML = ''; // Clear existing
    for (let i = 1; i <= 32; i++) {
        const img = document.createElement('img');
        img.src = `./style/img/Anh (${i}).jpg`;
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
        }, 3000); // Change image every 3 seconds
    }
}

document.addEventListener('DOMContentLoaded', initSlideshow);
