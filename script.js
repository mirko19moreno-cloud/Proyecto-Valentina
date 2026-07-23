//=============================
// ELEMENTOS
//=============================

const intro = document.getElementById("intro");

const startBtn = document.getElementById("startBtn");

const heartSection = document.getElementById("heartSection");

const letterSection = document.getElementById("letterSection");

const music = document.getElementById("bgMusic");

const phrasesContainer = document.getElementById("phrases");

//=============================
// FRASES
//=============================

const frases=[

"❤️ Mi futura esposa",

"💙 Mi prioridad",

"🌸 Mi lugar favorito eres tú",

"✨ Mi estrella",

"🥹 Gracias por existir",

"💖 Me haces muy feliz",

"🤍 Siempre contigo",

"🌹 Eres un regalo de Dios",

"💫 Contigo todo es mejor",

"🌙 Siempre pienso en ti",

"❤️ Te quiero muchísimo",

"💍 Nuestro futuro juntos"

];

//=============================
// POSICIONES
//=============================

const posiciones=[

{x:50,y:10},

{x:34,y:18},
{x:66,y:18},

{x:23,y:35},
{x:77,y:35},

{x:16,y:52},
{x:84,y:52},

{x:23,y:70},
{x:77,y:70},

{x:34,y:86},
{x:66,y:86},

{x:50,y:95}

];

//=============================
// COMENZAR
//=============================

startBtn.addEventListener("click",()=>{

music.volume=.25;

music.play().catch(()=>{});

intro.style.display="none";

heartSection.style.display="flex";

showPhrases();

setTimeout(()=>{

explodeHeart();

},9000);

});

//=============================
// FRASES
//=============================

function showPhrases(){

frases.forEach((texto,i)=>{

const div=document.createElement("div");

div.className="phrase";

div.innerHTML=texto;

div.style.left=posiciones[i].x+"%";

div.style.top=posiciones[i].y+"%";

phrasesContainer.appendChild(div);

setTimeout(()=>{

div.style.opacity=1;

},i*400);

});

}
//=============================
// EXPLOSIÓN
//=============================

function explodeHeart(){

    const heart=document.getElementById("heart");

    heart.animate([
        {
            transform:"rotate(-45deg) scale(1)",
            opacity:1
        },
        {
            transform:"rotate(-45deg) scale(2.5)",
            opacity:0
        }
    ],{
        duration:1200,
        fill:"forwards",
        easing:"ease-out"
    });

    document.querySelectorAll(".phrase").forEach((frase,index)=>{

        frase.animate([
            {
                opacity:1,
                transform:"translate(-50%,-50%) scale(1)"
            },
            {
                opacity:0,
                transform:`translate(
                ${Math.random()*600-300}px,
                ${Math.random()*600-300}px)
                scale(.3)`
            }
        ],{
            duration:1300,
            delay:index*25,
            fill:"forwards",
            easing:"ease-out"
        });

    });

    setTimeout(()=>{

        showLetter();

    },1500);

}

//=============================
// CARTA
//=============================

function showLetter(){

    letterSection.style.display="flex";

}
//=============================
// ESTRELLAS
//=============================

const stars=document.getElementById("stars");

for(let i=0;i<130;i++){

    const star=document.createElement("div");

    star.className="star";

    const size=Math.random()*3+1;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.left=Math.random()*100+"%";
    star.style.top=Math.random()*100+"%";

    star.style.animationDelay=Math.random()*3+"s";

    stars.appendChild(star);

}

//=============================
// PÉTALOS
//=============================

let petalsStarted=false;

function startPetals(){

    if(petalsStarted) return;

    petalsStarted=true;

    const flowers=["🌹","🌸","🌺"];

    setInterval(()=>{

        const petal=document.createElement("div");

        petal.className="petal";

        petal.innerHTML=flowers[
            Math.floor(Math.random()*flowers.length)
        ];

        petal.style.left=Math.random()*100+"vw";

        petal.style.fontSize=
            (16+Math.random()*10)+"px";

        petal.style.animationDuration=
            (7+Math.random()*3)+"s";

        document.body.appendChild(petal);

        setTimeout(()=>{

            petal.remove();

        },11000);

    },850);

}

//=============================
// CUANDO APARECE LA CARTA
//=============================

const oldShowLetter=showLetter;

showLetter=function(){

    startPetals();

    oldShowLetter();

}
//=============================
// ESTRELLAS FUGACES
//=============================

const shootingContainer=document.createElement("div");

shootingContainer.id="shootingStars";

document.body.appendChild(shootingContainer);

function createShootingStar(){

    const star=document.createElement("div");

    star.className="shooting";

    star.style.left=Math.random()*70+"vw";

    star.style.top=Math.random()*20+"vh";

    shootingContainer.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2500);

}

setInterval(createShootingStar,3500);

//=============================
// OPTIMIZACIÓN iPHONE
//=============================

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        music.pause();

    }else{

        if(heartSection.style.display==="flex"){

            music.play().catch(()=>{});

        }

    }

});

//=============================
// PEQUEÑO EFECTO EN EL BOTÓN
//=============================

startBtn.addEventListener("touchstart",()=>{

    startBtn.style.transform="scale(.96)";

});

startBtn.addEventListener("touchend",()=>{

    startBtn.style.transform="scale(1)";

});
