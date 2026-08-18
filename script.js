/* ================================= */
/* CAMBIO DE PANTALLAS */
/* ================================= */

const screens = {
    intro: document.getElementById("intro"),
    guide: document.getElementById("guide"),
    universe: document.getElementById("universe"),
    finish: document.getElementById("finish"),
    letter: document.getElementById("letter")
};


function showScreen(screenName) {

    Object.values(screens).forEach(screen => {
        screen.classList.remove("active");
    });

    screens[screenName].classList.add("active");
}


/* ================================= */
/* MÚSICA */
/* ================================= */

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;


function startMusic() {

    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.volume = 0.35;

    const promise = backgroundMusic.play();

    if (promise !== undefined) {

        promise
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "♫";

            })
            .catch(() => {

                console.log(
                    "La música necesita interacción del usuario."
                );

            });

    }
}


musicButton.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        backgroundMusic
            .play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "♫";

            })
            .catch(() => {

                console.log(
                    "No se pudo reproducir la música."
                );

            });

    } else {

        backgroundMusic.pause();

        musicPlaying = false;

        musicButton.textContent = "♪";

    }

});


/* ================================= */
/* BOTÓN COMENZAR */
/* ================================= */

const startButton =
    document.getElementById("startBtn");


startButton.addEventListener("click", () => {

    startMusic();

    showScreen("guide");

});


/* ================================= */
/* BOTÓN DE GUÍA */
/* ================================= */

const guideButton =
    document.getElementById("guideBtn");


guideButton.addEventListener("click", () => {

    showScreen("universe");

});


/* ================================= */
/* MENSAJES DE LAS ESTRELLAS */
/* ================================= */

const messages = {

    gracias: {

        title: "Gracias",

        text:
            "Gracias por haber llegado a mi vida de una manera que jamás imaginé."

    },


    admiracion: {

        title: "Admiración",

        text:
            "Hay muchas cosas de ti que admiro, pero algunas de ellas son lo valiente que eres y el corazón tan bonito que tienes."

    },


    recuerdo: {

        title: "Recuerdo",

        text:
            "Hay momentos contigo que pueden parecer algo normal, pero recordar cuando nos reíamos y tú bailabas siempre será un momento especial."

    },


    deseo: {

        title: "Deseo",

        text:
            "Seguir construyendo los dos algo bonito y único, sincero y sin prisas, a nuestro ritmo."

    },


    futuro: {

        title: "Futuro",

        text:
            "Créeme que hablar contigo de ser padres en un futuro nunca me dio miedo y ahí me di cuenta de que contigo no tengo miedo a nada, porque me demostraste ser alguien muy valiosa para mí."

    }

};


/* ================================= */
/* ELEMENTOS DEL MODAL */
/* ================================= */

const stars =
    document.querySelectorAll(".star");

const messageModal =
    document.getElementById("messageModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalStar =
    document.getElementById("modalStar");

const closeModal =
    document.getElementById("closeModal");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");


let discoveredStars = new Set();


/* ================================= */
/* ABRIR ESTRELLA */
/* ================================= */

stars.forEach(star => {

    star.addEventListener("click", () => {

        const key =
            star.dataset.message;

        const message =
            messages[key];

        if (!message) {
            return;
        }


        /* Guardamos la estrella */

        discoveredStars.add(key);

        star.classList.add("discovered");


        /* Cambiamos el contenido */

        modalTitle.textContent =
            message.title;

        modalText.textContent =
            message.text;


        /* Mostramos estrella */

        modalStar.textContent = "★";


        /* Abrimos modal */

        messageModal.classList.remove("hidden");


        /* Actualizamos contador */

        updateProgress();


        /* Si encontró las cinco */

        if (discoveredStars.size === 5) {

            setTimeout(() => {

                showFinishButton();

            }, 500);

        }

    });

});


/* ================================= */
/* CERRAR MODAL */
/* ================================= */

closeModal.addEventListener("click", () => {

    messageModal.classList.add("hidden");

});


messageModal.addEventListener("click", event => {

    if (event.target === messageModal) {

        messageModal.classList.add("hidden");

    }

});


/* ================================= */
/* ACTUALIZAR PROGRESO */
/* ================================= */

function updateProgress() {

    const total = 5;

    const current =
        discoveredStars.size;

    progressText.textContent =
        `${current} / ${total}`;

    progressFill.style.width =
        `${(current / total) * 100}%`;

}


/* ================================= */
/* BOTÓN FINAL */
/* ================================= */

function showFinishButton() {

    const existing =
        document.getElementById("finalDiscoverButton");

    if (existing) {
        return;
    }


    const button =
        document.createElement("button");

    button.id =
        "finalDiscoverButton";

    button.className =
        "main-button";

    button.textContent =
        "He descubierto todo";


    button.style.position = "absolute";

    button.style.bottom = "75px";

    button.style.left = "50%";

    button.style.transform =
        "translateX(-50%)";

    button.style.zIndex = "100";


    button.addEventListener("click", () => {

        showScreen("finish");

    });


    screens.universe.appendChild(button);

}


/* ================================= */
/* CONTINUAR HACIA LA CARTA */
/* ================================= */

const finishButton =
    document.getElementById("finishBtn");


finishButton.addEventListener("click", () => {

    showScreen("letter");

    startLetter();

});


/* ================================= */
/* CARTA FINAL */
/* ================================= */

const letterText =
    document.getElementById("letterText");

const signature =
    document.getElementById("signature");


const finalLetter =

`No sé si alguna vez te he dicho todo esto de la manera correcta.

A veces siento muchísimo y no siempre sé cómo expresarlo sin decir demasiado. Pero hay algo que sí tengo claro: me alegra haberte conocido.

Me alegra cada conversación, cada risa, cada momento que hemos compartido, porque de alguna manera consiguen que mis dias sean mejores.

No hice esto para pedirte nada.

Tampoco para apresurar lo que estamos viviendo.

Solo quería regalarte un pequeño momento y recordarte que, incluso cuando las cosas no son perfectas, hay alguien aquí que valora muchísimo tenerte en su vida.

Y si algún día volvemos a mirar atrás y recordamos esta etapa, espero que podamos sonreír pensando en todo lo que fuimos construyendo poco a poco.

Sin presión.

A nuestro ritmo.

Y quién sabe...

quizás algún día podamos estar viendo esto juntos, sentados uno al lado del otro, y reírnos de lo cursi que era.`;


/* ================================= */
/* EFECTO DE ESCRITURA */
/* ================================= */

let letterStarted = false;


function startLetter() {

    if (letterStarted) {
        return;
    }

    letterStarted = true;


    letterText.textContent = "";

    signature.classList.add("hidden");


    let index = 0;


    function writeCharacter() {

        if (index < finalLetter.length) {

            letterText.textContent +=
                finalLetter.charAt(index);

            index++;

            setTimeout(
                writeCharacter,
                24
            );

        } else {

            setTimeout(() => {

                signature.classList.remove("hidden");

            }, 600);

        }

    }


    writeCharacter();

}


/* ================================= */
/* PREVENIR ZOOM ACCIDENTAL */
/* ================================= */

let lastTouchEnd = 0;


document.addEventListener(
    "touchend",
    event => {

        const now =
            Date.now();

        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();

        }

        lastTouchEnd = now;

    },
    false
);
