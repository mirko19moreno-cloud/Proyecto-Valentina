//==============================
// CONFIGURACIÓN
//==============================

const music = document.getElementById("music");

const welcome = document.getElementById("welcome");
const heartScene = document.getElementById("heartScene");
const letterScene = document.getElementById("letterScene");

const startButton = document.getElementById("startButton");

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const heartCanvas = document.getElementById("heartCanvas");
const hctx = heartCanvas.getContext("2d");

const phrasesContainer = document.getElementById("phrases");

const letterText = document.getElementById("letterText");

//==============================
// FRASES
//==============================

const phrases=[

"❤️ Mi prioridad",
"✨ Eres mi paz",
"💖 Mi estrella",
"🌎 Mi lugar favorito eres tú",
"🥹 Gracias por existir",
"🤍 Siempre contigo",
"💕 Contigo me siento en paz",
"🌹 Te amo",
"💍 Nuestro futuro juntos",
"🫶 Mi persona favorita",
"💫 Eres mi hogar",
"❤️ Mi futura esposa",
"🌙 Siempre a tu lado",
"💖 Mi felicidad",
"✨ Mi sueño hecho realidad",
"❤️ Para siempre"

];

//==============================
// CARTA
//==============================

const letter = `

Te agradezco por el amor y cariño que me das cada día.

Por la confianza, la tranquilidad y la seguridad que me transmites.

Gracias por permitirme estar a tu lado y crear una relación tan bonita.

Perdón por las veces en que mis actitudes te hicieron sentir mal.

Estoy agradecido con Dios por cruzarte en mi camino.

Eres mi prioridad y siempre lo serás.

Créeme que todos los planes que imaginamos los vamos a cumplir juntos.

También quiero estar presente en cada uno de tus sueños y celebrarlos contigo.

Gracias por soportarme.

Gracias por elegirme.

Te quiero muchísimo amor mío ❤️

`;

//==============================
// TAMAÑOS
//==============================

function resize(){

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

heartCanvas.width=window.innerWidth;
heartCanvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

//==============================
// ESTRELLAS
//==============================

const stars=[];

for(let i=0;i<260;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+0.5,

a:Math.random()*Math.PI*2,

speed:Math.random()*0.02+0.005

});

}

function animateStars(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(const s of stars){

s.a+=s.speed;

const alpha=0.5+Math.sin(s.a)*0.5;

ctx.beginPath();

ctx.arc(s.x,s.y,s.r,0,Math.PI*2);

ctx.fillStyle=`rgba(255,255,255,${alpha})`;

ctx.shadowBlur=10;
ctx.shadowColor="#7be7ff";

ctx.fill();

}

requestAnimationFrame(animateStars);

}

animateStars();

//==============================
// BOTÓN
//==============================

startButton.onclick=()=>{

music.play().catch(()=>{});

welcome.classList.add("hidden");

setTimeout(()=>{

welcome.style.display="none";

heartScene.classList.add("show");

createHeart();

},1000);

};
//======================================
// CORAZÓN DE PARTÍCULAS
//======================================

const particles=[];

let scaleHeart=1;
let directionHeart=1;

function createHeart(){

particles.length=0;

const cx=heartCanvas.width/2;
const cy=heartCanvas.height/2;

for(let i=0;i<1600;i++){

const t=Math.random()*Math.PI*2;

const x=16*Math.pow(Math.sin(t),3);

const y=
13*Math.cos(t)
-
5*Math.cos(2*t)
-
2*Math.cos(3*t)
-
Math.cos(4*t);

particles.push({

x:cx,

y:cy,

tx:cx+x*18,

ty:cy-y*18,

r:Math.random()*2+0.5,

alpha:0

});

}

animateHeart();

setTimeout(showPhrases,2500);

}

//======================================
// LATIDO
//======================================

function heartbeat(){

if(directionHeart===1){

scaleHeart+=0.0018;

if(scaleHeart>=1.08){

directionHeart=-1;

}

}else{

scaleHeart-=0.0018;

if(scaleHeart<=1){

directionHeart=1;

}

}

}

//======================================
// DIBUJAR
//======================================

function animateHeart(){

hctx.clearRect(0,0,heartCanvas.width,heartCanvas.height);

heartbeat();

const cx=heartCanvas.width/2;
const cy=heartCanvas.height/2;

for(const p of particles){

p.x+=(p.tx-p.x)*0.05;
p.y+=(p.ty-p.y)*0.05;

p.alpha=Math.min(1,p.alpha+0.02);

const dx=(p.x-cx)*scaleHeart;
const dy=(p.y-cy)*scaleHeart;

hctx.beginPath();

hctx.arc(

cx+dx,

cy+dy,

p.r,

0,

Math.PI*2

);

hctx.fillStyle=`rgba(90,220,255,${p.alpha})`;

hctx.shadowColor="#7be7ff";

hctx.shadowBlur=20;

hctx.fill();

}

requestAnimationFrame(animateHeart);

}
//======================================
// FRASES ALREDEDOR DEL CORAZÓN
//======================================

