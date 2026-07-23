//=========================================
// ELEMENTOS
//=========================================

const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const startBtn = document.getElementById("startBtn");

const music = document.getElementById("music");

const heartCanvas = document.getElementById("heartCanvas");
const ctx = heartCanvas.getContext("2d");

const phrasesContainer = document.getElementById("phrases");

const petals = document.getElementById("petals");

const letterContainer = document.getElementById("letterContainer");
const letterText = document.getElementById("letterText");

//=========================================
// AJUSTAR TAMAÑO
//=========================================

function resizeHeart(){

heartCanvas.width = 260;
heartCanvas.height = 260;

}

resizeHeart();

window.addEventListener("resize",resizeHeart);

//=========================================
// FRASES
//=========================================

const phrases=[

"❤️ Mi futura esposa",

"💍 Nuestro futuro juntos",

"💙 Mi prioridad",

"🌸 Mi lugar favorito eres tú",

"✨ Mi estrella",

"🥹 Gracias por existir",

"💖 Me haces muy feliz",

"🤍 Siempre contigo",

"🌹 Eres un regalo de Dios",

"💫 Contigo todo es mejor",

"🌙 Siempre pienso en ti",

"❤️ Te quiero muchísimo"

];

//=========================================
// CARTA
//=========================================

const carta=`Te agradezco por el cariño que me das cada día.

Gracias por confiar en mí.

Perdón por las veces que he cometido errores.

Prometo seguir mejorando por nosotros.

Quiero estar contigo en cada uno de tus sueños.

Gracias por hacerme tan feliz.

Mi futura esposa ❤️

Te quiero muchísimo ❤️`;
//=========================================
// CORAZÓN DE PARTÍCULAS
//=========================================

const particles = [];

const CENTER_X = 130;
const CENTER_Y = 130;

let scale = 1;
let direction = 1;

for(let i=0;i<2200;i++){

    const t = Math.random()*Math.PI*2;

    const x = 16*Math.pow(Math.sin(t),3);

    const y =
    13*Math.cos(t)
    -
    5*Math.cos(2*t)
    -
    2*Math.cos(3*t)
    -
    Math.cos(4*t);

    particles.push({

        x:CENTER_X,

        y:CENTER_Y,

        tx:CENTER_X+x*8,

        ty:CENTER_Y-y*8,

        r:Math.random()*1.8+0.5,

        alpha:0,

        phase:Math.random()*Math.PI*2

    });

}

function heartbeat(){

    if(direction===1){

        scale+=0.0015;

        if(scale>=1.08){

            direction=-1;

        }

    }else{

        scale-=0.0015;

        if(scale<=1){

            direction=1;

        }

    }

}

function drawHeart(){

    ctx.clearRect(0,0,260,260);

    heartbeat();

    for(const p of particles){

        p.x += (p.tx-p.x)*0.05;
        p.y += (p.ty-p.y)*0.05;

        p.alpha = Math.min(1,p.alpha+0.02);

        const dx=(p.x-CENTER_X)*scale;
        const dy=(p.y-CENTER_Y)*scale;

        const glow=1+Math.sin(Date.now()*0.003+p.phase);

        ctx.beginPath();

        ctx.arc(

            CENTER_X+dx,

            CENTER_Y+dy,

            p.r+glow*0.2,

            0,

            Math.PI*2

        );

        ctx.fillStyle=`rgba(90,220,255,${p.alpha})`;

        ctx.shadowBlur=20;

        ctx.shadowColor="#64dfff";

        ctx.fill();

    }

    requestAnimationFrame(drawHeart);

}
//=========================================
// COMENZAR
//=========================================

const posiciones=[

{x:50,y:8},

{x:34,y:18},
{x:66,y:18},

{x:24,y:32},
{x:76,y:32},

{x:18,y:50},
{x:82,y:50},

{x:24,y:68},
{x:76,y:68},

{x:34,y:82},
{x:66,y:82},

{x:50,y:92}

];

startBtn.addEventListener("click",()=>{

music.volume=0.25;

music.play().catch(()=>{});

intro.style.display="none";

scene.style.display="block";

drawHeart();

showPhrases();

setTimeout(()=>{

explodeHeart();

},9000);

});

//=========================================
// FRASES
//=========================================

function showPhrases(){

phrases.forEach((text,index)=>{

const div=document.createElement("div");

div.className="phrase";

div.innerHTML=text;

div.style.left=posiciones[index].x+"%";

div.style.top=posiciones[index].y+"%";

phrasesContainer.appendChild(div);

setTimeout(()=>{

div.style.opacity=1;

},index*400);

});

}
//=========================================
// EXPLOSIÓN
//=========================================

function explodeHeart(){

document.getElementById("heartContainer").animate([

{

transform:"translate(-50%,-50%) scale(1)",

opacity:1

},

{

transform:"translate(-50%,-50%) scale(2.6)",

opacity:0

}

],{

duration:1200,

fill:"forwards",

easing:"ease-out"

});

document.querySelectorAll(".phrase").forEach((p,i)=>{

p.animate([

{

opacity:1,

transform:"translate(-50%,-50%) scale(1)"

},

{

opacity:0,

transform:`
translate(
${Math.random()*700-350}px,
${Math.random()*700-350}px
)
scale(.25)
`

}

],{

duration:1400,

delay:i*30,

fill:"forwards",

easing:"ease-out"

});

});

setTimeout(()=>{

showLetter();

},1500);

}

//=========================================
// CARTA
//=========================================

function showLetter(){

letterContainer.style.display="flex";

let i=0;

letterText.innerHTML="";

function type(){

if(i<carta.length){

letterText.innerHTML+=carta.charAt(i);

i++;

setTimeout(type,28);

}

}

type();

startPetals();

}
//=========================================
// PÉTALOS
//=========================================

let petalsRunning=false;

function startPetals(){

if(petalsRunning) return;

petalsRunning=true;

const flowers=["🌹","🌸","🌺"];

setInterval(()=>{

const petal=document.createElement("div");

petal.className="petal";

petal.innerHTML=flowers[Math.floor(Math.random()*flowers.length)];

petal.style.left=Math.random()*100+"vw";

petal.style.fontSize=(16+Math.random()*10)+"px";

petal.style.animationDuration=(7+Math.random()*4)+"s";

petals.appendChild(petal);

setTimeout(()=>{

petal.remove();

},12000);

},900);

}

//=========================================
// ESTRELLAS
//=========================================

const stars=document.getElementById("stars");

for(let i=0;i<120;i++){

const s=document.createElement("div");

s.className="star";

const size=Math.random()*3+1;

s.style.width=size+"px";
s.style.height=size+"px";

s.style.left=Math.random()*100+"%";
s.style.top=Math.random()*100+"%";

s.style.animationDelay=Math.random()*3+"s";

stars.appendChild(s);

}

//=========================================
// ESTRELLAS FUGACES
//=========================================

const shooting=document.getElementById("shootingStars");

setInterval(()=>{

const st=document.createElement("div");

st.className="shooting";

st.style.left=Math.random()*70+"vw";
st.style.top=Math.random()*20+"vh";

shooting.appendChild(st);

setTimeout(()=>{

st.remove();

},2500);

},3500);