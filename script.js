//======================================
// ELEMENTOS
//======================================

const space = document.getElementById("space");
const sctx = space.getContext("2d");

const heartCanvas = document.getElementById("heartCanvas");
const hctx = heartCanvas.getContext("2d");

const welcome = document.getElementById("welcome");
const heartScene = document.getElementById("heartScene");
const letterScene = document.getElementById("letterScene");

const startButton = document.getElementById("startButton");

const phrasesContainer = document.getElementById("phrases");

const letterText = document.getElementById("letterText");

const music = document.getElementById("music");

//======================================
// FRASES
//======================================

const phrases = [

"❤️ Mi futura esposa",

"💍 Nuestro futuro juntos",

"💖 Mi prioridad",

"🌙 Siempre a tu lado",

"🌸 Mi lugar favorito eres tú",

"✨ Mi estrella",

"🥹 Gracias por existir",

"💙 Me haces muy feliz",

"❤️ Te quiero muchísimo",

"🌹 Eres un regalo de Dios",

"🤍 Siempre contigo",

"✨ Nunca dejes de sonreír",

"💖 Me encanta conocerte",

"🌙 Siempre pienso en ti",

"💫 Contigo todo es mejor",

"🌷 Gracias por llegar a mi vida"

];

//======================================
// CARTA
//======================================