function showPhrases(){

phrasesContainer.innerHTML="";

const positions=[

{x:50,y:16},
{x:36,y:22},
{x:64,y:22},
{x:27,y:34},
{x:73,y:34},
{x:20,y:50},
{x:80,y:50},
{x:27,y:66},
{x:73,y:66},
{x:36,y:78},
{x:64,y:78},
{x:45,y:88},
{x:55,y:88},
{x:42,y:45},
{x:58,y:45},
{x:50,y:58}

];

for(let i=0;i<phrases.length;i++){

const div=document.createElement("div");

div.className="phrase";

div.innerHTML=phrases[i];

div.style.left=positions[i].x+"%";
div.style.top=positions[i].y+"%";

phrasesContainer.appendChild(div);

setTimeout(()=>{

div.style.opacity=1;

},i*450);

}

setTimeout(()=>{

hidePhrases();

},9500);

}

//======================================
// DESAPARECER FRASES
//======================================

function hidePhrases(){

const all=document.querySelectorAll(".phrase");

all.forEach(f=>{

f.style.opacity=0;

});

setTimeout(()=>{

explodeHeart();

},1500);

}

//======================================
// EXPLOSIÓN
//======================================

function explodeHeart(){

for(const p of particles){

const angle=Math.random()*Math.PI*2;

const distance=800+Math.random()*800;

p.tx=p.x+Math.cos(angle)*distance;
p.ty=p.y+Math.sin(angle)*distance;

}

setTimeout(()=>{

heartScene.style.display="none";

showLetter();

},2500);

}
//======================================
// CARTA
//======================================

function showLetter(){

letterScene.style.display="flex";

letterText.innerHTML="";

let i=0;

function escribir(){

if(i<letter.length){

letterText.innerHTML+=letter.charAt(i);

i++;

setTimeout(escribir,35);

}else{

startPetals();

}

}

escribir();

}

//======================================
// PÉTALOS
//======================================

function startPetals(){

setInterval(()=>{

const petal=document.createElement("div");

petal.className="petal";

petal.innerHTML="🌹";

petal.style.left=Math.random()*100+"vw";

petal.style.animationDuration=(5+Math.random()*5)+"s";

petal.style.fontSize=(18+Math.random()*18)+"px";

document.getElementById("petals").appendChild(petal);

setTimeout(()=>{

petal.remove();

},10000);

},300);

}
//======================================
// ESTRELLAS FUGACES
//======================================

setInterval(()=>{

const star={

x:Math.random()*canvas.width,

y:-20,

vx:-8-Math.random()*4,

vy:8+Math.random()*4,

life:0

};

shootingStars.push(star);

},3500);

const shootingStars=[];

const oldAnimateStars=animateStars;

animateStars=function(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// Estrellas normales

for(const s of stars){

s.a+=s.speed;

const alpha=0.5+Math.sin(s.a)*0.5;

ctx.beginPath();

ctx.arc(s.x,s.y,s.r,0,Math.PI*2);

ctx.fillStyle=`rgba(255,255,255,${alpha})`;

ctx.shadowBlur=10;
ctx.shadowColor="#66d9ff";

ctx.fill();

}

// Estrellas fugaces

for(let i=shootingStars.length-1;i>=0;i--){

const st=shootingStars[i];

st.x+=st.vx;
st.y+=st.vy;

ctx.beginPath();

ctx.moveTo(st.x,st.y);

ctx.lineTo(

st.x+80,

st.y-80

);

ctx.strokeStyle="rgba(255,255,255,.8)";

ctx.lineWidth=2;

ctx.stroke();

st.life++;

if(st.life>35){

shootingStars.splice(i,1);

}

}

requestAnimationFrame(animateStars);

}

animateStars();


//======================================
// BRILLO SUAVE ALREDEDOR DEL CORAZÓN
//======================================

setInterval(()=>{

heartCanvas.style.filter="drop-shadow(0 0 25px #66d9ff)";

setTimeout(()=>{

heartCanvas.style.filter="drop-shadow(0 0 10px #66d9ff)";

},400);

},900);


//======================================
// MENSAJE FINAL
//======================================

setTimeout(()=>{

const final=document.createElement("div");

final.innerHTML="❤️ Ti amo infinitamente ❤️";

final.style.position="fixed";

final.style.bottom="30px";

final.style.left="50%";

final.style.transform="translateX(-50%)";

final.style.color="white";

final.style.fontSize="30px";

final.style.fontWeight="700";

final.style.textShadow="0 0 20px #66d9ff";

final.style.opacity="0";

final.style.transition="2s";

document.body.appendChild(final);

setTimeout(()=>{

final.style.opacity="1";

},300);

},25000);