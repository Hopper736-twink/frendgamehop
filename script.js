// PARTY GAME FULL VERSION
const app=document.getElementById("app");

let players=[];
let fatigue={};
let current=0;

const tasks=[
"Игрок {name}, расскажи самый странный факт о себе",
"Игрок {name}, сделай 10 приседаний",
"Игрок {name}, покажи последнее фото в галерее",
"Игрок {name}, издай звук животного"
];

function renderMenu(){
app.innerHTML=`
<div class='card'>
<h1>PartyGame</h1>
<input id='name' placeholder='Имя игрока'>
<button onclick='addPlayer()'>Добавить</button>
<p>${players.join(", ")}</p>
<button onclick='start()'>Играть</button>
</div>`
}

function addPlayer(){
const n=document.getElementById("name").value;
if(!n)return;
players.push(n);
fatigue[n]=0;
renderMenu();
}

function start(){
if(players.length<2)return alert("Нужно минимум 2 игрока");
nextTurn();
}

function nextTurn(extra=false){
const name=players[current];
let t=tasks[Math.floor(Math.random()*tasks.length)];
t=t.replace("{name}",name);
app.innerHTML=`
<div class='card'>
<h2>${name}</h2>
<p>${t}</p>
<button onclick='done()'>Выполнил</button>
<button onclick='skip()'>Отказ</button>
</div>`;
if(!extra)current=(current+1)%players.length;
}

function done(){nextTurn();}

function skip(){
const name=players[(current-1+players.length)%players.length];
fatigue[name]++;
if(fatigue[name]>=2){
fatigue[name]=0;
nextTurn(true);
}else nextTurn();
}

renderMenu();