const carta = `

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

//======================================
// TAMAÑO
//======================================

function resize(){

space.width = window.innerWidth;
space.height = window.innerHeight;

heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize);

//======================================
// ESTRELLAS
//======================================

const stars=[];

for(let i=0;i<250;i++){

stars.push({

x:Math.random()*space.width,

y:Math.random()*space.height,

r:Math.random()*2+0.5,

a:Math.random()*Math.PI*2,

speed:Math.random()*0.03+0.005

});

}

function animateSpace(){

sctx.clearRect(0,0,space.width,space.height);

for(const s of stars){

s.a+=s.speed;

const alpha=0.5+Math.sin(s.a)*0.5;

sctx.beginPath();

sctx.arc(s.x,s.y,s.r,0,Math.PI*2);

sctx.fillStyle=`rgba(255,255,255,${alpha})`;

sctx.shadowBlur=10;
sctx.shadowColor="#7ee7ff";

sctx.fill();

}

requestAnimationFrame(animateSpace);

}

animateSpace();

//======================================
// COMENZAR
//======================================

startButton.onclick=()=>{

music.volume = 0.25;
music.play().catch(()=>{});

welcome.classList.add("hidden");

setTimeout(()=>{

welcome.style.display="none";

heartScene.classList.add("show");

createHeart();

},1000);

};
//======================================
// CORAZÓN PREMIUM
//======================================

const particles = [];

let heartScale = 1;
let heartDirection = 1;

function createHeart(){

particles.length = 0;

const cx = heartCanvas.width / 2;
const cy = heartCanvas.height / 2;

for(let i=0;i<2600;i++){

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

x:cx,

y:cy,

tx:cx+x*20,

ty:cy-y*20,

r:Math.random()*2+0.8,

alpha:0,

offset:Math.random()*Math.PI*2

});

}

animateHeart();

setTimeout(showPhrases,3000);

}

//======================================
// LATIDO
//======================================

function heartbeat(){

if(heartDirection===1){

heartScale+=0.0015;

if(heartScale>=1.08){

heartDirection=-1;

}

}else{

heartScale-=0.0015;

if(heartScale<=1){

heartDirection=1;

}

}

}

//======================================
// ANIMACIÓN
//======================================

function animateHeart(){

hctx.clearRect(0,0,heartCanvas.width,heartCanvas.height);

heartbeat();

const cx = heartCanvas.width/2;
const cy = heartCanvas.height/2;

for(const p of particles){

p.x += (p.tx-p.x)*0.05;
p.y += (p.ty-p.y)*0.05;

p.alpha = Math.min(1,p.alpha+0.02);

const dx = (p.x-cx)*heartScale;
const dy = (p.y-cy)*heartScale;

const glow = 2 + Math.sin(Date.now()*0.003+p.offset);

hctx.beginPath();

hctx.arc(

cx+dx,

cy+dy,

p.r+glow*0.15,

0,

Math.PI*2

);

hctx.fillStyle=`rgba(95,220,255,${p.alpha})`;

hctx.shadowBlur=25;

hctx.shadowColor="#66ddff";

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

{x:50,y:12},

{x:34,y:20},
{x:66,y:20},

{x:24,y:32},
{x:76,y:32},

{x:17,y:48},
{x:83,y:48},

{x:24,y:64},
{x:76,y:64},

{x:34,y:78},
{x:66,y:78},

{x:44,y:90},
{x:56,y:90},

{x:40,y:46},
{x:60,y:46},

{x:50,y:58}

];

for(let i=0;i<phrases.length;i++){

const frase=document.createElement("div");

frase.className="phrase";

frase.innerHTML=phrases[i];

frase.style.left=positions[i].x+"%";
frase.style.top=positions[i].y+"%";

phrasesContainer.appendChild(frase);

setTimeout(()=>{

frase.style.opacity="1";

},i*400);

}

setTimeout(()=>{

hidePhrases();

},9000);

}

//======================================
// DESAPARECER FRASES
//======================================

function hidePhrases(){

const todas=document.querySelectorAll(".phrase");

todas.forEach(f=>{

f.style.opacity="0";

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

const ang=Math.random()*Math.PI*2;

const dist=900+Math.random()*900;

p.tx=p.x+Math.cos(ang)*dist;

p.ty=p.y+Math.sin(ang)*dist;

}

setTimeout(()=>{

heartScene.style.display="none";

showLetter();

},2600);

}
//======================================
// CARTA
//======================================

function showLetter(){

letterScene.style.display="flex";

letterText.innerHTML="";

let index=0;

function escribir(){

if(index<carta.length){

letterText.innerHTML+=carta.charAt(index);

index++;

setTimeout(escribir,32);

}else{

startPetals();

}

}

escribir();

}

//======================================
// LLUVIA DE PÉTALOS
//======================================

let petalsStarted=false;

function startPetals(){

if(petalsStarted) return;

petalsStarted=true;

setInterval(()=>{

const petal=document.createElement("div");

petal.className="petal";

const flowers=["🌹","🌺","🌸"];

petal.innerHTML=flowers[Math.floor(Math.random()*flowers.length)];

petal.style.left=Math.random()*100+"vw";

petal.style.fontSize=(18+Math.random()*16)+"px";

petal.style.animationDuration=(6+Math.random()*5)+"s";

document.getElementById("petals").appendChild(petal);

setTimeout(()=>{

petal.remove();

},11000);

},250);

}

//======================================
// MENSAJE FINAL
//======================================

function showFinalMessage(){

const final=document.createElement("div");

final.innerHTML="❤️ Te quiero muchísimo ❤️";

final.style.position="fixed";

final.style.left="50%";

final.style.bottom="35px";

final.style.transform="translateX(-50%)";

final.style.color="white";

final.style.fontSize="28px";

final.style.fontWeight="700";

final.style.textShadow="0 0 20px #66ddff";

final.style.opacity="0";

final.style.transition="2s";

document.body.appendChild(final);

setTimeout(()=>{

final.style.opacity="1";

},300);

}

setTimeout(showFinalMessage,26000);
//======================================
// ESTRELLAS FUGACES
//======================================

const shootingStars=[];

setInterval(()=>{

shootingStars.push({

x:Math.random()*space.width+200,

y:-50,

vx:-12-Math.random()*6,

vy:12+Math.random()*6,

life:0

});

},4000);


//======================================
// MEJORAR GALAXIA
//======================================

const oldAnimate=animateSpace;

animateSpace=function(){

sctx.clearRect(0,0,space.width,space.height);

// estrellas normales

for(const s of stars){

s.a+=s.speed;

const alpha=0.55+Math.sin(s.a)*0.45;

sctx.beginPath();

sctx.arc(s.x,s.y,s.r,0,Math.PI*2);

sctx.fillStyle=`rgba(255,255,255,${alpha})`;

sctx.shadowBlur=10;
sctx.shadowColor="#7fe8ff";

sctx.fill();

}

// estrellas fugaces

for(let i=shootingStars.length-1;i>=0;i--){

const st=shootingStars[i];

st.x+=st.vx;
st.y+=st.vy;

sctx.beginPath();

sctx.moveTo(st.x,st.y);

sctx.lineTo(st.x+100,st.y-100);

sctx.strokeStyle="rgba(255,255,255,.85)";

sctx.lineWidth=2;

sctx.stroke();

st.life++;

if(st.life>30){

shootingStars.splice(i,1);

}

}

requestAnimationFrame(animateSpace);

}

animateSpace();


//======================================
// BRILLO DEL CORAZÓN
//======================================

setInterval(()=>{

const glow=document.getElementById("heartGlow");

if(glow){

glow.animate([

{

transform:"scale(1)",

opacity:.25

},

{

transform:"scale(1.18)",

opacity:.45

},

{

transform:"scale(1)",

opacity:.25

}

],{

duration:1200,

iterations:1

});

}

},1200);


//======================================
// EFECTO FINAL
//======================================

window.onload=()=>{

resize();

};