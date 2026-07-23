// ============================
// VARIABLES
// ============================

const welcome = document.getElementById("welcome");
const heartSection = document.getElementById("heartSection");
const letterSection = document.getElementById("letterSection");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const music = document.getElementById("bgMusic");

// ============================
// MÚSICA
// ============================

music.volume = 0.45;

// ============================
// COMENZAR
// ============================

startBtn.addEventListener("click", () => {

    music.play().catch(()=>{});

    welcome.classList.remove("active");

    heartSection.classList.add("active");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});
// ============================
// CONTINUAR
// ============================

continueBtn.addEventListener("click", () => {

    heartSection.classList.remove("active");

    letterSection.classList.add("active");
    
    typeLetter();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// ============================
// EFECTO FRASES
// ============================

const phrases = document.querySelectorAll(".phrase");

phrases.forEach((phrase, index)=>{

    phrase.style.opacity = "0";

    phrase.style.transform += " scale(.8)";

    setTimeout(()=>{

        phrase.style.transition =
        "all .8s ease";

        phrase.style.opacity = "1";

        phrase.style.transform =
        phrase.style.transform.replace(" scale(.8)","") + " scale(1)";

    }, index * 180);

});
// ============================
// ANIMACIÓN SUAVE DEL CORAZÓN
// ============================

const heart = document.getElementById("heart");

let angle = 0;

function animateHeart() {

    angle += 0.02;

    const scale = 1 + Math.sin(angle) * 0.04;

    heart.style.transform =
        `rotate(-45deg) scale(${scale})`;

    requestAnimationFrame(animateHeart);
}

animateHeart();

// ============================
// ROSAS FLOTANDO
// ============================

function createRose() {

    const rose = document.createElement("div");

    rose.innerHTML = "🌹";

    rose.style.position = "fixed";
    rose.style.left = Math.random() * window.innerWidth + "px";
    rose.style.top = "-40px";

    rose.style.fontSize =
        (20 + Math.random() * 20) + "px";

    rose.style.opacity = "0.8";
    rose.style.pointerEvents = "none";
    rose.style.zIndex = "999";

    document.body.appendChild(rose);

    let y = -40;

    const speed = 1 + Math.random() * 2;

    function fall() {

        y += speed;

        rose.style.top = y + "px";

        if (y < window.innerHeight + 50) {

            requestAnimationFrame(fall);

        } else {

            rose.remove();

        }
    }

    fall();
}

setInterval(createRose, 1800);
// ============================
// CARTA QUE SE ESCRIBE
// ============================

const letterText = `

Te agradezco por el cariño que me das cada día.

Gracias por confiar en mí.

Perdón por las veces que he cometido errores.

Prometo seguir mejorando por nosotros.

Nunca dejaré de agradecerle a Dios por haberte conocido.

No soy bueno con las palabras pero siempre doy mi mejor esfuerzo para demostrar mi cariño hacia ti.

Eres una bendición enorme en mi vida.

Oro por nosotros todos los días.

Quiero ser quien esté a tu lado para ver como cumples tus metas y sueños.

Gracias por existir.

`;

const typingContainer = document.getElementById("typingLetter");

const finalMessage = document.getElementById("finalMessage");

let writing = false;
// ============================
// EFECTO MÁQUINA DE ESCRIBIR
// ============================

function typeLetter() {

    if (writing) return;

    writing = true;

    typingContainer.innerHTML = "";

    finalMessage.innerHTML = "";

    let i = 0;

    function write() {

        if (i < letterText.length) {

            const char = letterText.charAt(i);

            if (char === "\n") {

                typingContainer.innerHTML += "<br>";

            } else {

                typingContainer.innerHTML += char;

            }

            i++;

            setTimeout(write, 28);

        } else {

            setTimeout(() => {

                finalMessage.innerHTML = "❤️ Te quiero muchísimo ❤️";

            }, 700);

        }

    }

    write();

}
